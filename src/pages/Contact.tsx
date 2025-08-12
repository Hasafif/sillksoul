import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import Benefits from "../components/benifits";


const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderInquiry: false
  });

  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      orderInquiry: false
    });
    
    // Show success message (you can implement toast notification here)
    alert(t('contactFormSuccess'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      
      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} sm:text-center`}>
            <h2 className={`
              text-4xl font-bold text-gray-900 mb-4
              ${isRTL ? 'font-arabic' : 'font-english'}
            `}>
              {t('contactTitle')}
            </h2>
            {/*<p className={`
              text-lg text-gray-600 max-w-2xl mx-auto
              ${isRTL ? 'font-arabic leading-relaxed' : 'font-english leading-relaxed'}
            `}>
              {t('contactSubtitle')}
            </p>*/}
          </div>

          <div className={`
            grid grid-cols-1 lg:grid-cols-2 gap-12
            ${isRTL ? 'lg:grid-flow-col-dense' : ''}
          `}>
            {/* Contact Form */}
            <div className={`
              bg-white p-8 rounded-lg shadow-lg
              ${isRTL ? 'lg:order-2' : 'lg:order-1'}
            `}>
              <h3 className={`
                text-2xl font-bold text-gray-900 mb-6
                ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
              `}>
                {t('contactFormTitle')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label 
                    htmlFor="fullName" 
                    className={`
                      block text-sm font-medium text-gray-700 mb-2
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                  >
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder={t('fullNamePlaceholder')}
                    className={`
                      w-full px-4 py-3 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="email" 
                    className={`
                      block text-sm font-medium text-gray-700 mb-2
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                  >
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('emailPlaceholder')}
                    className={`
                      w-full px-4 py-3 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isRTL ? 'text-right' : 'text-left'}
                    `}
                    dir="ltr" // Email should always be LTR
                  />
                </div>

                {/* Phone */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className={`
                      block text-sm font-medium text-gray-700 mb-2
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                  >
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('phonePlaceholder')}
                    className={`
                      w-full px-4 py-3 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isRTL ? 'text-right' : 'text-left'}
                    `}
                    dir="ltr" // Phone numbers should be LTR
                  />
                </div>

                {/* Subject */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className={`
                      block text-sm font-medium text-gray-700 mb-2
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                  >
                    {t('subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('selectSubject')}</option>
                    <option value="general">{t('generalInquiry')}</option>
                    <option value="order">{t('orderSupport')}</option>
                    <option value="return">{t('returnsExchanges')}</option>
                    <option value="custom">{t('customDesignRequest')}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message" 
                    className={`
                      block text-sm font-medium text-gray-700 mb-2
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                  >
                    {t('message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder={t('messagePlaceholder')}
                    className={`
                      w-full px-4 py-3 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                    `}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Checkbox */}
                <div className={`
                  flex items-center
                  ${isRTL ? 'flex-row-reverse' : 'flex-row'}
                `}>
                  <input
                    type="checkbox"
                    id="orderInquiry"
                    name="orderInquiry"
                    checked={formData.orderInquiry}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label 
                    htmlFor="orderInquiry" 
                    className={`
                      text-sm text-gray-700
                      ${isRTL ? 'mr-2 font-arabic' : 'ml-2 font-english'}
                    `}
                  >
                    {t('existingOrderInquiry')}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`
                    btn2 btn2--primary w-full text-white py-3 px-6 
                    hover:bg-gray-600 transition-colors font-medium
                    ${isRTL ? 'font-arabic' : 'font-english'}
                  `}
                >
                  {t('sendMessage')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={`
              space-y-8
              ${isRTL ? 'lg:order-1' : 'lg:order-2'}
            `}>
              <div>
                <h3 className={`
                  text-2xl font-bold text-gray-900 mb-6
                  ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}
                `}>
                  {t('contactInformation')}
                </h3>
                
                <div className="space-y-10">
                  {/* Address */}
                  <div className={`
                    flex items-start gap-4
                    ${isRTL ? 'flex-row text-right' : 'flex-row text-left'}
                  `}>
                    <MapPin className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`
                        font-semibold text-gray-900
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('visitStore')}
                      </h4>
                      <p className={`
                        text-gray-600
                        ${isRTL ? 'font-arabic leading-relaxed' : 'font-english'}
                      `}>
                        {t('storeAddress')}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={`
                    flex items-start gap-4
                    ${isRTL ? 'flex-row text-right' : 'flex-row text-left'}
                  `}>
                    <Phone className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`
                        font-semibold text-gray-900
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('callUs')}
                      </h4>
                      <p className="text-gray-600" dir="ltr">
                        {t('phoneNumber')}
                      </p>
                      <p className={`
                        text-sm text-gray-500
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('phoneHours')}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`
                    flex items-start gap-4
                    ${isRTL ? 'flex-row text-right' : 'flex-row text-left'}
                  `}>
                    <Mail className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`
                        font-semibold text-gray-900
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('emailUs')}
                      </h4>
                      <p className="text-gray-600" dir="ltr">
                        {t('emailAddress')}
                      </p>
                      <p className={`
                        text-sm text-gray-500
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('emailResponse')}
                      </p>
                    </div>
                  </div>

                  {/* Store Hours */}
                  <div className={`
                    flex items-start gap-4
                    ${isRTL ? 'flex-row text-right' : 'flex-row text-left'}
                  `}>
                    <Clock className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`
                        font-semibold text-gray-900
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        {t('storeHours')}
                      </h4>
                      <div className={`
                        text-gray-600 text-sm space-y-1
                        ${isRTL ? 'font-arabic' : 'font-english'}
                      `}>
                        <p>{t('alwaysworks')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Benefits/>
      <Footer />

      {/* Side Panels */}
      <SidePanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Contact;