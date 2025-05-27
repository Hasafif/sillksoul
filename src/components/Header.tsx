
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";




const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-center">
          {<Link 
            to="/exclusive" 
            className="relative text-md text-red-600 hover:text-red-700 transition-colors group"
         style={{color:"#aa1c1c1"}}
         >
            {t('welcomeTitle')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:bg-red-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;