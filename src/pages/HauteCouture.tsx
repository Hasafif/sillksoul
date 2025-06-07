import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Palette, Ruler, Shirt } from "lucide-react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/CustomFooter";
import Benefits from "../components/benifits";
import SidePanel from "../components/SidePanel";
import SearchPanel from "../components/SearchPanel";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";

const HauteCoture = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    productType: "",
    productSize: "",
    productColor: "",
    designDescription: "",
    budget: "",
    timeline: "",
    inspiration: ""
  });

  // Translated product types
  const productTypes = [
    { key: "dress", label: t("productTypesdress") },
    { key: "tshirt", label: t("productTypestshirt") },
    { key: "pants", label: t("productTypespants") },
    { key: "jacket", label: t("productTypesjacket") },
    { key: "skirt", label: t("productTypesskirt") },
    { key: "blouse", label: t("productTypesblouse") },
    { key: "hoodie", label: t("productTypeshoodie") },
    { key: "shorts", label: t("productTypesshorts") },
    { key: "jeans", label: t("productTypesjeans") },
    { key: "sweater", label: t("productTypessweater") },
    { key: "other", label: t("productTypesother") }
  ];

  // Translated product sizes
  const productSizes = [
    { key: "xs", label: t("productSizesxs") },
    { key: "s", label: t("productSizess") },
    { key: "m", label: t("productSizesm") },
    { key: "l", label: t("productSizesl") },
    { key: "xl", label: t("productSizesxl") },
    { key: "xxl", label: t("productSizesxxl") },
    { key: "custom", label: t("productSizescustom") }
  ];

  // Translated product colors
  const productColors = [
    { key: "black", label: t("productColorsblack") },
    { key: "white", label: t("productColorswhite") },
    { key: "navyBlue", label: t("productColorsnavyBlue") },
    { key: "royalBlue", label: t("productColorsroyalBlue") },
    { key: "red", label: t("productColorsred") },
    { key: "burgundy", label: t("productColorsburgundy") },
    { key: "forestGreen", label: t("productColorsforestGreen") },
    { key: "emeraldGreen", label: t("productColorsemeraldGreen") },
    { key: "purple", label: t("productColorspurple") },
    { key: "pink", label: t("productColorspink") },
    { key: "gray", label: t("productColorsgray") },
    { key: "brown", label: t("productColorsbrown") },
    { key: "beige", label: t("productColorsbeige") },
    { key: "yellow", label: t("productColorsyellow") },
    { key: "orange", label: t("productColorsorange") },
    { key: "multiColor", label: t("productColorsmultiColor") },
    { key: "customColor", label: t("productColorscustomColor") }
  ];

  // Translated budget options
  const budgetOptions = [
    { key: "under-100", label: t("budgetunder100") },
    { key: "100-250", label: t("budgetrange100to250") },
    { key: "250-500", label: t("budgetrange250to500") },
    { key: "500-1000", label: t("budgetrange500to1000") },
    { key: "over-1000", label: t("budgetover1000") }
  ];

  // Translated timeline options
  const timelineOptions = [
    { key: "rush", label: t("timelinerush") },
    { key: "standard", label: t("timelinestandard") },
    { key: "flexible", label: t("timelineflexible") }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Custom design request submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      productType: "",
      productSize: "",
      productColor: "",
      designDescription: "",
      budget: "",
      timeline: "",
      inspiration: ""
    });
    alert(t("formsuccessMessage"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <HeroSection 
        onMenuToggle={() => setIsMenuOpen(true)}
        onSearchToggle={() => setIsSearchOpen(true)}
      />
      


      <section className={`py-16 px-4 md:px-8 ${isRTL ? 'text-right font-arabic' : 'text-left font-english'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("customDesigntitle")}
            </h2>
            {/*<p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("customDesignsubtitle")}
            </p>*/}
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Custom Design Form */}
            <div className={`bg-white p-8 rounded-xl shadow-xl ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className={`flex items-center mb-6`}>
                <Shirt className={`w-8 h-8 text-gray-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("formtitle")}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {t("formcontactInfo")}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formfullName")} *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'}`}
                        placeholder={t("formfullNamePlaceholder")}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formemail")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'}`}
                        placeholder={t("formemailPlaceholder")}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="phone" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("formphone")} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'}`}
                      placeholder={t("formphonePlaceholder")}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Product Specifications */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {t("formproductSpecs")}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="productType" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formproductType")} *
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-8' : 'text-left pl-4 pr-8'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <option value="">{t("formselectProduct")}</option>
                        {productTypes.map(type => (
                          <option key={type.key} value={type.key}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="productSize" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formsize")} *
                      </label>
                      <select
                        id="productSize"
                        name="productSize"
                        value={formData.productSize}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-8' : 'text-left pl-4 pr-8'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <option value="">{t("formselectSize")}</option>
                        {productSizes.map(size => (
                          <option key={size.key} value={size.key}>{size.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="productColor" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formcolor")} *
                      </label>
                      <select
                        id="productColor"
                        name="productColor"
                        value={formData.productColor}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-8' : 'text-left pl-4 pr-8'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <option value="">{t("formselectColor")}</option>
                        {productColors.map(color => (
                          <option key={color.key} value={color.key}>{color.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Design Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {t("formdesignDetails")}
                  </h4>
                  
                  <div>
                    <label htmlFor="designDescription" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("formdesignDescription")} *
                    </label>
                    <textarea
                      id="designDescription"
                      name="designDescription"
                      value={formData.designDescription}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder={t("formdesignDescriptionPlaceholder")}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-vertical ${isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formbudgetRange")}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-8' : 'text-left pl-4 pr-8'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <option value="">{t("formselectBudget")}</option>
                        {budgetOptions.map(budget => (
                          <option key={budget.key} value={budget.key}>{budget.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("formtimeline")}
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${isRTL ? 'text-right pr-4 pl-8' : 'text-left pl-4 pr-8'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <option value="">{t("formselectTimeline")}</option>
                        {timelineOptions.map(timeline => (
                          <option key={timeline.key} value={timeline.key}>{timeline.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inspiration" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("forminspiration")}
                    </label>
                    <textarea
                      id="inspiration"
                      name="inspiration"
                      value={formData.inspiration}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t("forminspirationPlaceholder")}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-vertical ${isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn2 btn2--primary text-white py-3 px-6 w-full hover:bg-gray-600  
                    font-medium"
                   // style={{background:"#2d2d2d"}}
                >
                  {t("formsubmitButton")}
                </button>
              </form>
            </div>

            {/* Information Panel */}
            <div className={`space-y-8 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="bg-white p-8 rounded-xl shadow-xl">
                <div className={`flex items-center mb-6`}>
                  <Ruler className={`w-8 h-8 text-gray-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("howItWorkstitle")}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {isRTL ? '١' : '1'}
                    </div>
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("howItWorksstep1title")}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t("howItWorksstep1description")}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {isRTL ? '٢' : '2'}
                    </div>
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("howItWorksstep2title")}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t("howItWorksstep2description")}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {isRTL ? '٣' : '3'}
                    </div>
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("howItWorksstep3title")}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t("howItWorksstep3description")}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {isRTL ? '٤' : '4'}
                    </div>
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("howItWorksstep4title")}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t("howItWorksstep4description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("Contacttitle")}
                </h3>
                <div className="space-y-6">
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <Phone className="w-6 h-6 text-gray-600 mt-1 shrink-0" />
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("Contactphonetitle")}
                      </h4>
                      <p className="text-gray-600" dir="ltr">{t("Contactphonenumber")}</p>
                      <p className="text-sm text-gray-500">
                        {t("Contactphonehours")}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <Mail className="w-6 h-6 text-gray-600 mt-1 shrink-0" />
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("Contactemailtitle")}
                      </h4>
                      <p className="text-gray-600" dir="ltr">{t("Contactemailaddress")}</p>
                      <p className="text-sm text-gray-500">
                        {t("Contactemailresponse")}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <Clock className="w-6 h-6 text-gray-600 mt-1 shrink-0" />
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-semibold text-gray-900">
                        {t("Contacthourstitle")}
                      </h4>
                      <div className="text-gray-600 text-sm">
                        <p>{t("Contacthoursweekdays")}</p>
                        <p>{t("Contacthourssaturday")}</p>
                        <p>{t("Contacthourssunday")}</p>
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

export default HauteCoture;