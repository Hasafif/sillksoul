import { useState } from "react";
import { X, Search } from "lucide-react";
import { products } from "../data/product";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();

  const filteredProducts = products.filter(product => {
    // Get the appropriate product name based on language
    const productName = (language === 'en') 
      ? product.name_english 
      : product.name_arabic;
    
    const categoryName = (language === 'en')
      ? product.category_english
      : product.category_arabic;
    
    // Filter based on the language-specific name and category
    return productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'en' ? 'Search' : 'بحث'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search products...' : 'البحث عن المنتجات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Search Results */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {searchTerm ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  // Get the appropriate product name and category based on language
                  const productName = (language === 'en') 
                    ? product.name_english 
                    : product.name_arabic;
                  
                  const categoryName = (language === 'en')
                    ? product.category_english
                    : product.category_arabic;

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{productName}</h3>
                        <p className="text-sm text-gray-600">{categoryName}</p>
                        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {language === 'en' ? 'Start typing to search products' : 'ابدأ الكتابة للبحث عن المنتجات'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;