import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import img1 from '../../public/Silk Soul Logo Font.svg'
// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
const videos = [
  {id:1,
  src:"https://res.cloudinary.com/www-eliesaab-com/video/upload/c_scale,f_auto,h_1200,q_auto/v1747121895/ES_Summer_Escapade_Banner_1_eumrdh.mp4",

  },
  {id:2,
  src:"https://res.cloudinary.com/www-eliesaab-com/video/upload/c_scale,f_auto,h_1200,q_auto/v1747121895/ES_Summer_Escapade_Banner_1_eumrdh.mp4",

  }
]
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useEffect, useRef } from "react";
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
  const navigateTo = () => navigate('/category/1');
  const navigateToHome = () => navigate('/');
   const swiperRef = useRef(null);

   const swiperConfig = {
       modules: [Navigation, Pagination, Autoplay],
       spaceBetween: 300,
       centeredSlides: true,
       autoplay: {
         delay: 1500, // 1.5 seconds between slides
         disableOnInteraction: false, // Continue autoplay after user interaction
         pauseOnMouseEnter: true, // Pause on hover
       },
       pagination: {
        clickable: true,
         dynamicBullets: true,
      },
         // RTL support
       dir: isRTL ? 'rtl' : 'ltr',
       // Proper RTL handling
       rtl: isRTL,
         // Observer to watch for changes
       observer: true,
       observeParents: true,
       watchSlidesProgress: true,
       watchSlidesVisibility: true,
       // Force update on language change
       updateOnWindowResize: true,
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
       loop: true, // Infinite loop
       speed: 800, // Transition speed in ms
       slidesPerView: 1,
       breakpoints: {
         640: {
           slidesPerView: 1,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 1,
           spaceBetween: 30,
         },
         1024: {
           slidesPerView: 1,
           spaceBetween: 40,
         },
       },
     };
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
         {/*<Swiper
            key={`swiper-${language}-${isRTL}`} 
              ref={swiperRef}
              {...swiperConfig}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={20}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
              }}
              className=""
            >
              {videos.map((video) => (
                <SwiperSlide key={video.id}>
            <video 
          className="w-full h-full object-cover" 
          src={video.src}
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
                </SwiperSlide>
              ))}
            </Swiper>*/}
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
      <div className="absolute top-10 left-0 right-0 z-20 p-4 md:p-6">
        <div className={`
          flex items-center justify-between
          ${isRTL ? 'flex-row-reverse' : 'flex-row'}
        `}>
          {/* Menu Button - positioned based on RTL */}
          <button
            onClick={onMenuToggle}
            className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8 max-[720px]:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label={t('menu')}
          >
            <Menu className="w-6 h-6 md:w-7 md:h-7 max-[720px]:w-4 max-[720px]:w-4 text-white" />
          </button>

          {/* Empty spacer to balance the layout */}
          <div className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8"></div>

          {/* Search and Cart - positioned based on RTL */}
          <div className={`
            flex items-center gap-3
            ${isRTL ? 'flex-row-reverse' : 'flex-row'}
          `}>
            <button
              onClick={onSearchToggle}
              className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8 max-[720px]:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label={t('search')}
            >
              <Search className="w-6 h-6 md:w-7 md:h-7 max-[720px]:w-4 max-[720px]:h-4 text-white" />
            </button>

            <Link
              to="/cart"
              className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8 max-[720px]:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label={t('cart')}
            >
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 max-[720px]:w-4 max-[720px]:h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Centered Logo - positioned same as Shop Now button */}
      <div className="absolute top-10 left-0 right-0 z-30 p-4 md:p-6 max-[720px]:p-2 pointer-events-none">
        <div className="flex justify-center items-center">
          <div 
            className="h-20 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 pointer-events-auto max-[720px]:h-20 max-[720px]:w-20"
            onClick={navigateToHome}
          >
            <img 
              className="h-20 w-auto object-contain max-[720px]:w-20" 
              src={img1} 
              alt="Silk Soul Logo"
            />
          </div>
        </div>
      </div>

      {/* Hero Content - RTL-aware text alignment and typography */}
    <div className={`
  absolute bottom-40 left-0 right-0 z-20 items-center text-white px-4 text-center
  max-[1080px]:top-1/2 max-[1080px]:bottom-auto max-[1080px]:-translate-y-1/2 max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:justify-center
`}>
        <h1 className={`
          text-4xl sm:text-10xl md:text-6xl font-bold mb-6
          ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}
        `}>
          {t('heroTitle')}
        </h1>
        
        <p className={`
          text-lg md:text-xl mb-8 max-w-2xl mx-auto
          ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}
        `}>
          {t('heroSubtitle')}
        </p>
        
        {/* Shop Now Button - centered and symmetric with top logo */}
        <div className="flex justify-center items-center">
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
      </div>
    </section>
  );
};

export default HeroSection;