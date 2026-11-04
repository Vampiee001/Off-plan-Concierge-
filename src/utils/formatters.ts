export type CurrencyCode = 'AED' | 'USD' | 'EUR' | 'GBP' | 'CNY' | 'RUB' | 'BTC';

export const exchangeRates: Record<CurrencyCode, number> = {
  AED: 1,
  USD: 0.2723,
  EUR: 0.2485,
  GBP: 0.2136,
  CNY: 1.965,
  RUB: 24.8,
  BTC: 0.0000041
};

export const currencySymbols: Record<CurrencyCode, string> = {
  AED: 'AED ',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  RUB: '₽',
  BTC: '₿'
};

export function formatPrice(amountInAED: number, currency: CurrencyCode = 'AED'): string {
  const rate = exchangeRates[currency] || 1;
  const converted = amountInAED * rate;

  if (currency === 'BTC') {
    return `${currencySymbols.BTC}${converted.toFixed(2)}`;
  }

  if (currency === 'AED') {
    return `AED ${amountInAED.toLocaleString('en-US')}`;
  }

  const symbol = currencySymbols[currency];
  return `${symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export function formatCompactPrice(amountInAED: number, currency: CurrencyCode = 'AED'): string {
  const rate = exchangeRates[currency] || 1;
  const converted = amountInAED * rate;

  if (currency === 'AED') {
    if (amountInAED >= 1000000) {
      return `AED ${(amountInAED / 1000000).toFixed(1)}M`;
    }
    return `AED ${(amountInAED / 1000).toFixed(0)}K`;
  }

  const symbol = currencySymbols[currency];
  if (converted >= 1000000) {
    return `${symbol}${(converted / 1000000).toFixed(2)}M`;
  }
  return `${symbol}${(converted / 1000).toFixed(0)}K`;
}
