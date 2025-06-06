import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { categories } from "../data/product";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

const Category = () => {
  const { id } = useParams();
  const category = categories.find(p => p.id === id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Category Not Found' : 'الصنف غير موجود'}
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            {language === 'en' ? 'Return to Home' : 'العودة إلى الصفحة الرئيسية'}
          </Link>
        </div>
      </div>
    );
  }

  let category_name = (language == 'en') ? category.name_english : category.name_arabic;
  
  // Filter and sort products
  let filteredProducts = category.products;
  if (filterBy !== "all" && language == 'en') {
    filteredProducts = filteredProducts.filter(p => p.category_english.toLowerCase() === filterBy);
  }
  else if (filterBy !== "all" && language == 'ar') {
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
      if (language == "en") {
        filteredProducts.sort((a, b) => a.name_english.localeCompare(b.name_english));
      }
      else {
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
      
      {/* Category Products Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{category_name}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("category1description")}
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className={`flex flex-wrap ${isRTL ? 'justify-between' : 'justify-between'} items-center mb-8 gap-4`}>
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Price Range */}
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <input
                  type="number"
                  placeholder={isRTL ? "الحد الأدنى" : "Min"}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className={`w-20 px-2 py-2 border border-gray-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder={isRTL ? "الحد الأقصى" : "Max"}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className={`w-20 px-2 py-2 border border-gray-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
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

          {filteredProducts.length === 0 && (
            <div className={`text-center py-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
              <p className="text-gray-500 text-lg">{t("filter1")}</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Category;