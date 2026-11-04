import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Calendar, 
  BookmarkPlus, 
  Award, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Compass,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Property, ChatMessage } from '../types';
import { CurrencyCode, formatPrice } from '../utils/formatters';
import { LanguageCode } from '../utils/translations';

interface TalkingAiConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  currency: CurrencyCode;
  language: LanguageCode;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property?: Property) => void;
  onSaveDraftRecommendation: (propertyIds: string[], notes: string) => void;
}

export const TalkingAiConcierge: React.FC<TalkingAiConciergeProps> = ({
  isOpen,
  onClose,
  properties,
  currency,
  language,
  onSelectProperty,
  onOpenViewingModal,
  onSaveDraftRecommendation
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to **Off-plan Concierge VIP AI**. I am your private UAE real estate investment advisor.
      
Ask me about the best off-plan opportunities in Dubai and Ras Al Khaimah, Golden Visa qualifying investments, waterfront penthouses, or post-handover payment plans.

*For every project I present, I will provide its certified 5 Unique Selling Points (USPs) and schedule a private viewing whenever you are ready.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedProperties: properties.slice(0, 2)
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Quick prompt suggestions
  const quickPrompts = [
    'Tell me about Azizi Florence 30M sq.ft project & 5 USPs',
    'How does Danube 1% per month plan work on Bayz 101?',
    'Azizi Venice Crystal Lagoons in Dubai South',
    'Recommend projects with 10%+ net ROI',
    'Properties eligible for 10-Year UAE Golden Visa',
    'Schedule a VIP Chauffeur Viewing with Mark'
  ];

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle Speech-to-Text (Mic recording)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ar' ? 'ar-AE' : language === 'ru' ? 'ru-RU' : language === 'fr' ? 'fr-FR' : language === 'zh' ? 'zh-CN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInputQuery(speechToText);
      setIsListening(false);
      // Auto-send voice input
      handleSendMessage(speechToText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Play audio using either Gemini TTS or Web Speech fallback
  const speakText = async (textToSpeak: string) => {
    if (!voiceEnabled) return;

    try {
      setIsSpeaking(true);
      // Call server-side Gemini TTS endpoint
      const response = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voice: 'Kore' })
      });
      const data = await response.json();

      if (data.success && data.audioBase64) {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = `data:audio/wav;base64,${data.audioBase64}`;
        audioRef.current.onended = () => setIsSpeaking(false);
        audioRef.current.onerror = () => {
          fallbackSpeechSynthesis(textToSpeak);
        };
        await audioRef.current.play();
      } else {
        fallbackSpeechSynthesis(textToSpeak);
      }
    } catch (e) {
      console.warn('Gemini TTS error, using fallback SpeechSynthesis', e);
      fallbackSpeechSynthesis(textToSpeak);
    }
  };

  const fallbackSpeechSynthesis = (textToSpeak: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = textToSpeak.replace(/[*_#`[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const query = (textOverride || inputQuery).trim();
    if (!query || loading) return;

    stopSpeaking();

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          clientLanguage: language === 'ar' ? 'Arabic' : language === 'ru' ? 'Russian' : language === 'fr' ? 'French' : language === 'zh' ? 'Chinese' : 'English'
        })
      });

      const data = await response.json();

      let matchedProperties: Property[] = [];
      if (data.suggestedProperties && data.suggestedProperties.length > 0) {
        matchedProperties = data.suggestedProperties;
      } else {
        // Smart keyword matcher if server returned empty
        matchedProperties = properties.filter(p => 
          query.toLowerCase().includes(p.developer.toLowerCase()) ||
          query.toLowerCase().includes(p.subLocation.toLowerCase()) ||
          query.toLowerCase().includes(p.title.toLowerCase().slice(0, 7))
        ).slice(0, 2);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Here are our top recommended UAE off-plan properties matching your inquiry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProperties: matchedProperties.length > 0 ? matchedProperties : undefined,
        viewingPrompt: data.viewingPrompt !== false
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If user asks about viewing, qualify lead on backend
      if (query.toLowerCase().includes('viewing') || query.toLowerCase().includes('visit') || query.toLowerCase().includes('tour') || query.toLowerCase().includes('schedule')) {
        fetch('/api/gemini/qualify-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadData: { query },
            chatTranscript: newMessages.map(m => `${m.role}: ${m.content}`).join('\n')
          })
        }).catch(err => console.error(err));
      }

      // Automatically speak the response if voice is active
      if (voiceEnabled) {
        speakText(assistantMessage.content);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Thank you for your question. Bugatti Residences and Palm Jebel Ali Frond Mansions are our most highly requested off-plan projects this week with certified 5 USPs. Would you like me to book a private viewing?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProperties: properties.slice(0, 2)
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = (propIds: string[]) => {
    onSaveDraftRecommendation(
      propIds,
      `AI-Curated Portfolio drafted based on conversation on ${new Date().toLocaleDateString()}`
    );
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[820px] rounded-2xl bg-[#070D1E] border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0A1227] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5">
              <div className="w-full h-full bg-[#060B18] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-luxury text-base font-bold text-white tracking-wide">
                  Off-plan Concierge AI
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30 flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Voice</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Natural Language UAE Off-Plan Advisor • 5-USP Enforced Presentation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Voice toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                voiceEnabled
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Voice On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Voice Muted</span>
                </>
              )}
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Visualizer Bar when speaking */}
        {isSpeaking && (
          <div className="px-6 py-2 bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-300 animate-pulse">
            <div className="flex items-center space-x-2">
              <span className="flex space-x-1 items-end h-4">
                <span className="w-1 bg-amber-400 h-2 rounded animate-bounce" />
                <span className="w-1 bg-amber-400 h-4 rounded animate-bounce delay-75" />
                <span className="w-1 bg-amber-400 h-3 rounded animate-bounce delay-150" />
                <span className="w-1 bg-amber-400 h-1.5 rounded animate-bounce delay-100" />
              </span>
              <span className="font-medium">AI Concierge is speaking...</span>
            </div>
            <button
              onClick={stopSpeaking}
              className="text-[11px] uppercase font-bold text-amber-400 hover:text-white px-2 py-0.5 rounded bg-amber-500/20"
            >
              Stop Voice
            </button>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1 px-1">
                <span className="text-[11px] font-semibold text-slate-400">
                  {message.role === 'user' ? 'You (Client)' : 'Off-plan Concierge AI'}
                </span>
                <span className="text-[10px] text-slate-500">{message.timestamp}</span>
              </div>

              {/* Message bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-100 rounded-br-none'
                    : 'bg-[#0E1833] border border-slate-700/60 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                {/* Markdown text formatter */}
                <div className="whitespace-pre-line space-y-2">
                  {message.content}
                </div>

                {/* Replay voice button for assistant messages */}
                {message.role === 'assistant' && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => speakText(message.content)}
                      className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Replay Voice</span>
                    </button>

                    {message.suggestedProperties && message.suggestedProperties.length > 0 && (
                      <button
                        onClick={() => handleSaveDraft(message.suggestedProperties!.map(p => p.id))}
                        className="inline-flex items-center space-x-1 text-slate-300 hover:text-amber-300 transition-colors"
                        title="Save to My AI Recommendations Drafts"
                      >
                        <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Save Portfolio Draft</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Recommended Property Cards directly inside the chat */}
              {message.suggestedProperties && message.suggestedProperties.length > 0 && (
                <div className="mt-4 w-full max-w-2xl space-y-3">
                  <div className="text-xs font-semibold text-amber-300 flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Presented Properties (5 USPs Certified):</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {message.suggestedProperties.map((prop) => (
                      <div
                        key={prop.id}
                        className="rounded-xl bg-[#091124] border border-amber-500/30 p-3 hover:border-amber-400 transition-all shadow-md group"
                      >
                        <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                            {prop.projectedROI}
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-white line-clamp-1">{prop.title}</h4>
                        <p className="text-[11px] text-slate-400">{prop.developer} • {prop.subLocation}</p>
                        
                        <div className="mt-2 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400">Starting from</span>
                            <div className="text-xs font-bold text-amber-300">
                              {formatPrice(prop.startingPriceAED, currency)}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {prop.completionDate}
                          </span>
                        </div>

                        {/* 5 USPs Mini list */}
                        <div className="mt-2 pt-2 border-t border-slate-800/80">
                          <p className="text-[10px] font-semibold text-amber-400/90 mb-1">5 Core USPs:</p>
                          <ul className="text-[10px] text-slate-300 space-y-0.5">
                            {prop.usps.slice(0, 3).map((usp, idx) => (
                              <li key={idx} className="line-clamp-1 flex items-start space-x-1">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>{usp}</span>
                              </li>
                            ))}
                            <li className="text-[10px] text-amber-400 font-medium">+ 2 more certified USPs...</li>
                          </ul>
                        </div>

                        {/* Direct action triggers */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              onSelectProperty(prop);
                              onClose();
                            }}
                            className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors flex items-center justify-center space-x-1"
                          >
                            <span>Inspect 360°</span>
                            <ExternalLink className="w-3 h-3 text-amber-400" />
                          </button>
                          <button
                            onClick={() => {
                              onOpenViewingModal(prop);
                              onClose();
                            }}
                            className="py-1.5 rounded-lg gold-gradient-bg text-slate-950 text-[11px] font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-1"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Book Tour</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instant Viewing schedule prompt button if relevant */}
              {message.viewingPrompt && message.role === 'assistant' && (
                <div className="mt-3">
                  <button
                    onClick={() => {
                      onOpenViewingModal(message.suggestedProperties?.[0]);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 hover:border-amber-400 text-amber-300 text-xs font-semibold flex items-center space-x-2 transition-all shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Schedule VIP Chauffeur Viewing Directly Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-2 text-xs text-slate-400 p-4 rounded-xl bg-[#0B142A]/60 border border-slate-800">
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Off-plan Concierge AI is analyzing UAE off-plan databases and formulating 5 USPs...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-6 py-2 bg-[#091124] border-t border-slate-800/80 overflow-x-auto flex items-center space-x-2 scrollbar-none">
          <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">Suggested:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-slate-800/90 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-slate-700 hover:border-amber-500/30 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 sm:p-5 bg-[#0A1227] border-t border-slate-800 flex items-center space-x-3">
          {/* Voice input button */}
          <button
            onClick={toggleSpeechRecognition}
            className={`p-3 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800 hover:border-amber-500/40'
            }`}
            title={isListening ? 'Stop Listening' : 'Speak via Microphone'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask about properties, 5 USPs, ROI, or booking viewings...'}
              className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || loading}
            className="p-3 rounded-xl gold-gradient-bg text-slate-950 font-bold hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Draft recommendation saved toast */}
        {draftSavedToast && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>AI Draft Recommendation saved to Client Portal!</span>
          </div>
        )}
      </div>
    </div>
  );
};
