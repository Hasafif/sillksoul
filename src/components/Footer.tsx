import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className={`bg-gray-900 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('exclusiveDesigns')}</h3>
            <p className="text-gray-400 mb-4">
              {t('aboutDescription')}
            </p>
            <div className="space-y-2">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Fashion Avenue, NYC</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Phone className="w-4 h-4" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@exclusivedesigns.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('aboutUs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('sizeGuide')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('careInstructions')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('faq')}</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">{t('policies')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('shippingPolicy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('returnPolicy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('termsOfService')}</a></li>
            </ul>
          </div>

          {/* Newsletter & Language */}
          <div>
            <h4 className="font-semibold mb-4">{t('stayUpdated')}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('enterEmail')}
                  className={`flex-1 px-3 py-2 bg-gray-800 border border-gray-700 ${isRTL ? 'rounded-r-md' : 'rounded-l-md'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 ${isRTL ? 'rounded-l-md' : 'rounded-r-md'} transition-colors`}
                >
                  {t('subscribe')}
                </button>
              </div>
            </form>

            {/* Language Switcher */}
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            
            {/* Social Media */}
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 {t('exclusiveDesigns')}. {t('allRightsReserved')}
            </p>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <span className="text-gray-400 text-sm">{t('weAccept')}</span>
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
