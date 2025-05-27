import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";


const AboutSection = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
    return (
      <section className="py-20 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t("aboutTitle")}</h2>
              <p className="text-lg text-gray-300 mb-6">
               {t("aboutDescription1")}
              </p>
              <p className="text-lg text-gray-300 mb-8">
             {t("aboutDescription2")}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
                  <p className="text-gray-400">{t("aboutterm1")}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
                  <p className="text-gray-400">{t("aboutterm2")}</p>
                </div>
              </div>
            </div>
            <div className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? "/p53.jpeg":"/p83.jpeg"}
                alt="Fashion Atelier"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;