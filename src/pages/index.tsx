import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductCarousel from "../components/ProductCarousel";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { products } from "../data/product";
import { categories } from "../data/product";
import { useTranslation } from "..//hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import HauteProductCard from "../components/HauteProductCard";
import CategoryCarousel from "../components/CategoryCarousel";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const collection1 = products.filter(p => p.collection === 'summer');
  const collection2 = products.filter(p => p.collection === 'winter');
  const collection3 = products.filter(p => p.collection === 'spring');

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
      {/* Collection 1 - Haute Couture */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-rows-0 md:grid-rows-1 gap-5 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">{t('hautecouture')}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('hautecoutureDescription')}
              </p>
            </div>
            
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <HauteProductCard product={collection1[1]} />
            </div>
          </div>
        </div>
      </section>

      {/* Collection 2 - Winter Collection */}
      <section id="products-section" className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="flex flex-col gap-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">{t('readytowear')}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('readytowearDescription')}
              </p>
            </div>
            <div className="w-full">
              <CategoryCarousel categories={categories} />
            </div>
          </div>
             <div className="w-full items-center">
                <ProductCarousel products={products} />
            </div>
        </div>
      </section>

      
     

      <AboutSection />
      <TestimonialsSection />
      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Index;