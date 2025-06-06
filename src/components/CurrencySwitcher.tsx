import { useCurrency } from "../contexts/CurrencyProvider";
import { DollarSign, Coins } from 'lucide-react';


export const FloatingCurrencySwitch = () => {
  const { currency, switchCurrency } = useCurrency();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={switchCurrency}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg text-white shadow-lg 
          transform transition-all duration-300 hover:scale-105 hover:shadow-xl
        `}
        style={{backgroundColor:"#000000"}}
      >
        {currency === 'USD' ? (
          <>
            <DollarSign className="w-5 h-5" />
            <span className="font-semibold">USD</span>
          </>
        ) : (
          <>
            <Coins className="w-5 h-5" />
            <span className="font-semibold">AED</span>
          </>
        )}
        <div className="w-px h-4 bg-white/30 mx-1" />
        <span className="text-xs opacity-75">
          {currency === 'USD' ? 'Switch to AED' : 'Switch to USD'}
        </span>
      </button>
    </div>
  );
};