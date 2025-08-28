import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "../types/product";
import CategoryCard from "./CategoryCard";

interface CategoryCarouselProps {
  categories: Category[];
}


const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Product Container */}
      <div className="overflow-hidden mx-12">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {categories.map((category) => (
            <div key={category.id} className="w-1/4 flex-shrink-0 px-2">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
