import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingWhatsApp = ({ 
  phoneNumber = "+971991913661", 
  message = "Hello! I'm interested in your services.",
  position = "bottom-right" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {language,isRTL} = useLanguage()
  // Format phone number (remove any non-digits and add country code if needed)
  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    // Add country code if not present (assuming US/international format)
    return cleaned.startsWith('+971') ? cleaned : `+971${cleaned}`;
  };

  const handleWhatsAppClick = () => {
    const formattedPhone = formatPhoneNumber('991913661');
    const encodedMessage = encodeURIComponent(message);
    console.log(phoneNumber)
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <>
      {/* Main floating button */}
      <div className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ease-in-out`}>
        <div className="relative">
          {/* Black chat bubble for screens below 1080px */}
          <button
            onClick={handleWhatsAppClick}
            className="xl:hidden bg-black text-white rounded-full p-3 shadow-lg hover:shadow-xl 
                     transition-all duration-300 hover:scale-110 active:scale-95 
                     touch-manipulation focus:outline-none focus:ring-2 focus:ring-white 
                     focus:ring-opacity-50 flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle size={24} className="text-white" />
          </button>

          {/* Original button for screens 1080px and above */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden xl:block"
            aria-label="Contact us on WhatsApp"
          >
            <div id="my_custom_svg">
              {isRTL ? (
            // Left arrow for RTL
            <>
                 <img width="auto" height="50px" 
                src="/messenger-arabic.png"
                alt="Intercom Offline Launcher"
              /> 
            </>
        ) : (
            // Right arrow for LTR
            <>
                 <img width="auto" height="50px" 
                src="/off-messenger-launch.svg"
                alt="Intercom Offline Launcher"
              /> 
            </>
        )}
        
                {/* <img width="auto" height="50px" 
                src="/off-messenger-launch.svg"
                alt="Intercom Offline Launcher"
              />*/}
            </div>
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slide-in-from-bottom-2 {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in.slide-in-from-bottom-2 {
          animation: slide-in-from-bottom-2 0.2s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }

        /* Smooth transitions between breakpoints */
        @media (max-width: 1079px) {
          .xl\\:hidden {
            display: flex !important;
            animation: fadeIn 0.3s ease-in-out;
          }
          
          .hidden.xl\\:block {
            display: none !important;
          }
        }

        @media (min-width: 1080px) {
          .xl\\:hidden {
            display: none !important;
          }
          
          .hidden.xl\\:block {
            display: block !important;
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

        /* Pulse animation for chat bubble */
        .xl\\:hidden {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
          }
        }

        /* Touch optimization for mobile */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-110:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;