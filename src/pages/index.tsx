import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/CustomFooter";
import Benifits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { products } from "../data/product";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { images} from "../data/images2";
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
   const swiperRef = useRef(null);
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
      <svg className="relative left-1/4 items-center justify-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
             className="collection-products__item swipe-scroll-item">
            <img className="lazyautosizes lazyloaded" 
                 src={image.src} 
                 data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                 data-aspectratio="0.7333333333333333" 
                 data-sizes="auto" 
                 alt={image.alt} 
                 style={{ objectPosition: "% % " }} 
                 srcSet={image.srcSet}/>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="swiper-button-next">
      <svg className="relative left-1/4 items-center justify-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      {/* Main Content Section with proper spacing */}
      {/*<div className="flex flex-col items-center">

     <div className="columns__wrapper">
        <div className="columns__row">
            <div className="columns__item">
                <div className="columns__item--images ">
                    
                    

                        
                            <Link to="/category/1" className="columns__item--img">
                                



  
<img className="lazyloaded" 
//src="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_10x.jpg?v=1747314292" 
src="/ES_PF25_MB_2720x1400_GB_10x.jpg?v=1747314292"
data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.9428571428571428" data-sizes="auto" alt="" style={{objectPosition:"41% 52% "}} 
srcSet="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w" sizes="899px"srcSet="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w"
/>
  



                            </Link>
                        
                        
                    
                </div>
                <div className={`${isRTL?'columns__item--content--arabic':'columns__item--content'} `}>
                    
                        <p className={`${isRTL?'columns__item--title--arabic':'columns__item--title'}`}></p><h4>{t('readytowear')}</h4><br/><h3>{t('readytowearcat')}</h3><br/><p></p>
                    
                    
                        <p className={`${isRTL?'columns__item--description--arabic':'columns__item--description'}`}>{t('readytowearDescription')}</p>
                    
                    
                        
                            <Link className="btn btn--primary hover:bg-gray-600" to="/category/1">
                                <span className={`${isRTL?'btn__name__arabic':'btn__name'}`}>{t('shopNow')}</span>
                            </Link>
                        
                    
                </div>
            </div>
        </div>
    </div>
 </div>*/}

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
                <Link to={`/product/${product.id}`} className="collection-section__item--img">
                  <img
                   className="lazyautosizes lazyloaded"
                    src={product.image}
                    data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                    data-aspectratio="0.7669172932330827"
                    data-sizes="auto"
                    alt={isRTL ? product.name_arabic : product.name_english}
                    style={{ objectPosition: "50% 50% " }}
                    sizes="408px"
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


      <div className="flex flex-col items-center py-8">
        {/* Featured Collection Section */}

        <div className="columns__wrapper">
          <div className="columns__row">
            <div className="columns__item">
              <div className="columns__item--images ">




                <Link to="/hautecouture" className="columns__item--img">





                  <img className="lazyloaded"
                    //src="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_10x.jpg?v=1744826476" 
                    src="/HC-FW-24-24-CLP-OPTION-3_10x.jpg?v=1744826476"
                    data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                    data-aspectratio="2.627497062279671"
                    data-sizes="auto"
                    alt=""
                    style={{ objectPosition: "50% 50% " }}
                  srcSet="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_180x.jpg?v=1744826476 180w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_360x.jpg?v=1744826476 360w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_540x.jpg?v=1744826476 540w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_720x.jpg?v=1744826476 720w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_900x.jpg?v=1744826476 900w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1080x.jpg?v=1744826476 1080w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1296x.jpg?v=1744826476 1296w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1512x.jpg?v=1744826476 1512w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1728x.jpg?v=1744826476 1728w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_2048x.jpg?v=1744826476 2048w"
                    sizes="1041px"
                    data-src="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_180x.jpg?v=1744826476 180w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_360x.jpg?v=1744826476 360w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_540x.jpg?v=1744826476 540w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_720x.jpg?v=1744826476 720w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_900x.jpg?v=1744826476 900w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1080x.jpg?v=1744826476 1080w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1296x.jpg?v=1744826476 1296w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1512x.jpg?v=1744826476 1512w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1728x.jpg?v=1744826476 1728w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_2048x.jpg?v=1744826476 2048w"
                  />




                </Link>



              </div>
              <div className={`${isRTL ? 'columns__item--content--arabic' : 'columns__item--content'} `}>

                <p className={`${isRTL ? 'columns__item--title--arabic' : 'columns__item--title'}`}></p><h4

                 className=""
                >{t('hautecouture')}</h4><br /><h3

                >{t('CustomDesigns')}</h3><br /><p></p>


                <p className={`${isRTL ? 'columns__item--description--arabic' : 'columns__item--description'}`}>{t('hautecoutureDescription')}</p>



                <Link className="btn btn--primary hover:bg-gray-600" to="/hautecouture">
                  <span className={`${isRTL ? 'btn__name__arabic' : 'btn__name'}`}>{t('customDesignRequest')}</span>
                </Link>


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with proper spacing */}
      {/*<div className="py-12 lg:py-16">
        <AboutSection />
      </div>*/}

      {/* Testimonials Section with proper spacing */}
      {/*<div className="py-12 lg:py-16 bg-gray-50">
        <TestimonialsSection />
      </div>*/}

      <Benifits />
      <Footer />

      {/* Side Panels */}


      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Index;