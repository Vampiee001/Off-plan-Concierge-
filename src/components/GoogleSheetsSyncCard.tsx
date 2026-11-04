import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  LogOut, 
  User as UserIcon,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Lead } from '../types';
import { 
  DEFAULT_SPREADSHEET_ID, 
  DEFAULT_SPREADSHEET_URL, 
  syncLeadsToGoogleSheet, 
  getSpreadsheetDetails, 
  SyncResult 
} from '../services/googleSheets';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken 
} from '../services/firebaseAuth';
import { User } from 'firebase/auth';

interface GoogleSheetsSyncCardProps {
  leads: Lead[];
  onLeadSynced?: (result: SyncResult) => void;
}

export const GoogleSheetsSyncCard: React.FC<GoogleSheetsSyncCardProps> = ({
  leads,
  onLeadSynced
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncResult | null>(null);
  const [sheetTitle, setSheetTitle] = useState<string>('Offplan Leads');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check initial auth state
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        // Attempt to fetch sheet details if token available
        getSpreadsheetDetails(token, DEFAULT_SPREADSHEET_ID)
          .then(meta => setSheetTitle(meta.title))
          .catch(() => {});
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMsg(null);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setCurrentUser(authResult.user);
        setAccessToken(authResult.accessToken);
        try {
          const meta = await getSpreadsheetDetails(authResult.accessToken, DEFAULT_SPREADSHEET_ID);
          setSheetTitle(meta.title);
        } catch (e: any) {
          console.warn('Could not read sheet metadata:', e);
        }
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setErrorMsg(err.message || 'Google authentication was cancelled or failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setSyncStatus(null);
  };

  const handleSyncNow = async () => {
    if (!accessToken) {
      setErrorMsg('Please sign in with Google to synchronize with the spreadsheet.');
      return;
    }

    setIsSyncing(true);
    setErrorMsg(null);

    try {
      const result = await syncLeadsToGoogleSheet(accessToken, leads, DEFAULT_SPREADSHEET_ID);
      setSyncStatus(result);
      if (result.success) {
        onLeadSynced?.(result);
      } else {
        setErrorMsg(result.error || 'Failed to update Google Sheet.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Sync error occurred.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#081126] to-[#040814] border border-amber-500/30 p-6 shadow-2xl space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-luxury text-base sm:text-lg font-bold text-white">
                Google Sheets Live Leads Integration
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                Connected App
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct two-way synchronization to Mark's primary Off-Plan Client Leads sheet
            </p>
          </div>
        </div>

        {/* Auth / Account Button */}
        <div>
          {currentUser ? (
            <div className="flex items-center space-x-3 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'Google User'} 
                  className="w-6 h-6 rounded-full border border-amber-400"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-amber-400" />
              )}
              <div className="text-left">
                <p className="text-xs font-semibold text-white truncate max-w-[140px]">
                  {currentUser.displayName || currentUser.email}
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Authorized</span>
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                title="Disconnect Google Account"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isAuthenticating ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Target Spreadsheet Destination */}
      <div className="p-4 rounded-xl bg-[#050A18] border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="text-amber-400 font-semibold">Linked Spreadsheet:</span>
            <span className="font-mono text-white bg-slate-800/60 px-2 py-0.5 rounded">
              {DEFAULT_SPREADSHEET_ID}
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Target Tab: <span className="text-slate-200 font-medium">{sheetTitle}</span> • Columns: Client, Phone, Email, Budget, Property, Status, AI Score, Draft Notes
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <a
            href={DEFAULT_SPREADSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center space-x-1.5 font-medium"
          >
            <span>Open Spreadsheet</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing || (!accessToken && !currentUser)}
            className="px-4 py-2 rounded-lg gold-gradient-bg text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5 disabled:opacity-50 shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : `Sync ${leads.length} Leads to Sheet`}</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatus && syncStatus.success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Successfully synchronized <strong>{syncStatus.rowsSynced} leads</strong> into tab <strong>"{syncStatus.sheetTitle}"</strong>.
            </span>
          </div>
          <a
            href={DEFAULT_SPREADSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:underline flex items-center space-x-1 font-semibold"
          >
            <span>View Live</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Auto-Sync Details */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
        <span className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero third-party data leaks • Real-time OAuth Bearer access via Google Sheets API</span>
        </span>
        <span className="text-amber-300/80">
          Last Check: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
