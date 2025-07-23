import React, { createContext, useContext, useState } from 'react';
type Currency = 'USD' | 'AED';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  switchCurrency: ()=>void;
  formatPrice:(amount:number)=>string;
  formatPriceFloat:(amount:number)=>number
}
// Currency Context

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
// Currency Provider Component
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('AED');
  
  const switchCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'AED' : 'USD');
  };

  const formatPrice = (amount) => {
    const rate = 3.67; // 1 USD = 3.67 AED (approximate)
    const convertedAmount = currency === 'AED' ? amount * rate : amount;
    //const symbol = currency === 'USD' ? '$' : 'د.إ';
    const symbol = currency === 'USD' ? '$' : 'AED ';
    return `${symbol}${convertedAmount.toFixed(2)}`;
  };
 const formatPriceFloat = (amount) => {
    const rate = 3.67; // 1 USD = 3.67 AED (approximate)
    const convertedAmount = currency === 'AED' ? amount * rate : amount;
    //const symbol = currency === 'USD' ? '$' : 'د.إ';
   /// const symbol = currency === 'USD' ? '$' : 'د.إ';
    return convertedAmount.toFixed(2);
  };
  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      switchCurrency,
      formatPrice,
      formatPriceFloat
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};