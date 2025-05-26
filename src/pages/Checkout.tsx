import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Lock, CreditCard, Truck, Package } from "lucide-react";
import { useCart } from "../hooks/useCart";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
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

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-50 p-8 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order #ED{Math.floor(Math.random() * 100000)} has been confirmed.
            </p>
            <div className="space-y-4">
              <p className="text-gray-700">
                You'll receive an email confirmation shortly with your order details and tracking information.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link
            to="/collections"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Information", icon: Package },
    { number: 2, title: "Shipping", icon: Truck },
    { number: 3, title: "Payment", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full mt-6 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP code"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <Lock className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;