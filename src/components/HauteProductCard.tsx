import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import type { Product } from "../types/product";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
}

const HauteProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Link to={`/hautecouture`}>
        {/* Image Container */}
        <div className="relative aspect-[12/4] overflow-hidden">
          <img
            src={isHovered ? product.hoverImage : product.image}
            //alt={language === 'ar' && product.nameAr ? product.nameAr : product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          
          {/* Custom More Button */}
          <button 
            className={`
              absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm 
              text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 
              transition-all duration-300 hover:bg-black flex items-center
              ${isRTL ? 'space-x-2 flex-row-reverse' : 'space-x-2'}
            `}
          >
            <Eye className="w-4 h-4" />
            <span className={isRTL ? 'font-arabic' : ''}>{t('customDesigntitle')}</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default HauteProductCard;