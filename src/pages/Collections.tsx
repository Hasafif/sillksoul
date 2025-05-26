import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductCarousel from "../components/ProductCarousel";
import Footer from "../components/Footer";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { products } from "../data/product";

const Collections = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const summerCollection = products.filter(p => p.collection === 'summer');
  const winterCollection = products.filter(p => p.collection === 'winter');
  const springCollection = products.filter(p => p.collection === 'spring');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
      {/* Summer Collection */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Summer Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Light, breathable fabrics and vibrant colors perfect for warm weather adventures.
            </p>
          </div>
          <ProductCarousel products={summerCollection} />
        </div>
      </section>

      {/* Winter Collection */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Winter Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Luxurious materials and sophisticated designs to keep you warm and stylish.
            </p>
          </div>
          <ProductCarousel products={winterCollection} />
        </div>
      </section>

      {/* Spring Collection */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Spring Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fresh designs and delicate patterns celebrating the renewal of spring.
            </p>
          </div>
          <ProductCarousel products={springCollection} />
        </div>
      </section>

      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Collections;