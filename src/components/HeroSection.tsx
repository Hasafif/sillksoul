import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import img1 from '../../public/Silk Soul Logo Font.svg'
interface HeroSectionProps {
  onMenuToggle: () => void;
  onSearchToggle: () => void;
}



const HeroSection = ({ onMenuToggle, onSearchToggle }: HeroSectionProps) => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
// Simple navigation function
const navigateTo = () =>   navigate('/category/1');;
const navigateTohome = () =>navigate('/');;
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover" 
          src="https://res.cloudinary.com/www-eliesaab-com/video/upload/c_scale,f_auto,h_1200,q_auto/v1747121895/ES_Summer_Escapade_Banner_1_eumrdh.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: 'auto',
            height: 'auto',
            minWidth: '100%',
            minHeight: '150%',
            transform: 'scale(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Top Navigation Bar - RTL-aware positioning */}
      <div className="grid grid-cols absolute top-10 left-0 right-0 z-30 p-4 md:p-6">
        <div className={`
          flex items-center justify-between
          ${isRTL ? 'flex-row-reverse' : 'flex-row'}
        `}>
          {/* Menu Button - positioned based on RTL */}
          <button
            onClick={onMenuToggle}
            className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label={t('menu')}
          >
            <Menu className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </button>
     
          {/* Logo - centered 
          
          
           <div className="flex-1 flex">
            {/*<img 
              className="image__img" 
              src="/l.png" 
              alt=""
            />
            <img 
              className="w-full h-20" 
              src={img1} 
              alt=""
            />
          </div>
          */}
           <div className="flex-1 flex" onClick={navigateTohome}>

              <img 
              className="w-full h-20" 
              src={img1} 
              alt=""
            />
           </div>
         

          {/* Search and Cart - positioned based on RTL */}
          <div className={`
            flex items-center gap-3
            ${isRTL ? 'flex-row-reverse' : 'flex-row'}
          `}>
            <button
              onClick={onSearchToggle}
              className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label={t('search')}
            >
              <Search className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            <Link
              to="/cart"
              className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label={t('cart')}
            >
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Content - RTL-aware text alignment and typography */}
      <div className={`
        absolute bottom-40 left-0 right-0 z-20 text-center text-white px-4
        ${isRTL ? 'text-right' : 'text-left'} sm:text-center
      `}>
        <h1 className={`
          text-4xl md:text-6xl font-bold mb-6
          ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}
        `}
       // style={{fontFamily:'Amazon Ember Arabic'}}
        >
          {t('heroTitle')}
          {/*Amazon Ember Bold*/}
         
        </h1>
        
        <p className={`
          text-lg md:text-xl mb-8 max-w-2xl mx-auto
          ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}
        `}>
          {t('heroSubtitle')}
        </p>
        
        {/* Shop Now Button - RTL-aware styling */}
        <button
          onClick={navigateTo}
          className={`${isRTL ? 'promo__btn__arabic':'promo__btn'}
            font-bold hover:bg-gtransition-all duration-300 
            transform hover:scale-105 shadow-lg hover:shadow-xl
            ${isRTL ? 'font-arabic' : 'font-english'}
          `}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {t('shopNow')}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;