import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

const LanguageSwitcher = ({ variant = 'dropdown', className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Globe className="w-4 h-4 text-gray-600" />
        <div className="flex space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as 'en' | 'ar')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                language === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
        className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default LanguageSwitcher;
