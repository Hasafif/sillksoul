import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/CustomFooter";
import Benefits from "../components/benifits";
import { Lock, CreditCard, Truck, Package } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const {t} = useTranslation()
  const {language, isRTL} = useLanguage()
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

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const shipping = getTotalPrice() > 200 ? 0 : 15;
  const tax = getTotalPrice() * 0.08;
  const total = getTotalPrice() + shipping + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
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
    cardNumber: isRTL ? "رقم البطاقة" : "Card number",
    cardholderName: isRTL ? "اسم حامل البطاقة" : "Cardholder name",
    expiryDate: isRTL ? "الشهر/السنة" : "MM/YY",
    cvv: isRTL ? "رمز الأمان" : "CVV"
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
            <p className={`text-lg text-gray-600 mb-8 ${fontClass}`}>
              {t('OrderConfirmedThank')}
            </p>
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
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${fontClass}`}>{t('cartempty')}</h1>
          <Link
            to="/collections"
            className={`btn2 btn2--primary inline-flex items-center px-6 py-3 text-white hover:bg-gray-600 transition-colors ${fontClass}`}
          >
           {t('ContinueShopping')}
          </Link>
        </div>
        <Footer />
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm font-medium ${fontClass} ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${isRTL ? 'mr-4' : 'ml-4'} ${
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
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={placeholders.firstName}
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                    <input
                      type="text"
                      placeholder={placeholders.lastName}
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder={placeholders.phone}
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`btn2 btn2--primary w-full mt-6 text-white py-3 px-6 hover:bg-gray-600 transition-colors ${fontClass}`}
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
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={placeholders.city}
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                    <input
                      type="text"
                      placeholder={placeholders.state}
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={placeholders.zipCode}
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
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
                    className={`btn2 btn2--primary flex-1 text-white py-3 px-6 hover:bg-gray-600 transition-colors ${fontClass}`}
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
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={placeholders.cardNumber}
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                  <input
                    type="text"
                    placeholder={placeholders.cardholderName}
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={placeholders.expiryDate}
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                    <input
                      type="text"
                      placeholder={placeholders.cvv}
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
                <div className={`flex mt-6 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors ${fontClass}`}
                  >
                    {t('Back')}
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className={`btn2 btn2--primary flex-1 text-white py-3 px-6 hover:bg-gray-600 transition-colors ${fontClass}`}
                  >
                   {t("PlaceOrder")}
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
                    src={item.image}
                  //  alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-gray-900 ${fontClass}`}>{isRTL?item.name_arabic:item.name_english}</h4>
                    <p className={`text-sm text-gray-600 ${fontClass}`}>{t('Qty')} {item.quantity}</p>
                    {item.selectedSize && (
                      <p className={`text-sm text-gray-600 ${fontClass}`}>{t('Size')} {item.selectedSize}</p>
                    )}
                  </div>
                  <span className={`font-medium ${fontClass}`}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Subtotal')}</span>
                <span className={`font-medium ${fontClass}`}>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Shipping')}</span>
                <span className={`font-medium ${fontClass}`}>
                  {shipping === 0 ? (isRTL ? 'مجاني' : 'Free') : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-600 ${fontClass}`}>{t('Tax')}</span>
                <span className={`font-medium ${fontClass}`}>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className={`text-lg font-semibold ${fontClass}`}>{t('Total')}</span>
                  <span className={`text-lg font-semibold ${fontClass}`}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Benefits/>
      <Footer />
    </div>
  );
};

export default Checkout;