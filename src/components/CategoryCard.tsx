import { useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "../types/product";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  
  const categoryName = language === 'en' ? category.name_english : category.name_arabic;

  return (
    <Link
      to={`/category/${category.id}`}
      className={`
        block relative overflow-hidden rounded-lg shadow-md transition-all duration-300 
        ${isHovered ? 'shadow-xl transform scale-105' : ''}
        ${isRTL ? 'rtl' : 'ltr'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={isHovered ? category.hoverImage : category.image}
          alt={categoryName}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className={`
        p-4 bg-white
        ${isRTL ? 'text-right' : 'text-left'}
      `}>
        <h3 className={`
          text-lg font-semibold text-gray-800 mb-2 truncate
          ${isRTL ? 'font-arabic' : 'font-english'}
        `}>
          {categoryName}
        </h3>
        
        <div className={`
          inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200
          ${isRTL ? 'flex-row-reverse' : 'flex-row'}
        `}>
          <span className={`text-sm font-medium  ${isRTL ? 'font-arabic' : 'font-english'}`}>
            {t("details")}
          </span>
          {/* Arrow icon with RTL support */}
          <svg
            className={`
              w-4 h-4 transition-transform duration-200
              ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}
              ${isHovered ? (isRTL ? 'translate-x-1' : '-translate-x-1') : ''}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;