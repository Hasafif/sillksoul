import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/CustomFooter";
import Benefits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { products } from "../data/product";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { categories } from "../data/product";

const Exclusive = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Filter and sort products
  let filteredProducts = products;

  // Apply filters
  if (filterBy !== "all" && language === 'en') {
    filteredProducts = filteredProducts.filter(p => p.category_english.toLowerCase() === filterBy);
  } else if (filterBy !== "all" && language === 'ar') {
    filteredProducts = filteredProducts.filter(p => p.category_arabic.toLowerCase() === filterBy);
  }

  // Apply price range
  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange.min && p.price <= priceRange.max
  );

  // Apply sorting
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      if (language === "en") {
        filteredProducts.sort((a, b) => a.name_english.localeCompare(b.name_english));
      } else {
        filteredProducts.sort((a, b) => a.name_arabic.localeCompare(b.name_arabic));
      }
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
      {/* Exclusive Products Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className={`
              text-4xl font-bold text-gray-900 mb-4
              ${isRTL ? 'font-arabic' : 'font-english'}
            `}>
              {t("exclusiveDesigns")}
            </h2>
            {/*<p className={`
              text-lg text-gray-600 max-w-2xl mx-auto
              ${isRTL ? 'font-arabic leading-relaxed' : 'font-english leading-relaxed'}
            `}>
              {t("exclusiveDescription")}
            </p>*/}
          </div>

          {/* Filters and Sorting */}
          <div className={`
            flex flex-wrap justify-between items-center mb-8 gap-4
            ${isRTL ? 'flex-row-reverse' : 'flex-row'}
          `}>
            {/* Filter Controls */}
            <div className={`
              flex flex-wrap gap-4
              ${isRTL ? 'flex-row-reverse' : 'flex-row'}
            `}>
              {/* Category Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className={`
                  px-4 py-2 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${isRTL ? 'text-right font-arabic' : 'text-left'}
                `}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="all">
                  {language === 'en' ? 'All Categories' : 'جميع الفئات'}
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={language === 'en' ? category.name_english.toLowerCase() : category.name_arabic.toLowerCase()}>
                    {language === 'en' ? category.name_english: category.name_arabic}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div className={`
                flex items-center gap-2
                ${isRTL ? 'flex-row-reverse' : 'flex-row'}
              `}>
                <input
                  type="number"
                  placeholder={isRTL ? 'الحد الأدنى' : 'Min'}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className={`
                    w-20 px-2 py-2 border border-gray-300 rounded-lg
                    ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                  `}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder={isRTL ? 'الحد الأقصى' : 'Max'}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className={`
                    w-20 px-2 py-2 border border-gray-300 rounded-lg
                    ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                  `}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`
                px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
              `}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="name">{t("sortoption1")}</option>
              <option value="price-low">{t("sortoption2")}</option>
              <option value="price-high">{t("sortoption3")}</option>
              <option value="rating">{t("sortoption4")}</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className={`
              text-center py-12
              ${isRTL ? 'text-right' : 'text-left'} sm:text-center
            `}>
              <p className={`
                text-gray-500 text-lg
                ${isRTL ? 'font-arabic' : 'font-english'}
              `}>
                {t("filter1")}
              </p>
            </div>
          )}
        </div>
      </section>
        <Benefits/>
      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Exclusive;