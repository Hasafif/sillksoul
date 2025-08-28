import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/CustomFooter";
import Benefits from "../components/benifits";
import { Lock, CreditCard, Truck, Package, AlertCircle } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyProvider";
import HeroSection from "../components/HeroSection";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
//console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  //const [currency] = useCurrency();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {currency,formatPrice,formatPriceFloat} = useCurrency();
  const { language, isRTL } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   useEffect(() => {
         const handleResize = () => {
           setScreenWidth(window.innerWidth);
         };
     
         window.addEventListener('resize', handleResize);
         
         // Cleanup event listener on component unmount
         return () => window.removeEventListener('resize', handleResize);
       }, []);
        // Check screen size on mount and resize
       useEffect(() => {
         const checkScreenSize = () => {
           const width = window.innerWidth;
           setIsMobile(width < 480);
           setIsTablet(width >= 768 && width < 1200);
         };
     
         checkScreenSize();
         window.addEventListener('resize', checkScreenSize);
         return () => window.removeEventListener('resize', checkScreenSize);
       }, []);
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });

  const shipping = getTotalPrice() > 200 ? 0 : 15;
  //const tax = getTotalPrice() * 0.08;
  const total = getTotalPrice() + shipping;

  // Handle Stripe Checkout Session
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    //console.log(currency)
    console.log(items[0].price)
    try {
      console.log(items)
      //console.log(items[1].customSizeData)
      const stripe = await stripePromise;
      console.log(stripe)
      // Create checkout session
      const { data } = await axios.post(`${import.meta.env.VITE_BACKENDURL}/main/create-checkout-session`, {
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: formatPriceFloat(item.price),
          name: item.name_english,
          selectedSize: item.selectedSize,
          customSizeData:item.customSizeData,
          selectedColor: item.selectedColor,
          image:  item.selectedColor.images[0], 
        })),
        customerInfo: {
          email: customerInfo.email,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          phone: customerInfo.phone
        },
        shippingInfo: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country
        },
        shippingCost: formatPriceFloat(shipping),
        
       // taxAmount: tax,
        totalAmount: total,
        currency:currency,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout`
      });
        clearCart();
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
         
      if (result.error) {
        setError(result.error.message);
      }

    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create checkout session';
      setError(errorMessage);
    } finally {
      setLoading(false);
     
    }
  };

  // Form validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return customerInfo.email && customerInfo.firstName && customerInfo.lastName && customerInfo.phone;
      case 2:
        return shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.zipCode;
      default:
        return true;
    }
  };

  // Arabic placeholder translations
  const placeholders = {
    email: isRTL ? "عنوان البريد الإلكتروني" : "Email address",
    firstName: isRTL ? "الاسم الأول" : "First name",
    lastName: isRTL ? "اسم العائلة" : "Last name",
    phone: isRTL ? "رقم الهاتف" : "Phone number",
    address: isRTL ? "عنوان الشارع" : "Street address",
    city: isRTL ? "المدينة" : "City",
    state: isRTL ? "الولاية" : "State",
    zipCode: isRTL ? "الرمز البريدي" : "ZIP code",
  };

  const fontClass = isRTL ? "font-arabic" : "font-english";

  if (orderPlaced) {
    return (
      <div className={`min-h-screen bg-white ${fontClass} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-50 p-8 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${fontClass}`}>{t('OrderConfirmed')}</h1>
            <p className={`text-lg text-gray-600 mb-4 ${fontClass}`}>
              {t('OrderConfirmedThank')}
            </p>
            {orderId && (
              <p className={`text-sm text-gray-500 mb-8 ${fontClass}`}>
                {'Order Number'}: {orderId}
              </p>
            )}
            <div className="space-y-4">
              <p className={`text-gray-700 ${fontClass}`}>
                {t('OrderEmail')}
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/"
                  className={`btn2 btn2--primary px-6 py-3 text-white hover:bg-gray-600 transition-colors ${fontClass}`}
                >
                  {t('ContinueShopping')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />

      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen bg-white ${fontClass} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
              <HeroSection
              onMenuToggle={() => setIsMenuOpen(true)}
              onSearchToggle={() => setIsSearchOpen(true)}
            />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${fontClass}`}>{t('cartempty')}</h1>
          <Link
            to="/"
            className={`btn2 btn2--primary inline-flex items-center px-6 py-3 text-white hover:bg-gray-600 transition-colors ${fontClass}`}
          >
            {t('ContinueShopping')}
          </Link>
        </div>
        <Footer />
                        <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    );
  }

  const steps = [
    { number: 1, title: isRTL ? "المعلومات" : "Information", icon: Package },
    { number: 2, title: isRTL ? "الشحن" : "Shipping", icon: Truck },
    { number: 3, title: isRTL ? "الدفع" : "Payment", icon: CreditCard },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${fontClass} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
    {/* Progress Indicator */}
<div className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-4 py-6 mt-6">
    <div className={`flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Item - Mobile: Column, Desktop: Row */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= step.number ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            {!isMobile && (<span className={`text-center sm:text-left mt-2 sm:mt-0 ${isRTL ? 'sm:mr-2' : 'sm:ml-2'} text-xsm font-medium ${fontClass} ${
              currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step.title}
            </span>)}
          </div>
          {/* Progress Line */}
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5  ${isRTL ? 'mr-4' : 'ml-4'} ${
              currentStep > step.number ? 'bg-gray-900' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${fontClass}`}>
                  {isRTL ? "معلومات الاتصال" : "Contact Information"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder={placeholders.email}
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={placeholders.firstName}
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    />
                    <input
                      type="text"
                      placeholder={placeholders.lastName}
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder={placeholders.phone}
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                  />
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!validateStep(1)}
                  className={`btn2 btn2--primary w-full mt-6 text-white py-3 px-6 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${fontClass}`}
                >
                  {t('ContinuetoShipping')}
                </button>
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${fontClass}`}>{t('ShippingAddress')}</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={placeholders.address}
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={placeholders.city}
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    />
                    <input
                      type="text"
                      placeholder={placeholders.state}
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={placeholders.zipCode}
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                  />
                </div>
                <div className={`flex mt-6 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors ${fontClass}`}
                  >
                    {t('Back')}
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!validateStep(2)}
                    className={`btn2 btn2--primary flex-1 text-white py-3 px-6 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${fontClass}`}
                  >
                    {t('ContinuetoPayment')}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <Lock className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <h2 className={`text-xl font-semibold text-gray-900 ${fontClass}`}>{t('PaymentInformation')}</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Lock className={`w-4 h-4 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className={`text-sm font-medium text-blue-900 ${fontClass}`}>
                        {'Secure Checkout'}
                      </span>
                    </div>
                    <p className={`text-sm text-blue-700 ${fontClass}`}>
                      {'You will be redirected to Stripe\'s secure payment page to complete your purchase.'}
                    </p>
                  </div>

                  {error && (
                    <div className={`flex items-center p-4 bg-red-50 border border-red-200 rounded-lg ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className={`text-sm text-red-700 ${fontClass}`}>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Lock className="w-4 h-4" />
                      <span className={fontClass}>
                        {'Payment is secured by Stripe'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      <span className={fontClass}>
                        {'We accept all major credit cards'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full btn2 btn2--primary text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${fontClass}`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{'Processing...'}</span>
                      </div>
                    ) : (
                      `${'Proceed to Payment'} ${formatPrice(total)}`
                    )}
                  </button>
                </div>

                <div className={`flex mt-6 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors ${fontClass}`}
                  >
                    {t('Back')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className={`text-xl font-semibold text-gray-900 mb-6 ${fontClass}`}>{t('OrderSummary')}</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <img
                  src={item.selectedColor?.images?.[0] || item.image}
                    className="w-16 h-16 object-cover rounded-md"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-gray-900 ${fontClass}`}>{isRTL ? item.name_arabic : item.name_english}</h4>
                    <p className={`text-sm text-gray-600 ${fontClass}`}>{t('Qty')} {item.quantity}</p>
                    {item.selectedSize && (
                      <p className={`text-sm text-gray-600 ${fontClass}`}>{t('Size')} {item.selectedSize}</p>
                    )}
                       {item.selectedColor && (
                      <p className={`text-sm text-gray-600 ${fontClass}`}>{t('cartcolor')} {item.selectedColor.color}</p>
                    )}
                  </div>
                  <span className={`font-medium ${fontClass}`}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Subtotal')}</span>
                <span className={`font-medium ${fontClass}`}>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Shipping')}</span>
                <span className={`font-medium ${fontClass}`}>
                  {shipping === 0 ? (isRTL ? 'مجاني' : 'Free') : `${formatPrice(shipping)}`}
                </span>
              </div>
              {/*<div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Tax')}</span>
                <span className={`font-medium ${fontClass}`}>{formatPrice(tax)}</span>
              </div>*/}
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className={`text-lg font-semibold ${fontClass}`}>{t('Total')}</span>
                  <span className={`text-lg font-semibold ${fontClass}`}>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Benefits />
      <Footer />
        <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Checkout;