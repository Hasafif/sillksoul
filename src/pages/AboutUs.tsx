import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/CustomFooter";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import Benefits from "../components/benifits";


const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const fontClass = isRTL ? "font-arabic" : "font-english";
 

  return (
    <div className={`min-h-screen bg-white ${fontClass} ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
     
     

      <AboutSection />
      <Benefits/>
      <Footer />

      {/* 
      
      
      Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default AboutUs;