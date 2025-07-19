import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { useCurrency } from "../contexts/CurrencyProvider";

const Cart = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const {formatPrice} = useCurrency();
  const shipping = getTotalPrice() > 200 ? 0 : 15;
  const tax = getTotalPrice() * 0.08;
  const total = getTotalPrice() + shipping + tax;
  const fontClass = isRTL ? "font-arabic" : "font-english";
  
  // Helper function to get localized item name
  const getItemName = (item) => {
    return language === 'ar' ? (item.name_arabic) : item.name_english;
  };

  // Helper function to get localized category
  const getItemCategory = (item) => {
    return language === 'en' ? (item.category_english) : item.category_arabic;
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <HeroSection 
          onMenuToggle={() => setIsMenuOpen(true)}
          onSearchToggle={() => setIsSearchOpen(true)}
        />
        
        <section className="py-16 px-4 md:px-8">
          <div className={`max-w-3xl mx-auto text-center ${fontClass}`}>
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('cartempty')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('cartemptydescription')}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {t('cartcontinueShopping')}
            </Link>
          </div>
        </section>

        <Footer />
        <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
      <section className="py-8 sm:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 ${fontClass}`}>
            {t('carttitle')} ({getTotalItems()} {t('cartitems')})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  className={`bg-gray-50 rounded-lg p-4 sm:p-6 ${fontClass}`}
                >
                  {/* Mobile Layout (< 480px) */}
                  <div className="block xs:hidden">
                    {/* Top Row: Image and Remove Button */}
                    <div className="flex items-start justify-between mb-3">
                      <img
                        src={item.image}
                        alt={getItemName(item)}
                        className="w-20 h-20 object-cover rounded-md"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Product Info */}
                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {getItemName(item)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {getItemCategory(item)}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-600">
                          {t('cartsize')} {item.selectedSize}
                        </p>
                      )}
                      {/*item.selectedColor && (
                        <p className="text-xs text-gray-600">
                          {t('cartcolor')} {item.selectedColor}
                        </p>
                      )*/}
                    </div>
                    
                    {/* Bottom Row: Price and Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.price)}
                      </p>
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-base font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout (>= 480px) */}
                  <div className={`hidden xs:flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                    <img
                      src={item.image}
                      alt={getItemName(item)}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getItemName(item)}
                      </h3>
                      <p className="text-gray-600">
                        {getItemCategory(item)}
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-600">
                          {t('cartsize')}: {item.selectedSize}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-gray-600">
                          {t('cartcolor')}: {item.selectedColor}
                        </p>
                      )}
                      <p className="text-lg font-semibold text-gray-900 mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={`bg-gray-50 p-4 sm:p-6 rounded-lg h-fit ${fontClass}`}>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                {t('cartorderSummary')}
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">{t('cartsubtotal')}</span>
                  <span className="font-medium text-sm sm:text-base">
                    {formatPrice(Number(getTotalPrice().toFixed(2)))}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">{t('cartshipping')}</span>
                  <span className="font-medium text-sm sm:text-base">
                    {shipping === 0 
                      ? t('cartfreeShipping') 
                      : formatPrice(Number(shipping.toFixed(2)))
                    }
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">{t('carttax')}</span>
                  <span className="font-medium text-sm sm:text-base">
                    {formatPrice(Number(tax.toFixed(2)))}
                  </span>
                </div>
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold">{t('carttotal')}</span>
                    <span className="text-base sm:text-lg font-semibold">
                      {formatPrice(Number(total.toFixed(2)))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="btn2 btn2--primary w-full text-white py-3 px-4 sm:px-6 hover:bg-gray-600 transition-colors text-center block text-sm sm:text-base"
                >
                  {t('cartproceedToCheckout')}
                </Link>
                
                <Link
                  to="/"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 sm:px-6 hover:bg-gray-50 transition-colors text-center block text-sm sm:text-base"
                >
                  {t('cartcontinueShopping')}
                </Link>
              </div>

              {getTotalPrice() < 200 && (
                <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
                  {t('Add')} ${(200 - getTotalPrice()).toFixed(2)} {t('moreforfreeshipping')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Cart;