import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";



const AboutSection = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const { language, isRTL } = useLanguage();
    return (
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={` ${isRTL ? 'font-arabic' : 'font-english'}`}>
              <h2 className="text-4xl font-bold mb-6">{t("aboutTitle")}</h2>
              <p className="text-lg mb-6">
               {t("aboutDescription1")}
              </p>
              
              <p className="text-lg mb-8">
             {t("aboutDescription2")}
              </p>
              <div className="flex flex-row gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-2">500+</h3>
                  <p className="">{t("aboutterm1")}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">10K+</h3>
                  <p className="">{t("aboutterm2")}</p>
                </div>
              </div>
            </div>
            <div className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
               src="/Horizonal.jpg"

//data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="1.9428571428571428" data-sizes="auto" alt="" style={{objectPosition:"41% 52% "}} 
//data-src="//us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w" 
//sizes="899px"
//srcSet="//eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_180x.jpg?v=1747314292 180w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_360x.jpg?v=1747314292 360w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_540x.jpg?v=1747314292 540w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_720x.jpg?v=1747314292 720w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_900x.jpg?v=1747314292 900w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1080x.jpg?v=1747314292 1080w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1296x.jpg?v=1747314292 1296w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1512x.jpg?v=1747314292 1512w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_1728x.jpg?v=1747314292 1728w, //us.eliesaab.com/cdn/shop/files/ES_PF25_MB_2720x1400_US1_2048x.jpg?v=1747314292 2048w"
                //alt="Fashion Atelier"
                className="columns__item--img w-full h-96 object-cover rounded-lg shadow-xl"
             loading="lazy"
             draggable={false}
             onContextMenu={(e) => e.preventDefault()}
             />
            </div>
          </div>
         <div className={`items-center mt-10 ${isRTL ? 'font-arabic' : 'font-english'}`}>

            <h2 className="text-4xl font-bold mb-6">{t("principles")}</h2>
                <p className="text-lg mb-6">
               {t("principle1")}
              </p>
              <p className="text-lg mb-6">
             {t("principle2")}
              </p>
                <p className="text-lg mb-6">
             {t("principle3")}
              </p>
                <p className="text-lg mb-8">
             {t("principle4")}
              </p>
                <p className="text-lg mb-8">
             {t("conclusion")}
              </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;