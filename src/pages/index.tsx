import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import Benifits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { products } from "../data/product";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { images} from "../data/images2";
import { images3} from "../data/images3";
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { language,isRTL } = useLanguage();
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startX2, setStartX2] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);
  const swiperRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const carouselRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
   // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1080);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const imageSrc = screenWidth < 1080 ? "/Mobile-last-section.jpg" : "/Horizonal.jpg";
  // Get first 4 products
  const featuredProducts = products.slice(0, 4);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  useEffect(() => {
    // Additional configuration after component mounts
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      
      // Start autoplay when component mounts
      swiper.autoplay.start();
      
      // Optional: Add event listeners
      swiper.on('slideChange', () => {
        console.log('Slide changed to:', swiper.activeIndex);
      });
    }
  }, []);
 const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
 // For infinite loop, we can navigate through all images
  const totalImages = images3.length;

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Move to next image, loop back to 0 when reaching the end
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Move to previous image, loop to last when at the beginning
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Get number of visible images based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 2;
    if (isTablet) return 2;
    return 5;
  };
  // Get the current visible images (4 images starting from currentIndex, wrapping around)
  const getVisibleImages = () => {
     const visibleCount = getVisibleCount();
    const visibleImages = [];
    for (let i = 0; i < visibleCount; i++) {
      const imageIndex = (currentIndex + i) % totalImages;
      visibleImages.push({ ...images3[imageIndex], originalIndex: imageIndex });
    }
    return visibleImages;
  };
  
  const handleMouseDown2 = (e) => {
    if (!isMobile) return;
    setIsDragging2(true);
    setStartX2(e.pageX || e.touches[0].pageX);
    setScrollLeft2(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave2 = () => {
    setIsDragging2(false);
  };

  const handleMouseUp2 = (e) => {
    if (!isMobile) return;
    setIsDragging2(false);
    
    // Determine if we should go to next/prev based on drag distance
    const x = e.pageX || e.changedTouches[0].pageX;
    const walk = x - startX2;
    
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        goToPrev();
      } else {
       goToNext();
      }
    }
  };

  const handleMouseMove2 = (e) => {
   if (!isDragging2 || !isMobile) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX2) * 2;
    carouselRef.current.scrollLeft = scrollLeft2 - walk;
  };
  // Handle transition end
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);
 // Auto-scroll for infinite loop effect on mobile
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      const scrollPosition = (currentIndex * clientWidth) % scrollWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile]);
const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 80,
    centeredSlides: true,
    autoplay: {
      delay: 1500, // 1.5 seconds between slides
      disableOnInteraction: false, // Continue autoplay after user interaction
      pauseOnMouseEnter: true, // Pause on hover
    },
    //pagination: {
    //  clickable: true,
     // dynamicBullets: true,
  //  },
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
    <div className={`flex flex-col min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      
      <Header />
      {/* Hero Section with margin bottom */}
      <div className="mb-12 lg:mb-16">
        <HeroSection
          onMenuToggle={() => setIsMenuOpen(true)}
          onSearchToggle={() => setIsSearchOpen(true)}
        />
      </div>
      <section className="collection-products">
        <div className="collection-products__inner">

          <div className="collection-products__head center_center }}">
            <div className={`${isRTL ? 'collection-products__title__arabic':'collection-products__title'}`}>{t('readytowearhyphened')}</div>
            <div className={`${isRTL ? 'collection-products__subtitle__arabic':'collection-products__subtitle'}`}><h3>{t('colname')}</h3></div>



            <Link className="btn btn--primary collection-products__link hover:bg-gray-600" to="/category/1">
              <span className={`${isRTL ? 'btn__name__arabic' : 'btn__name'}`}>{t('SHOPTHECOLLECTION')}</span>
            </Link>

          </div>

          <div className="collection-products__list--layout">
  <div className="collection-products__list blazy-scroll prev-arrow-show" data-items="48">
    
    <div className="swiper-button-prev">
      <svg className={`relative ${isRTL ? 'right-1/4':'left-1/4'} items-center justify-center`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-0.5" x2="17.0867" y2="-0.5" transform="matrix(0.718365 0.695667 -0.718365 0.695667 5.99988 1)" stroke="#2D2D2D"></line>
        <line y1="-0.5" x2="17.0867" y2="-0.5" transform="matrix(0.718365 -0.695667 0.718365 0.695667 6.72546 24)" stroke="#2D2D2D"></line>
      </svg>
    </div>

    <Swiper
    key={`swiper-${language}-${isRTL}`} 
      ref={swiperRef}
      {...swiperConfig}
      slidesPerView={2}
      slidesPerGroup={1}
      spaceBetween={150}
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
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 16,
        },
      }}
      className=""
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <Link to={'/category/1'}
             className="collection-products__item swipe-scroll-item"
                          draggable={false}
             onContextMenu={(e) => e.preventDefault()}
             >
            <img className="lazyautosizes lazyloaded" 
                 src={image.src} 
                 data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                 data-aspectratio="0.7333333333333333" 
                 data-sizes="auto" 
                 alt={image.alt} 
                 style={{ objectPosition: "% % " }} 
                 srcSet={image.srcSet}
                              draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                 />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="swiper-button-next">
      <svg className={`relative ${isRTL ? 'right-1/4':'left-1/4'} items-center justify-center`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-0.5" x2="17.0867" y2="-0.5" transform="matrix(0.718365 0.695667 -0.718365 0.695667 5.99988 1)" stroke="#2D2D2D"></line>
        <line y1="-0.5" x2="17.0867" y2="-0.5" transform="matrix(0.718365 -0.695667 0.718365 0.695667 6.72546 24)" stroke="#2D2D2D"></line>
      </svg>
    </div>

  </div>
</div>

<Link className="btn btn--primary link-mob collection-products__link hover:bg-gray-600" to="/category/1">
  <span className={`${isRTL ? 'btn__name__arabic' : 'btn__name'}`}>{t('SHOPTHECOLLECTION')}</span>
</Link>

        </div>


      </section>
 
      <div className="py-8">
        <div className="collection-section__inner">
          <div
            ref={scrollRef}
           className="collection-section__list blazy-scroll"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              outline: 'none',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="collection-section__item">
                <Link to={`/product/${product.id}`} className="collection-section__item--img"
                             draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                   className="lazyautosizes lazyloaded"
                    src={product.image}
                    data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                    data-aspectratio="0.7669172932330827"
                    data-sizes="auto"
                    alt={isRTL ? product.name_arabic : product.name_english}
                    style={{ objectPosition: "50% 50% " }}
                    sizes="408px"
                                 draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className={`${isRTL ? 'collection-section__item--head--arabic' : 'collection-section__item--head'} `}>
                    {/*<h4 className="collection-section__item--subheading"> {isRTL ? product.category_arabic : product.category_english}</h4>*/}
                    <h2 className="collection-section__item--heading">
                      {isRTL ? product.name_arabic : product.name_english}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
<div className="p-2 py-6 mb-10">
  <div className="row">
    <div className={`columns ${isRTL?'column-title-arabic':'column-title'} ${isMobile ? 'text-center' : ''}`}>
      <h5 className={``}>{t('SummerEscapade')}</h5>
    </div>
  </div>
      <div className="row">
        <div className="small-12 columns setPadding">
    {!isMobile && (

  <div className="relative overflow-visible">
    
        {/* Main carousel container */}
        <div className="relative overflow-hidden">
          {/* Images container with infinite loop */}
          <div className={`flex flex-row h-1/2 ${isTablet ? 'w-full':'w-1/2'}`}>
            {getVisibleImages().map((imageData, index) => (
              <div 
                key={`${currentIndex}-${index}`}
               className={`slide-item small-6 medium-6 large-3 columns carousel_slide
                `}
 
              >
                 <Link to={imageData.href} 
                              draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                 >
         <div 
className="sliderImgText"
>
  <div className="cover_img" style={{paddingBottom:"160%"}}>
      <img
                    src={imageData.src}
                    alt={isRTL?imageData.alt_arabic:imageData.alt_english}
                   // data-srcset={imageData.datasrcset}
                   // srcSet={imageData.srcset}
                    className="lazyautosizes ls-is-cached lazyloaded"
                    width="1536" height="1884" data-sizes="auto" 
                    fetchPriority="auto"
                    style={{objectPosition:"50% 50%"}} data-ac-alt-type="image" sizes="254px" 
                  loading="lazy"
                               draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                  />
  </div>
                       <div className={`${isRTL?'collection-text-arabic':'collection-text'} testing`}>{isRTL?imageData.alt_arabic:imageData.alt_english}</div>
                </div>
                 </Link>
   
              </div>
            ))}
          </div>
        </div>
        <div className="flickity-nav flickity-next" tabIndex={0} onClick={goToNext}>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" zoomAndPan="magnify" viewBox="0 0 37.5 37.499999" height="50" preserveAspectRatio="xMidYMid meet" version="1.0">
      <defs><filter x="0%" y="0%" width="100%" height="100%" id="ab2446aa99"><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" color-interpolation-filters="sRGB"></feColorMatrix></filter><clipPath id="238ac2d71c"><path d="M 18.539062 13.101562 L 25.371094 13.101562 L 25.371094 24 L 18.539062 24 Z M 18.539062 13.101562 " clip-rule="nonzero"></path></clipPath><clipPath id="9e3a4f7727"><path d="M 0.886719 0.886719 L 36.191406 0.886719 L 36.191406 36.191406 L 0.886719 36.191406 Z M 0.886719 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="5bf350be17"><path d="M 18.539062 0.886719 C 8.789062 0.886719 0.886719 8.789062 0.886719 18.539062 C 0.886719 28.285156 8.789062 36.191406 18.539062 36.191406 C 28.285156 36.191406 36.191406 28.285156 36.191406 18.539062 C 36.191406 8.789062 28.285156 0.886719 18.539062 0.886719 Z M 18.539062 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="6d043ef67f"><path d="M 0.886719 0.886719 L 36.183594 0.886719 L 36.183594 36.183594 L 0.886719 36.183594 Z M 0.886719 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="d19f09e06a"><path d="M 18.535156 0.886719 C 8.785156 0.886719 0.886719 8.785156 0.886719 18.535156 C 0.886719 28.28125 8.785156 36.183594 18.535156 36.183594 C 28.28125 36.183594 36.183594 28.28125 36.183594 18.535156 C 36.183594 8.785156 28.28125 0.886719 18.535156 0.886719 Z M 18.535156 0.886719 " clip-rule="nonzero"></path></clipPath><mask id="64e84d30bf"><g filter="url(#ab2446aa99)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="17fcc7dc81"><path d="M 0.632812 0.367188 L 8.449219 0.367188 L 8.449219 8.421875 L 0.632812 8.421875 Z M 0.632812 0.367188 " clip-rule="nonzero"></path></clipPath><clipPath id="7cef2b6c8b"><rect x="0" width="9" y="0" height="9"></rect></clipPath><mask id="b0cc12bf9b"><g filter="url(#ab2446aa99)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="c230fa3501"><path d="M 0.632812 0.527344 L 8.683594 0.527344 L 8.683594 8.578125 L 0.632812 8.578125 Z M 0.632812 0.527344 " clip-rule="nonzero"></path></clipPath><clipPath id="5a5375a9c8"><rect x="0" width="9" y="0" height="9"></rect></clipPath></defs><g clip-path="url(#238ac2d71c)"><path fill="#d5d5d4" d="M 19.363281 23.96875 C 19.1875 23.96875 19.019531 23.902344 18.886719 23.765625 C 18.625 23.507812 18.625 23.078125 18.886719 22.808594 L 23.101562 18.59375 L 18.816406 14.320312 C 18.558594 14.058594 18.558594 13.628906 18.816406 13.359375 C 19.078125 13.101562 19.507812 13.101562 19.777344 13.359375 L 25.011719 18.601562 L 19.84375 23.765625 C 19.710938 23.902344 19.542969 23.96875 19.363281 23.96875 Z M 19.363281 23.96875 " fill-opacity="1" fill-rule="nonzero"></path></g><g clip-path="url(#9e3a4f7727)"><g clip-path="url(#5bf350be17)"><path fill="#ffffff" d="M 0.886719 0.886719 L 36.191406 0.886719 L 36.191406 36.191406 L 0.886719 36.191406 Z M 0.886719 0.886719 " fill-opacity="1" fill-rule="nonzero"></path></g></g><g clip-path="url(#6d043ef67f)"><g clip-path="url(#d19f09e06a)"><path stroke-linecap="butt" transform="matrix(0.683322, 0, 0, 0.683322, 0.885313, 0.885313)" fill="none" stroke-linejoin="miter" d="M 25.829459 0.00205788 C 11.560934 0.00205788 0.00205715 11.560935 0.00205715 25.829459 C 0.00205715 40.092267 11.560934 51.656861 25.829459 51.656861 C 40.092267 51.656861 51.65686 40.092267 51.65686 25.829459 C 51.65686 11.560935 40.092267 0.00205788 25.829459 0.00205788 Z M 25.829459 0.00205788 " stroke="#f0f0f0" stroke-width="2.166274" stroke-opacity="1" stroke-miterlimit="4"></path></g></g><g mask="url(#64e84d30bf)"><g transform="matrix(1, 0, 0, 1, 15, 11)"><g clip-path="url(#7cef2b6c8b)"><g clip-path="url(#17fcc7dc81)"><path stroke-linecap="round" transform="matrix(-0.483182, -0.483182, 0.483182, -0.483182, 7.416179, 8.252292)" fill="none" stroke-linejoin="miter" d="M 0.998947 1.00265 L 12.260558 1.00265 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g><g mask="url(#b0cc12bf9b)"><g transform="matrix(1, 0, 0, 1, 15, 17)"><g clip-path="url(#5a5375a9c8)"><g clip-path="url(#c230fa3501)"><path stroke-linecap="round" transform="matrix(-0.483182, 0.483182, -0.483182, -0.483182, 8.572579, 1.58688)" fill="none" stroke-linejoin="miter" d="M 0.999797 1.001748 L 12.653503 0.997706 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g>
    </svg>
  </div>
        <div className="flickity-nav flickity-prev" tabIndex={0} onClick={goToPrev} >
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" zoomAndPan="magnify" viewBox="0 0 37.5 37.499999" height="50" preserveAspectRatio="xMidYMid meet" version="1.0">
      <defs><filter x="0%" y="0%" width="100%" height="100%" id="ebcfac5386"><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" color-interpolation-filters="sRGB"></feColorMatrix></filter><clipPath id="1dd04e1b17"><path d="M 12 13.085938 L 18.570312 13.085938 L 18.570312 23.996094 L 12 23.996094 Z M 12 13.085938 " clip-rule="nonzero"></path></clipPath><clipPath id="c0018902cb"><path d="M 0.957031 0.957031 L 36.1875 0.957031 L 36.1875 36.1875 L 0.957031 36.1875 Z M 0.957031 0.957031 " clip-rule="nonzero"></path></clipPath><clipPath id="04e320bd81"><path d="M 18.570312 36.1875 C 28.300781 36.1875 36.1875 28.300781 36.1875 18.570312 C 36.1875 8.84375 28.300781 0.957031 18.570312 0.957031 C 8.84375 0.957031 0.957031 8.84375 0.957031 18.570312 C 0.957031 28.300781 8.84375 36.1875 18.570312 36.1875 Z M 18.570312 36.1875 " clip-rule="nonzero"></path></clipPath><clipPath id="39ed93fd61"><path d="M 0.960938 0.960938 L 36.1875 0.960938 L 36.1875 36.1875 L 0.960938 36.1875 Z M 0.960938 0.960938 " clip-rule="nonzero"></path></clipPath><clipPath id="81d8f52703"><path d="M 18.574219 36.1875 C 28.300781 36.1875 36.1875 28.300781 36.1875 18.574219 C 36.1875 8.847656 28.300781 0.960938 18.574219 0.960938 C 8.847656 0.960938 0.960938 8.847656 0.960938 18.574219 C 0.960938 28.300781 8.847656 36.1875 18.574219 36.1875 Z M 18.574219 36.1875 " clip-rule="nonzero"></path></clipPath><mask id="372e8d87dd"><g filter="url(#ebcfac5386)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="cbfe130fb6"><path d="M 0.5 0.761719 L 8.550781 0.761719 L 8.550781 8.578125 L 0.5 8.578125 Z M 0.5 0.761719 " clip-rule="nonzero"></path></clipPath><clipPath id="de42e67675"><rect x="0" width="9" y="0" height="9"></rect></clipPath><mask id="320480fbc9"><g filter="url(#ebcfac5386)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="4843ac9196"><path d="M 0.5 0.605469 L 8.316406 0.605469 L 8.316406 8.65625 L 0.5 8.65625 Z M 0.5 0.605469 " clip-rule="nonzero"></path></clipPath><clipPath id="3f8384c4b6"><rect x="0" width="9" y="0" height="9"></rect></clipPath></defs><g clip-path="url(#1dd04e1b17)"><path fill="#d5d5d4" d="M 17.746094 13.152344 C 17.921875 13.152344 18.089844 13.21875 18.222656 13.351562 C 18.484375 13.613281 18.484375 14.039062 18.222656 14.308594 L 14.019531 18.515625 L 18.289062 22.78125 C 18.550781 23.039062 18.550781 23.46875 18.289062 23.738281 C 18.03125 23.996094 17.601562 23.996094 17.332031 23.738281 L 12.113281 18.507812 L 17.265625 13.351562 C 17.402344 13.21875 17.570312 13.152344 17.746094 13.152344 Z M 17.746094 13.152344 " fill-opacity="1" fill-rule="nonzero"></path></g><g clip-path="url(#c0018902cb)"><g clip-path="url(#04e320bd81)"><path fill="#ffffff" d="M 36.1875 36.1875 L 0.957031 36.1875 L 0.957031 0.957031 L 36.1875 0.957031 Z M 36.1875 36.1875 " fill-opacity="1" fill-rule="nonzero"></path></g></g><g clip-path="url(#39ed93fd61)"><g clip-path="url(#81d8f52703)"><path stroke-linecap="butt" transform="matrix(-0.68189, 0, 0, -0.68189, 36.186039, 36.186039)" fill="none" stroke-linejoin="miter" d="M 25.827963 -0.00214308 C 11.563833 -0.00214308 -0.00214234 11.563832 -0.00214234 25.827962 C -0.00214234 40.092092 11.563833 51.658067 25.827963 51.658067 C 40.092093 51.658067 51.658068 40.092092 51.658068 25.827962 C 51.658068 11.563832 40.092093 -0.00214308 25.827963 -0.00214308 Z M 25.827963 -0.00214308 " stroke="#f0f0f0" stroke-width="2.170825" stroke-opacity="1" stroke-miterlimit="4"></path></g></g><g mask="url(#372e8d87dd)"><g transform="matrix(1, 0, 0, 1, 13, 17)"><g clip-path="url(#de42e67675)"><g clip-path="url(#cbfe130fb6)"><path stroke-linecap="round" transform="matrix(0.482169, 0.482169, -0.482169, 0.482169, 1.70031, 0.857565)" fill="none" stroke-linejoin="miter" d="M 0.997219 0.999483 L 12.258186 0.999483 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g><g mask="url(#320480fbc9)"><g transform="matrix(1, 0, 0, 1, 13, 11)"><g clip-path="url(#3f8384c4b6)"><g clip-path="url(#4843ac9196)"><path stroke-linecap="round" transform="matrix(0.482169, -0.482169, 0.482169, 0.482169, 0.546335, 7.521582)" fill="none" stroke-linejoin="miter" d="M 0.99916 1.003008 L 12.653045 0.998958 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g>
    </svg>
  </div>
        {/* Navigation arrows */}
       
       </div>

    )}      
{isMobile && (
  <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown2}
            onMouseMove={handleMouseMove2}
            onMouseUp={handleMouseUp2}
            onMouseLeave={handleMouseUp2}
            onTouchStart={handleMouseDown2}
            onTouchMove={handleMouseMove2}
            onTouchEnd={handleMouseUp2}
          >
<div className="flex gap-2 pb-4" style={{ width: `${images3.length * 100}%` }}>
              {images3.map((imageData, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-full"
                  style={{ width: `${100 / images3.length}%` }}
                >
                  <Link
                    to={imageData.href}
                    className="block"
                                 draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <div className="relative cover_img" style={{paddingBottom: "160%"}}>
                        <img
                          src={imageData.src}
                          alt={isRTL?imageData.alt_arabic:imageData.alt_english}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                                       draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                       <div className={`${isRTL?'collection-text-arabic':'collection-text'} testing`}>{isRTL?imageData.alt_arabic:imageData.alt_english}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
)}
 {isMobile && (
          <div className="flex justify-center mt-4 space-x-2">
            {images3.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
       
        </div>
        
      </div>
    
      </div>


      <Benifits />
      <Footer />

      {/* Side Panels */}


      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Index;