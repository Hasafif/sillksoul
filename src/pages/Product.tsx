import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import Benefits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { ShoppingCart, Heart, Share2, Truck, RotateCcw } from "lucide-react";
import { products } from "../data/product";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyProvider";
import { toast } from "../hooks/use-toast";

const Product = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, isRTL } = useLanguage();
  const { addToCart } = useCart();
   const { formatPrice } = useCurrency();
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Product Not Found' : 'المنتج غير موجود'}
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            {language === 'en' ? 'Return to Home' : 'العودة إلى الصفحة الرئيسية'}
          </Link>
        </div>
      </div>
    );
  }

  // Get language-specific product data
  const productName = language === 'en' ? product.name_english : product.name_arabic;
  const productCategory = language === 'en' ? product.category_english : product.category_arabic;
  const productDescription = language === 'en' ? product.description_english : product.description_arabic;

  const productImages = [product.image, product.hoverImage];

  const handleAddToCart = () => {

   // setSelectedColor(product.colors[0])
     // console.log(selectedColor)
    if (product.sizes.length > 0 && !selectedSize) {
      toast({title:language === 'en' ? "Size" : "المقاس",description:language === 'en' ? "Please select a size" : "يرجى اختيار المقاس"})
      return;
    }
      
    if (product.colors.length > 0 && !selectedColor) {
      toast({title:language === 'en' ? "Color" : "اللون",description:language === 'en' ? "Please select a color" : "يرجى اختيار اللون"})
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const relatedProducts = products.filter(p => 
    (language === 'en' ? p.category_english : p.category_arabic) === productCategory && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/*<Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />*/}
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">
            {language === 'en' ? 'Home' : 'الصفحة الرئيسية'}
          </Link>
          <span className={`${isRTL ? 'mx-2' : 'mx-2'}`}>/</span>
          <Link to="/category/1" className="hover:text-gray-900">
            {language === 'en' ? 'Ready-to-Wear' : 'ملابس جاهزة'}
          </Link>
          <span className={`${isRTL ? 'mx-2' : 'mx-2'}`}>/</span>
          <span className="text-gray-900">{productName}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className={`space-y-4 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src={productImages[currentImageIndex]}
                alt={productName}
                className="w-full h-full object-cover"
                draggable={false}
             onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productName} ${index + 1}`}
                    className="w-full h-full object-cover"
                                 draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className={`space-y-6 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">{productCategory}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{productName}</h1>
              <div className={`flex items-center mt-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(product.rating) ? 'text-gray-600' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={`text-sm text-gray-600 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                  ({product.reviews} {language === 'en' ? 'reviews' : 'مراجعة'})
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</div>

            <p className="text-gray-700">{productDescription}</p>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {language === 'en' ? 'Size' : 'المقاس'}
                </h3>
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {language === 'en' ? 'Color' : 'اللون'}
                </h3>
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      //onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${
                       // selectedColor === color
                          //? 
                          'border-gray-900 bg-gray-900 text-white'
                         // : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {language === 'en' ? 'Quantity' : 'الكمية'}
              </h3>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 justify-end' : 'space-x-3 justify-start'}`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`btn2 btn2--primary ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} flex items-center justify-center w-full text-white py-3 px-6 hover:bg-gray-600`}
          
             >
                <ShoppingCart className="w-5 h-5" />
                <span>{language === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}</span>
              </button>
              
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <button className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Heart className="w-5 h-5" />
                  <span>{language === 'en' ? 'Add to Wishlist' : 'أضف إلى المفضلة'}</span>
                </button>
                <button className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Share2 className="w-5 h-5" />
                  <span>{language === 'en' ? 'Share' : 'مشاركة'}</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 justify-end' : 'space-x-3 justify-start'}`}>
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {language === 'en' 
                    ? 'Free shipping on orders over $200' 
                    : 'شحن مجاني للطلبات التي تزيد عن 200 دولار'
                  }
                </span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3 justify-end' : 'space-x-3 justify-start'}`}>
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {language === 'en' 
                    ? '30-day return policy' 
                    : 'سياسة الإرجاع لمدة 30 يومًا'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className={`text-2xl font-bold text-gray-900 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' ? 'You May Also Like' : 'قد يعجبك أيضًا'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedProductName = language === 'en' 
                  ? relatedProduct.name_english 
                  : relatedProduct.name_arabic;
                
                return (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProductName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className={`font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {relatedProductName}
                    </h3>
                    <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
       <Benefits/>
      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Product;