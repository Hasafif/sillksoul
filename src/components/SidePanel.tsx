import { X, Home, ShoppingBag, Phone, Star,FileText} from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";
import { categories } from "../data/product";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const { language,isRTL } = useLanguage();
  const { t } = useTranslation();
  // Define the dropdown options
const collectionOptions = [
  ...(categories || []).map(category => ({
    label: (language == 'en') ? category.name_english : category.name_arabic,
    path: `/category/${category.id}`
  })),

];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 bg-white shadow-xl z-50 transition-transform overflow-y-scroll duration-300 ${
        isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'font-arabic' : 'font-english'}`}>
            <h2 className="text-2xl font-bold text-gray-900">{t('menu')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <LanguageSwitcher variant="buttons" />
          </div>

          {/* Navigation Links */}
          <nav className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link
              to="/"
              onClick={onClose}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 rounded-lg hover:bg-gray-100 transition-colors`}
            >
              <Home className="w-5 h-5 text-gray-600" />
              <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>{t('home')}</span>
            </Link>
            
        <div 
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <Link
        to="/"
        onClick={onClose}
        className={`flex items-center justify-between ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 rounded-lg hover:bg-gray-100 transition-colors w-full`}
      >
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <ShoppingBag className="w-5 h-5 text-gray-600" />
          <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>{t('readytowear')}</span>
        </div>
     
      </Link>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
        onMouseLeave={() => setIsDropdownOpen(false)}
        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2`}>
          {collectionOptions.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              //onClick={onClose}
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                isRTL ? 'text-right' : 'text-left'
              } ${isRTL ? 'font-arabic' : 'font-english'}` }
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
               <Link
              to="/hautecouture"
              onClick={onClose}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 rounded-lg hover:bg-gray-100 transition-colors`}
            >
              <Star className="w-5 h-5 text-gray-600" />
              <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>{t('hautecouture')}</span>
            </Link>
              <Link
              to="/aboutus"
              onClick={onClose}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 rounded-lg hover:bg-gray-100 transition-colors`}
            >
              <FileText className="w-5 h-5 text-gray-600"/>
              <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>{t('aboutTitle')}</span>
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} p-3 rounded-lg hover:bg-gray-100 transition-colors`}
            >
              <Phone className="w-5 h-5 text-gray-600" />
              <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>{t('contact')}</span>
            </Link>
          </nav>

          {/* Featured Section */}
          <div className={`mt-2 p-4 bg-gray-50 rounded-lg ${isRTL ? 'font-arabic' : 'font-english'}`}>
            <h3 className="font-semibold text-gray-900 mb-1">{t('featuredSection')}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {t('featuredText')}
            </p>
            <Link
              to="/"
              onClick={onClose}
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              {t('shopNow')} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;