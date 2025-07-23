import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Menu, Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import img1 from '../../public/Silk Soul Logo Font.svg';
import { useEffect, useRef } from "react";

// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Import fade effect styles

interface HeroSectionProps {
  onMenuToggle: () => void;
  onSearchToggle: () => void;
}

const HeroSection = ({ onMenuToggle, onSearchToggle }: HeroSectionProps) => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Array of your video sources
  const videoSources = [
    '/hero1.mp4',
    '/hero2.mp4'
  ];

  // Refs for video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Simple navigation function
  const navigateTo = () => navigate('/exclusive');
  const navigateToHome = () => navigate('/');

  // Play the first video on initial component mount
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(error => {
        console.error("Initial video play failed:", error);
      });
    }
  }, []);

  const handleSlideChange = (swiper: any) => {
    // Pause all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to the beginning
      }
    });

    // Play the video in the active slide
    const activeVideo = videoRefs.current[swiper.realIndex]; // Use realIndex for loop mode
    if (activeVideo) {
      activeVideo.play().catch(error => {
        // This error can happen if the user hasn't interacted with the page yet.
        console.error("Video autoplay was prevented:", error);
      });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video Swiper */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
       // fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 7000, // 7 seconds between slides
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        onSlideChange={handleSlideChange}
        className="absolute inset-0 w-full h-full"
      >
        {videoSources.map((src, index) => (
          <SwiperSlide key={src}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover"
              src={src}
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
     {/* <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full flex justify-between px-4">
        <button className="swiper-button-prev-custom w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
          {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
        </button>
        <button className="swiper-button-next-custom w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
          {isRTL ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </button>
      </div>*/}

      {/* Top Navigation Bar - RTL-aware positioning */}
      <div className="absolute top-10 left-0 right-0 z-20 p-4 md:p-6">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={onMenuToggle}
            className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8 max-[720px]:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label={t('menu')}
          >
            <Menu className="w-6 h-6 md:w-7 md:h-7 max-[720px]:w-4 max-[720px]:w-4 text-white" />
          </button>
          <div className="w-12 h-12 md:w-14 md:h-14 max-[720px]:w-8"></div> {/* Spacer */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
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

      {/* Centered Logo */}
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

      {/* Hero Content */}
      <div className={`absolute bottom-40 left-0 right-0 z-20 items-center text-white px-4 text-center max-[1080px]:top-1/2 max-[1080px]:bottom-auto max-[1080px]:-translate-y-1/2 max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:justify-center`}>
        <h1 className={`text-4xl sm:text-10xl md:text-6xl font-bold mb-6 ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}`}>
          {t('hautecouture')}
        </h1>
        <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isRTL ? 'font-arabic leading-tight' : 'font-english leading-tight'}`}>
          {t('hautecoutureDescription')}
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={navigateTo}
            className={`${isRTL ? 'promo__btn__arabic' : 'promo__btn'} font-bold hover:bg-gtransition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isRTL ? 'font-arabic' : 'font-english'}`}
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