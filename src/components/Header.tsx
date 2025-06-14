
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";



const Header = () => {
  const { t } = useTranslation();
    const { language, isRTL } = useLanguage();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-center">
          {<Link 
            to="/exclusive" 
            className={`relative text-md text-gray-700 hover:text-gray-900 transition-colors group  
              ${isRTL ? 'font-arabic' : 'font-english'}`}
        // style={{color:"#2d2d2d"}}
         >
            {t('welcomeTitle')}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 group-hover:bg-gray-900"></span>
          </Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;