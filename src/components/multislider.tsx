
import { useState } from "react";
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for demonstration
const mockProduct = {
  id: "1",
  name_english: "Elegant Chiffon Skirt",
  name_arabic: "تنورة شيفون أنيقة",
  category_english: "Ready-to-Wear",
  category_arabic: "ملابس جاهزة",
  description_english: "Flowing and refined chiffon long skirt",
  description_arabic: "تنورة شيفون طويلة أنيقة ومتدفقة",
  price: 450,
  colors: ["Marchesa Orange", "Navy Blue", "Black"],
  sizes: ["XS", "S", "M", "L", "XL"],
  sizes2: ["XS", "S", "M", "L", "XL"],
  available: [true, true, false, true, true],
  image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=600&fit=crop",
  hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop"
  ]
};

const MultiSlider = ({ images, currentIndex, onIndexChange }) => {
  const nextImage = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onIndexChange(newIndex);
  };

  const nextVertical = () => {
    nextImage();
  };

  const prevVertical = () => {
    prevImage();
  };

  return (
    <div className="flex flex-row gap-20">
      {/* Vertical Thumbnail Slider */}
      <div className="relative flex flex-col w-20 top-5">
        {/* Thumbnails Container */}
        <div className="relative flex flex-col gap-2">
          {/* Vertical Slider Up Button */}
          <button
            onClick={prevVertical}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 mb-5 cursor-pointer"
            style={{color:"#100f0d"}}
          >
            {/*<ChevronLeft className="w-4 h-4 text-gray-800 transform rotate-90" />*/}
           <svg version="1.2" style={{width:"18px",height:"18px",color:"#d5d5d4"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 94" width="163" height="94"><path fill="#d1d1d0" d="m81.8-0.1l81.3 81.4-12.5 12.4-68.8-68.7-68.7 68.7-12.7-12.4z"></path></svg>
          </button>

          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`relative w-20 h-132 rounded-lg overflow-hidden transition-all duration-300 ${
                currentIndex === index 
                  ? 'ring-1 ring-gray-400 ring-offset-2 scale-105' 
                  : 'ring-1 ring-gray-200 hover:ring-gray-400'
              }`
            }
             /* style={{
    '--color-body': '#d1d1d0',
    '--bg-body': '#fff',
    position: 'relative',
    ...((currentIndex===index) && {
      boxShadow: 'inset 0 0 0 1px var(--color-body), inset 0 0 0 1px var(--bg-body)'
    })
  } as React.CSSProperties}*/
            >
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </button>
          ))}

          {/* Vertical Slider Down Button */}
          <button
            onClick={nextVertical}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 mt-5 order-2 cursor-pointer"
          style={{color:"#100f0d"}}
          >
            {/*<ChevronLeft className="w-4 h-4 text-gray-800 transform -rotate-90" />*/}
            <svg style={{width:"18px",height:"18px",color:"#d5d5d4"}} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177 102" width="177" height="102"> <path className="s0" d="m88.1 101.9l-88.2-88.2 13.6-13.4 74.6 74.4 74.5-74.4 13.7 13.4z" fill="#d1d1d0"></path> </svg>
          </button>
        </div>
      </div>

      {/* Main Horizontal Slider */}
      <div className="flex-1 relative">
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
          <img
            src={images[currentIndex]}
            alt="Product main view"
            className="lazyautosizes ls-is-cached lazyloaded w-full h-full object-cover transition-opacity duration-300"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        
        {/* Slider Controls */}
        <button
          onClick={prevImage}
          className="flickity-nav absolute left-4 top-1/2 transform -translate-y-1/2"
        >
             <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" zoomAndPan="magnify" viewBox="0 0 37.5 37.499999" height="50" preserveAspectRatio="xMidYMid meet" version="1.0">
      <defs><filter x="0%" y="0%" width="100%" height="100%" id="ebcfac5386"><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" color-interpolation-filters="sRGB"></feColorMatrix></filter><clipPath id="1dd04e1b17"><path d="M 12 13.085938 L 18.570312 13.085938 L 18.570312 23.996094 L 12 23.996094 Z M 12 13.085938 " clip-rule="nonzero"></path></clipPath><clipPath id="c0018902cb"><path d="M 0.957031 0.957031 L 36.1875 0.957031 L 36.1875 36.1875 L 0.957031 36.1875 Z M 0.957031 0.957031 " clip-rule="nonzero"></path></clipPath><clipPath id="04e320bd81"><path d="M 18.570312 36.1875 C 28.300781 36.1875 36.1875 28.300781 36.1875 18.570312 C 36.1875 8.84375 28.300781 0.957031 18.570312 0.957031 C 8.84375 0.957031 0.957031 8.84375 0.957031 18.570312 C 0.957031 28.300781 8.84375 36.1875 18.570312 36.1875 Z M 18.570312 36.1875 " clip-rule="nonzero"></path></clipPath><clipPath id="39ed93fd61"><path d="M 0.960938 0.960938 L 36.1875 0.960938 L 36.1875 36.1875 L 0.960938 36.1875 Z M 0.960938 0.960938 " clip-rule="nonzero"></path></clipPath><clipPath id="81d8f52703"><path d="M 18.574219 36.1875 C 28.300781 36.1875 36.1875 28.300781 36.1875 18.574219 C 36.1875 8.847656 28.300781 0.960938 18.574219 0.960938 C 8.847656 0.960938 0.960938 8.847656 0.960938 18.574219 C 0.960938 28.300781 8.847656 36.1875 18.574219 36.1875 Z M 18.574219 36.1875 " clip-rule="nonzero"></path></clipPath><mask id="372e8d87dd"><g filter="url(#ebcfac5386)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="cbfe130fb6"><path d="M 0.5 0.761719 L 8.550781 0.761719 L 8.550781 8.578125 L 0.5 8.578125 Z M 0.5 0.761719 " clip-rule="nonzero"></path></clipPath><clipPath id="de42e67675"><rect x="0" width="9" y="0" height="9"></rect></clipPath><mask id="320480fbc9"><g filter="url(#ebcfac5386)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="4843ac9196"><path d="M 0.5 0.605469 L 8.316406 0.605469 L 8.316406 8.65625 L 0.5 8.65625 Z M 0.5 0.605469 " clip-rule="nonzero"></path></clipPath><clipPath id="3f8384c4b6"><rect x="0" width="9" y="0" height="9"></rect></clipPath></defs><g clip-path="url(#1dd04e1b17)"><path fill="#d5d5d4" d="M 17.746094 13.152344 C 17.921875 13.152344 18.089844 13.21875 18.222656 13.351562 C 18.484375 13.613281 18.484375 14.039062 18.222656 14.308594 L 14.019531 18.515625 L 18.289062 22.78125 C 18.550781 23.039062 18.550781 23.46875 18.289062 23.738281 C 18.03125 23.996094 17.601562 23.996094 17.332031 23.738281 L 12.113281 18.507812 L 17.265625 13.351562 C 17.402344 13.21875 17.570312 13.152344 17.746094 13.152344 Z M 17.746094 13.152344 " fill-opacity="1" fill-rule="nonzero"></path></g><g clip-path="url(#c0018902cb)"><g clip-path="url(#04e320bd81)"><path fill="#ffffff" d="M 36.1875 36.1875 L 0.957031 36.1875 L 0.957031 0.957031 L 36.1875 0.957031 Z M 36.1875 36.1875 " fill-opacity="1" fill-rule="nonzero"></path></g></g><g clip-path="url(#39ed93fd61)"><g clip-path="url(#81d8f52703)"><path stroke-linecap="butt" transform="matrix(-0.68189, 0, 0, -0.68189, 36.186039, 36.186039)" fill="none" stroke-linejoin="miter" d="M 25.827963 -0.00214308 C 11.563833 -0.00214308 -0.00214234 11.563832 -0.00214234 25.827962 C -0.00214234 40.092092 11.563833 51.658067 25.827963 51.658067 C 40.092093 51.658067 51.658068 40.092092 51.658068 25.827962 C 51.658068 11.563832 40.092093 -0.00214308 25.827963 -0.00214308 Z M 25.827963 -0.00214308 " stroke="#f0f0f0" stroke-width="2.170825" stroke-opacity="1" stroke-miterlimit="4"></path></g></g><g mask="url(#372e8d87dd)"><g transform="matrix(1, 0, 0, 1, 13, 17)"><g clip-path="url(#de42e67675)"><g clip-path="url(#cbfe130fb6)"><path stroke-linecap="round" transform="matrix(0.482169, 0.482169, -0.482169, 0.482169, 1.70031, 0.857565)" fill="none" stroke-linejoin="miter" d="M 0.997219 0.999483 L 12.258186 0.999483 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g><g mask="url(#320480fbc9)"><g transform="matrix(1, 0, 0, 1, 13, 11)"><g clip-path="url(#3f8384c4b6)"><g clip-path="url(#4843ac9196)"><path stroke-linecap="round" transform="matrix(0.482169, -0.482169, 0.482169, 0.482169, 0.546335, 7.521582)" fill="none" stroke-linejoin="miter" d="M 0.99916 1.003008 L 12.653045 0.998958 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g>
    </svg>
          {/*<ChevronLeft className="w-5 h-5 text-gray-800" />*/}
        </button>
        
        <button
          onClick={nextImage}
          className="flickity-nav absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          {/*<ChevronRight className="w-5 h-5 text-gray-800" />*/}
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50" zoomAndPan="magnify" viewBox="0 0 37.5 37.499999" height="50" preserveAspectRatio="xMidYMid meet" version="1.0">
      <defs><filter x="0%" y="0%" width="100%" height="100%" id="ab2446aa99"><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" color-interpolation-filters="sRGB"></feColorMatrix></filter><clipPath id="238ac2d71c"><path d="M 18.539062 13.101562 L 25.371094 13.101562 L 25.371094 24 L 18.539062 24 Z M 18.539062 13.101562 " clip-rule="nonzero"></path></clipPath><clipPath id="9e3a4f7727"><path d="M 0.886719 0.886719 L 36.191406 0.886719 L 36.191406 36.191406 L 0.886719 36.191406 Z M 0.886719 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="5bf350be17"><path d="M 18.539062 0.886719 C 8.789062 0.886719 0.886719 8.789062 0.886719 18.539062 C 0.886719 28.285156 8.789062 36.191406 18.539062 36.191406 C 28.285156 36.191406 36.191406 28.285156 36.191406 18.539062 C 36.191406 8.789062 28.285156 0.886719 18.539062 0.886719 Z M 18.539062 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="6d043ef67f"><path d="M 0.886719 0.886719 L 36.183594 0.886719 L 36.183594 36.183594 L 0.886719 36.183594 Z M 0.886719 0.886719 " clip-rule="nonzero"></path></clipPath><clipPath id="d19f09e06a"><path d="M 18.535156 0.886719 C 8.785156 0.886719 0.886719 8.785156 0.886719 18.535156 C 0.886719 28.28125 8.785156 36.183594 18.535156 36.183594 C 28.28125 36.183594 36.183594 28.28125 36.183594 18.535156 C 36.183594 8.785156 28.28125 0.886719 18.535156 0.886719 Z M 18.535156 0.886719 " clip-rule="nonzero"></path></clipPath><mask id="64e84d30bf"><g filter="url(#ab2446aa99)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="17fcc7dc81"><path d="M 0.632812 0.367188 L 8.449219 0.367188 L 8.449219 8.421875 L 0.632812 8.421875 Z M 0.632812 0.367188 " clip-rule="nonzero"></path></clipPath><clipPath id="7cef2b6c8b"><rect x="0" width="9" y="0" height="9"></rect></clipPath><mask id="b0cc12bf9b"><g filter="url(#ab2446aa99)"><rect x="-3.75" width="45" fill="#000000" y="-3.75" height="44.999999" fill-opacity="0.43"></rect></g></mask><clipPath id="c230fa3501"><path d="M 0.632812 0.527344 L 8.683594 0.527344 L 8.683594 8.578125 L 0.632812 8.578125 Z M 0.632812 0.527344 " clip-rule="nonzero"></path></clipPath><clipPath id="5a5375a9c8"><rect x="0" width="9" y="0" height="9"></rect></clipPath></defs><g clip-path="url(#238ac2d71c)"><path fill="#d5d5d4" d="M 19.363281 23.96875 C 19.1875 23.96875 19.019531 23.902344 18.886719 23.765625 C 18.625 23.507812 18.625 23.078125 18.886719 22.808594 L 23.101562 18.59375 L 18.816406 14.320312 C 18.558594 14.058594 18.558594 13.628906 18.816406 13.359375 C 19.078125 13.101562 19.507812 13.101562 19.777344 13.359375 L 25.011719 18.601562 L 19.84375 23.765625 C 19.710938 23.902344 19.542969 23.96875 19.363281 23.96875 Z M 19.363281 23.96875 " fill-opacity="1" fill-rule="nonzero"></path></g><g clip-path="url(#9e3a4f7727)"><g clip-path="url(#5bf350be17)"><path fill="#ffffff" d="M 0.886719 0.886719 L 36.191406 0.886719 L 36.191406 36.191406 L 0.886719 36.191406 Z M 0.886719 0.886719 " fill-opacity="1" fill-rule="nonzero"></path></g></g><g clip-path="url(#6d043ef67f)"><g clip-path="url(#d19f09e06a)"><path stroke-linecap="butt" transform="matrix(0.683322, 0, 0, 0.683322, 0.885313, 0.885313)" fill="none" stroke-linejoin="miter" d="M 25.829459 0.00205788 C 11.560934 0.00205788 0.00205715 11.560935 0.00205715 25.829459 C 0.00205715 40.092267 11.560934 51.656861 25.829459 51.656861 C 40.092267 51.656861 51.65686 40.092267 51.65686 25.829459 C 51.65686 11.560935 40.092267 0.00205788 25.829459 0.00205788 Z M 25.829459 0.00205788 " stroke="#f0f0f0" stroke-width="2.166274" stroke-opacity="1" stroke-miterlimit="4"></path></g></g><g mask="url(#64e84d30bf)"><g transform="matrix(1, 0, 0, 1, 15, 11)"><g clip-path="url(#7cef2b6c8b)"><g clip-path="url(#17fcc7dc81)"><path stroke-linecap="round" transform="matrix(-0.483182, -0.483182, 0.483182, -0.483182, 7.416179, 8.252292)" fill="none" stroke-linejoin="miter" d="M 0.998947 1.00265 L 12.260558 1.00265 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g><g mask="url(#b0cc12bf9b)"><g transform="matrix(1, 0, 0, 1, 15, 17)"><g clip-path="url(#5a5375a9c8)"><g clip-path="url(#c230fa3501)"><path stroke-linecap="round" transform="matrix(-0.483182, 0.483182, -0.483182, -0.483182, 8.572579, 1.58688)" fill="none" stroke-linejoin="miter" d="M 0.999797 1.001748 L 12.653503 0.997706 " stroke="#545454" stroke-width="2" stroke-opacity="1" stroke-miterlimit="4"></path></g></g></g></g>
    </svg>
        </button>

          {/* Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
            backgroundColor:"#d1d1d0"
        }}>
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`,
              backgroundColor:"#100f0d",
             // lineHeight:"5"
            }}
          />
        </div>
      </div>
       
    </div>
  );
};
export default MultiSlider;