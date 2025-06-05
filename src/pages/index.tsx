import { useRef, useState } from "react";
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

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
      
      {/* Main Content Section with proper spacing */}
       <div className="flex flex-col items-center">
        {/* Featured Collection Section */}
       
     <div className="columns__wrapper">
        <div className="columns__row">
            <div className="columns__item">
                <div className="columns__item--images ">
                    
                    

                        
                            <a href="/category/1" className="columns__item--img">
                                



  
<img className="lazyloaded" 
src="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_10x.jpg?v=1747314292" 
//src="/p62.jpeg"
data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.9428571428571428" data-sizes="auto" alt="" style={{objectPosition:"41% 52% "}} 
data-srcset="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w" sizes="899px" srcSet="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w"
/>
  



                            </a>
                        
                        
                    
                </div>
                <div className={`${isRTL?'columns__item--content--arabic':'columns__item--content'} `}>
                    
                        <p className={`${isRTL?'columns__item--title--arabic':'columns__item--title'}`}></p><h4>{t('readytowear')}</h4><br/><h3>{t('readytowearcat')}</h3><br/><p></p>
                    
                    
                        <p className={`${isRTL?'columns__item--description--arabic':'columns__item--description'}`}>{t('readytowearDescription')}</p>
                    
                    
                        
                            <a className="btn btn--primary hover:bg-gray-600" href="/category/1">
                                <span className={`${isRTL?'btn__name__arabic':'btn__name'}`}>{t('shopNow')}</span>
                            </a>
                        
                    
                </div>
            </div>
        </div>
    </div>
 </div>
    
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
                <a href={`/product/${product.id}`} className="collection-section__item--img">
                  <img 
                    className="lazyautosizes lazyloaded" 
                    src={product.image} 
                    data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" 
                    data-aspectratio="0.7669172932330827" 
                    data-sizes="auto" 
                    alt={isRTL ? product.name_arabic : product.name_english} 
                    style={{objectPosition: "50% 50% "}} 
                    sizes="408px" 
                  />
                  <div className={`${isRTL?'collection-section__item--head--arabic':'collection-section__item--head'} `}>
                   {/*<h4 className="collection-section__item--subheading"> {isRTL ? product.category_arabic : product.category_english}</h4>*/}
                    <h2 className="collection-section__item--heading">
                      {isRTL ? product.name_arabic : product.name_english}
                    </h2>
                  </div>
                </a>
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
                    
                    

                        
                            <a href="/hautecouture" className="columns__item--img">
                                



  
<img className="lazyloaded" 
src="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_10x.jpg?v=1744826476" 
data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" 
data-aspectratio="2.627497062279671" 
data-sizes="auto" 
alt="" 
style={{objectPosition: "50% 50% "}} 
srcSet="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_180x.jpg?v=1744826476 180w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_360x.jpg?v=1744826476 360w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_540x.jpg?v=1744826476 540w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_720x.jpg?v=1744826476 720w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_900x.jpg?v=1744826476 900w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1080x.jpg?v=1744826476 1080w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1296x.jpg?v=1744826476 1296w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1512x.jpg?v=1744826476 1512w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1728x.jpg?v=1744826476 1728w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_2048x.jpg?v=1744826476 2048w" 
sizes="1041px"
data-srcSet="//us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_180x.jpg?v=1744826476 180w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_360x.jpg?v=1744826476 360w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_540x.jpg?v=1744826476 540w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_720x.jpg?v=1744826476 720w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_900x.jpg?v=1744826476 900w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1080x.jpg?v=1744826476 1080w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1296x.jpg?v=1744826476 1296w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1512x.jpg?v=1744826476 1512w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_1728x.jpg?v=1744826476 1728w, //us.eliesaab.com/cdn/shop/files/HC-FW-24-24-CLP-OPTION-3_2048x.jpg?v=1744826476 2048w"
/>
  



                            </a>
                        
                        
                    
                </div>
                <div className={`${isRTL?'columns__item--content--arabic':'columns__item--content'} `}>
                    
                        <p className={`${isRTL?'columns__item--title--arabic':'columns__item--title'}`}></p><h4
                        
                       className=""
                        >{t('hautecouture')}</h4><br/><h3
                         
                        >{t('CustomDesigns')}</h3><br/><p></p>
                    
                    
                        <p className={`${isRTL?'columns__item--description--arabic':'columns__item--description'}`}>{t('hautecoutureDescription')}</p>
                    
                    
                        
                            <a className="btn btn--primary hover:bg-gray-600" href="/hautecouture">
                                <span className={`${isRTL?'btn__name__arabic':'btn__name'}`}>{t('customDesignRequest')}</span>
                            </a>
                        
                    
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

    <Benifits/>
      <Footer />

      {/* Side Panels */}
     

      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Index;