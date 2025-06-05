import React, { useState } from 'react';
import { X } from 'lucide-react';

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
<svg     width={size}
    height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552"><defs><linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#57d163"></stop><stop offset="1" stop-color="#23b33a"></stop></linearGradient><filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3.531"></feGaussianBlur></filter></defs><path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#a)"></path><path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"></path><path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"></path><path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"></path><path fill="#fff" fill-rule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"></path></svg>
);

const FloatingWhatsApp = ({ 
  phoneNumber = "1234567890", 
  message = "Hello! I'm interested in your services.",
  position = "bottom-right" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format phone number (remove any non-digits and add country code if needed)
  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    // Add country code if not present (assuming US/international format)
    return cleaned.startsWith('971') ? cleaned : `971${cleaned}`;
  };

  const handleWhatsAppClick = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
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
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <div className="relative">
          {/* Chat bubble tooltip */}
          {/*isOpen && (
            <div className="absolute bottom-16 right-0 mb-2 p-3 bg-white rounded-lg shadow-lg border max-w-xs animate-in slide-in-from-bottom-2 font-english">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon size={40} className="text-green-500" />
                  <span className="font-semibold text-gray-800">Chat with us!</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Hi there! How can we help you today?
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={30} />
                Start Chat
              </button>
            </div>
          )*/}

          {/* WhatsApp button */}
          {/*<button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 bg-transparent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            aria-label="Contact us on WhatsApp"
          >*/}
          <button
          //onClick={() => setIsOpen(!isOpen)}
          onClick={handleWhatsAppClick}
         // className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Contact us on WhatsApp"
          >
            {/*<WhatsAppIcon size={40} className="group-hover:animate-pulse" />*/}
            <div id="my_custom_svg">
    <img width="auto" height="50px" 
    //src="//us.eliesaab.com/cdn/shop/t/23/assets/off-messenger-launch.svg?v=10890240430773773471744640231" 
    src="/off-messenger-launch.svg"
    alt="Intercom Offline Launcher"
    />
  </div>
            {/* Pulse animation rings 
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 animation-delay-200"></div>
            
            */}
            
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
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;