import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import Benifits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { loadAllProducts, products } from "../data/product";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
//import { ChevronLeft, ChevronRight } from 'lucide-react';
import {PrevArrow,NextArrow} from "../components/arrows";
// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs, FreeMode } from 'swiper/modules';
import { images_fallbacks, loadImages} from "../data/images2";
import { images3_fallbacks, loadImages2} from "../data/images3";
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import Slider from 'react-slick';

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
  const swiperRef2 = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
   const [images, setImages] = useState([]);
    const [cats_images, setCats_images] = useState<any>(images3_fallbacks);
    const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
   useEffect(() => {
      const fetchImages = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const imageData = await loadImages();
          if (imageData.length==0) {
            setImages(images_fallbacks)
          }
          else {
setImages(imageData);
          }
          
        } catch (err) {
          setImages(images_fallbacks)
          console.error('Error loading products:', err);
          setError(err.message || 'Failed to load products');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchImages();
    }, []);
     useEffect(() => {
      const fetchImages2 = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const imageData = await loadImages2();
          if (imageData.length==0) {
            setCats_images(images3_fallbacks)
          }
          else {
setCats_images(imageData);
          }
          
        } catch (err) {
          setCats_images(images3_fallbacks)
          console.error('Error loading categories:', err);
          setError(err.message || 'Failed to load categories');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchImages2();
    }, []);
    useEffect(() => {
        const fetchProducts = async () => {
          setIsLoading(true);
          setError(null);
          
          try {
            const productData = await loadAllProducts();
            if (productData.length==0) {
               setProducts([
              {
    id: "1",
    name_english: "Elegant Summer Dress",
    name_arabic: "فستان صيفي أنيق",
    price: 189,
    image: "/p11.jpeg",
    hoverImage: "/p12.jpeg",
    images : ['/p12.jpeg','/p11.jpeg'],
    category_english: "Dresses",
    category_arabic:"فساتين",
    collection: "",
    category:"",
    description_english: "A flowing summer dress perfect for warm days",
    description_arabic: "فستان صيفي متدفق مثالي للأيام الدافئة",
    sizes: ["XS", "S", "M", "L", "XL"],
    available:[true,false,false,false,true,false,true,true,true,true],
    colors: ["#a4ad98"],
    inStock: true,
    rating: 4.8,
    reviews: 124
  }
            ])
            }
            else {
setProducts(productData);
            }
            
          } catch (err) {
            setProducts([
              {
    id: "1",
    name_english: "Elegant Summer Dress",
    name_arabic: "فستان صيفي أنيق",
    price: 189,
    image: "/p11.jpeg",
    hoverImage: "/p12.jpeg",
    images : ['/p12.jpeg','/p11.jpeg'],
    category_english: "Dresses",
    category_arabic:"فساتين",
    collection: "",
    category:"",
    description_english: "A flowing summer dress perfect for warm days",
    description_arabic: "فستان صيفي متدفق مثالي للأيام الدافئة",
    sizes: ["XS", "S", "M", "L", "XL"],
    available:[true,false,false,false,true,false,true,true,true,true],
    colors: ["#a4ad98"],
    inStock: true,
    rating: 4.8,
    reviews: 124
  }
            ])
            console.error('Error loading products:', err);
            setError(err.message || 'Failed to load products');
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchProducts();
      }, []);
  const carouselRef = useRef(null);
   // Slider settings
  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Enable infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1 // Number of slides to scroll

  };
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
  const totalImages = images3_fallbacks.length;

// Modified goToNext function for circular behavior
const goToNext = () => {
  setIsTransitioning(true);
  setCurrentIndex(prevIndex => {
    // Assuming you have a totalImages variable with the number of images
    const nextIndex = prevIndex + 1;
    return nextIndex >= totalImages ? 0 : nextIndex; // Wrap to start
  });
};

// Modified goToPrev function for circular behavior
const goToPrev = () => {
  setIsTransitioning(true);
  setCurrentIndex(prevIndex => {
    // Assuming you have a totalImages variable with the number of images
    const prevIdx = prevIndex - 1;
    return prevIdx < 0 ? totalImages - 1 : prevIdx; // Wrap to end
  });
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
      visibleImages.push({ ...images3_fallbacks[imageIndex], originalIndex: imageIndex });
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
    }, 1000); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);
 // Auto-scroll for infinite loop effect on mobile
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      const scrollPosition = (currentIndex * clientWidth) % scrollWidth;
      if (currentIndex!=0) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });}
      else {
        carouselRef.current.scrollTo({
        right: 0,
        behavior: 'smooth'
      });
      }
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
    rtl:isRTL ? 'true' : 'false',
      // Observer to watch for changes
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    //watchSlidesVisibility: true,
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
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
   prevArrow:  <PrevArrow/>,
   nextArrow: <NextArrow/>,
  
          
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ]
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



            <Link className="btn btn--primary collection-products__link hover:bg-gray-600" to="/exclusive">
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
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={10}
  centeredSlides={false} 
  autoplay={{
    delay: 1500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  dir={isRTL ? 'rtl' : 'ltr'}
  observer={true}
  observeParents={true}
  watchSlidesProgress={true}
  updateOnWindowResize={true}
  navigation={{
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  }}
  loop={true}
  speed={800}
  slidesPerView={2}
  slidesPerGroup={1}   // ✅ move one slide at a time (no blanks ever)
  breakpoints={{
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 8,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1, // ✅ still one-by-one scroll
      spaceBetween: 16,
    },
    1500: {
      slidesPerView: 2,
      slidesPerGroup: 1, // ✅ safe for all counts
      spaceBetween: 10,
    },
  }}
>
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <Link to={`/category/${image.category}`}
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
                 //srcSet={image.srcSet}
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
<div className="py-6 mb-10">
  <div className="row">
    <div className={`columns ${isRTL?'column-title-arabic':'column-title'} ${isMobile ? 'text-center' : ''}`}>
      <h5 className={``}>{t('ShopReadyToWear')}</h5>
    </div>
  </div>
      <div className="row">
        <div className="small-12 columns setPadding">
          {!isMobile && (
            
              <div className="relative overflow-visible"><div className="relative overflow-visible">
                <Slider {...settings2} className="image-slider">
                  {cats_images.map((imageData, index) => (
                    <div key={index} className="">
                      <Link
                        to={imageData.href}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <div className="sliderImgText">
                          <div className="cover_img" style={{ paddingBottom: "160%" }}>
                            <img
                              src={imageData.src}
                              alt={isRTL ? imageData.alt_arabic : imageData.alt_english}
                              className="lazyautosizes ls-is-cached lazyloaded"
                              width="400"
                              height="600"
                              data-sizes="auto"
                              //fetchPriority="auto"
                              style={{ objectPosition: "50% 50%" }}
                              data-ac-alt-type="image"
                              sizes="254px"
                              loading="lazy"
                              onContextMenu={(e) => e.preventDefault()} />
                          </div>
                          <div className={`${isRTL ? 'collection-text-arabic' : 'collection-text'} testing mt-2 text-center text-sm font-medium text-gray-700`}>
                            {isRTL ? imageData.alt_arabic : imageData.alt_english}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div><style>{`
        .image-slider .slick-slide {
          padding: 0 2.5px;
          width:100%;
          height:100%;
        }
        
        .image-slider .slick-list {
          margin: 0px;
          width:100%;
          height:100%;
        }
      
        
        .slick-track {
          display: flex;
          align-items: stretch;
        }
        
        .slick-slide > div {
          height: 100%;
        }
      `}</style></div>

          )}
        
      { isMobile && (
  <div className="mobile-carousel-container">
    <Slider 
      className="mobile-image-carousel"
      centerMode={true}
      centerPadding="13.5%"
      slidesToShow={1}
      slidesToScroll={1}
      infinite={true}
      dots={false}
      responsive={[
        {
          breakpoint: 768,
          settings: {
            centerPadding: "17%",
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: "13.5%",
            slidesToShow: 1
          }
        }
      ]}
     // prevArrow={<div className="slick-prev-custom">‹</div>}
     // nextArrow={<div className="slick-next-custom">›</div>}
    >
      {cats_images.map((imageData, index) => (
        <div 
          key={`${currentIndex}-${index}`}
         //className="carousel-slide-wrapper"
         className="slide-item small-6 medium-6 large-3 columns carousel_slide"
        >
          <Link 
            to={imageData.href} 
            onContextMenu={(e) => e.preventDefault()}
            className="carousel-link"
          >
            <div className="sliderImgText">
              <div className="cover_img" style={{paddingBottom:"160%"}}>
                <img
                  src={imageData.src}
                  alt={isRTL ? imageData.alt_arabic : imageData.alt_english}
                  className="lazyautosizes ls-is-cached lazyloaded carousel-image"
                  width="1536" 
                  height="1884" 
                  data-sizes="auto" 
                  //fetchPriority="auto"
                  style={{objectPosition:"50% 50%"}} 
                  data-ac-alt-type="image" 
                  sizes="254px" 
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className={`${isRTL ? 'collection-text-arabic' : 'collection-text'} testing`}>
                {isRTL ? imageData.alt_arabic : imageData.alt_english}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>

    <style>{`
    .mobile-carousel-container {
        width: 100%;
        height:100%;
        max-height:100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
        overflow:hidden;
      }

      .mobile-image-carousel {
        width: 100%;
        height:100%;
        margin: 0;
        padding: 0;
      }

      .mobile-image-carousel .slick-slide {
        padding:0 2.5px;
        

      .mobile-image-carousel .slick-slide > div {
        margin: 0;
        padding: 0;
      }

      .carousel-slide-wrapper {
        outline: none;
        padding: 0;
        margin: 0;
        max-width:100%;
       
      }

      .carousel-link {
        display: block;
        text-decoration: none;
        outline: none;
      }

      .carousel-image {
        width: 100%;
        height: 100%;
        display: block;
      }

      .slick-prev-custom,
      .slick-next-custom {
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10;
        transition: background 0.3s ease;
      }

      .slick-prev-custom:hover,
      .slick-next-custom:hover {
        background: rgba(0, 0, 0, 0.7);
      }

      .slick-prev-custom {
        left: 10px;
      }

      .slick-next-custom {
        right: 10px;
      }


      /* Remove any default spacing */
      .mobile-image-carousel .slick-track {
        margin: 0;
        padding: 0;
      }

      .mobile-image-carousel .slick-list {
        margin: 0;
        padding: 0;
      }
    `}</style>
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