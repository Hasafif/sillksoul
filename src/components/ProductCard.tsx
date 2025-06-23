import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyProvider";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { formatPrice } = useCurrency();
  const productName = language === 'en' ? product.name_english : product.name_arabic;
  const productCategory = language === 'en' ? product.category_english : product.category_arabic;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`
        group relative block overflow-hidden
        transition-all duration-300 hover:shadow-xl
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full Image Container with Overlays */}
      <div className="relative aspect-[5/8] overflow-hidden bg-gray-100">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Add Button - Top Corner */}
        <button
          onClick={handleAddToCart}
          className={`
            absolute top-3 z-20 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg 
            transition-all duration-300 hover:bg-white hover:scale-110
            ${isRTL ? 'left-3' : 'right-3'}
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
          aria-label={t('addToCart')}
        >
          <ShoppingCart className="h-4 w-4 text-gray-700" />
        </button>

        {/* Product Info Overlay - Bottom */}
        <div className={`
          absolute bottom-0 left-0 right-0 z-10 p-4 
          bg-gradient-to-t from-black/80 to-transparent
          text-white transition-all duration-300
          ${isRTL ? 'text-right' : 'text-left'}
          ${isHovered ? 'transform translate-y-0' : 'transform translate-y-2'}
        `}>
          {/* Product Name */}
          <h3 className={`
            mb-1 font-semibold text-white drop-shadow-sm
            ${isRTL ? 'font-arabic' : 'font-english'}
          `}>
            {productName}
          </h3>
          
          {/* Category */}
          <p className={`
            mb-2 text-sm text-gray-200 drop-shadow-sm
            ${isRTL ? 'font-arabic' : 'font-english'}
          `}>
            {productCategory}
          </p>
          
          {/* Price and Details Row */}
          <div className={`
            flex items-center justify-between
            ${isRTL ? 'flex-row-reverse' : 'flex-row'}
          `}>
            {/* Price */}
            <span className="text-lg font-bold text-white drop-shadow-sm">
              {formatPrice(product.price)}
            </span>
            
            {/* Details Link with Arrow */}
            <span className={`
              text-sm text-blue-300 transition-colors group-hover:text-blue-200 drop-shadow-sm
              ${isRTL ? 'font-arabic' : 'font-english'}
            `}>
              {isRTL ? `← ${t('details')}` : `${t('details')} →`}
            </span>
          </div>
        </div>

        {/* Subtle Border Overlay on Hover */}
        <div className={`
          absolute inset-0 border-2 border-blue-500/50 rounded-lg
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
      </div>
    </Link>
  );
};

export default ProductCard;