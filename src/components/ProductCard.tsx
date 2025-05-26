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
        group relative block overflow-hidden rounded-lg bg-white shadow-md 
        transition-all duration-300 hover:shadow-xl
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Add Button - Positioned based on RTL */}
        <button
          onClick={handleAddToCart}
          className={`
            absolute top-3 z-10 rounded-full bg-white p-2 shadow-md 
            transition-all duration-300 hover:bg-blue-50 hover:text-blue-600
            ${isRTL ? 'left-3' : 'right-3'}
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
          aria-label={t('addToCart')}
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Product Name */}
        <h3 className={`
          mb-1 font-semibold text-gray-900 transition-colors group-hover:text-blue-600
          ${isRTL ? 'font-arabic' : ''}
        `}>
          {productName}
        </h3>
        
        {/* Category */}
        <p className={`
          mb-2 text-sm text-gray-500
          ${isRTL ? 'font-arabic' : ''}
        `}>
          {productCategory}
        </p>
        
        {/* Price and Details Row */}
        <div className={`
          flex items-center justify-between
          ${isRTL ? 'flex-row-reverse' : 'flex-row'}
        `}>
          {/* Price */}
          <span className="text-lg font-bold text-gray-900">
            {isRTL ? `${formatPrice(product.price)}` : `${formatPrice(product.price)}`}
          </span>
          
          {/* Details Link with Arrow */}
          <span className={`
            text-sm text-blue-600 transition-colors group-hover:text-blue-800
            ${isRTL ? 'font-arabic' : ''}
          `}>
            {isRTL ? `← ${t('details')}` : `${t('details')} →`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;