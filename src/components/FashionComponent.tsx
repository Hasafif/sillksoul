import { useLanguage } from '../contexts/LanguageContext';


const FashionColumnComponent = () => {
  const { language, isRTL } = useLanguage();
  return (
    <div className={`max-w-6xl mx-auto p-6 ${isRTL ? 'font-arabic' : 'font-english'}`}>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <a 
              href="/collections/summer-capsule" 
              className="block relative"
            >
              <img 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop&crop=center"
                alt="Summer Fashion Collection - Flowing fabrics and sunset colors"
                style={{ 
                  objectPosition: '41% 52%',
                  aspectRatio: '1.94'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-widest">
              ready-to-wear
            </h4>
            <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
              summer escapade
            </h3>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            With sunset colours, flowing kaftans, and sparkling crochet co-ords, the collection captures breezy chic and bohemian elegance, creating a radiant celebration of carefree spirit, effortless style, and summer escape.
          </p>
          
          <div className="pt-4">
            <a 
              className="inline-flex items-center px-8 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105" 
              href="/collections/summer-capsule"
            >
              <span>shop now</span>
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionColumnComponent;