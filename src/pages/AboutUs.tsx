import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/CustomFooter";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import Benefits from "../components/benifits";
import DesignerIntro from "../components/exper";
import DesignerIntro_Desktop from "../components/exper_desk";

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const fontClass = isRTL ? "font-arabic" : "font-english";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
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
  return (
    <div className={`min-h-screen bg-white ${fontClass} ${isRTL ? 'rtl' : 'ltr'}`} style={{
         // "padding":"4rem"
    }}>
      <Header />
      {/*<HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />*/}
      
     
     

      {/*<AboutSection />*/}
  
{isMobile?<DesignerIntro/>:<DesignerIntro_Desktop/>}
  
  
    
      {/*<Benefits/>*/}
      <Footer />

      {/* 
      
      
      Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default AboutUs;