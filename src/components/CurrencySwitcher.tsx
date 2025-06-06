import React from 'react';
import { DollarSign, Coins, RefreshCw } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyProvider';



export const FloatingCurrencySwitch = () => {
  const { currency, switchCurrency } = useCurrency();

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 transition-all duration-300 ease-in-out">
        {/* Compact circular button for screens below 1080px */}
        <button
          onClick={switchCurrency}
          className="xl:hidden bg-black text-white rounded-full p-3 shadow-lg hover:shadow-xl 
                   transition-all duration-300 hover:scale-110 active:scale-95 
                   touch-manipulation focus:outline-none focus:ring-2 focus:ring-white 
                   focus:ring-opacity-50 flex items-center justify-center relative"
          aria-label={`Switch to ${currency === 'USD' ? 'AED' : 'USD'}`}
        >
          <div className="relative">
            {currency === 'USD' ? (
              <DollarSign className="w-5 h-5" />
            ) : (
              <Coins className="w-5 h-5" />
            )}
            <RefreshCw className="w-3 h-3 absolute -top-1 -right-1 opacity-60" />
          </div>
        </button>

        {/* Original full button for screens 1080px and above */}
        <button
          onClick={switchCurrency}
          className="hidden xl:flex items-center gap-2 px-4 py-3 rounded-lg text-white shadow-lg 
                   transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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

      {/* Custom CSS for animations and responsive behavior */}
      <style>{`
        /* Smooth transitions between breakpoints */
        @media (max-width: 1079px) {
          .xl\\:hidden {
            display: flex !important;
            animation: fadeIn 0.3s ease-in-out;
          }
          
          .hidden.xl\\:flex {
            display: none !important;
          }
        }

        @media (min-width: 1080px) {
          .xl\\:hidden {
            display: none !important;
          }
          
          .hidden.xl\\:flex {
            display: flex !important;
            animation: fadeIn 0.3s ease-in-out;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Subtle pulse animation for mobile button */
        .xl\\:hidden {
          animation: subtlePulse 3s infinite;
        }

        @keyframes subtlePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(0, 0, 0, 0);
          }
        }

        /* Touch optimization for mobile */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-110:hover, .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:shadow-xl:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        }

        /* Ensure proper touch targets on mobile */
        @media (max-width: 640px) {
          .xl\\:hidden {
            min-width: 48px;
            min-height: 48px;
          }
        }

        /* Rotation animation for refresh icon on hover */
        .xl\\:hidden:hover .refresh-icon {
          animation: rotate 0.5s ease-in-out;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </>
  );
};