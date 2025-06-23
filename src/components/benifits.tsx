import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

const Benefits = () => {
  const [email, setEmail] = useState("");
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
<section className={`benefits py-12 ${isRTL ? 'font-arabic' : 'font-english'}`}>
    <div className="wrapper">
        <div className="benefits__inner">
            
            
                <div className={`${isRTL?'benefits__block__arabic':'benefits__block'}`}>
                    <div className="benefits__icon">
                        
                            <svg style={{fill:'#2d2d2d'}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 40 34.27"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M0,0V8.07H1.75v26.2h36.5V8.07H40V0ZM27.6,1.57l5.15,11.06-3.92-1.58-1.3,4L21.24,1.57ZM21.8,6.5H18.2L20,2.64Zm-3-4.93L12.47,15.06l-1.31-4L7.25,12.63,12.4,1.57ZM1.57,6.5V1.57h9.1L8.37,6.5ZM36.68,32.7H3.32V8.07H7.64l-3.5,7.51,6.05-2.45,2,6.21L17.47,8.07h5.06l5.26,11.27,2-6.21,6.05,2.45-3.5-7.51h4.32ZM38.43,6.5h-6.8l-2.3-4.93h9.1Z"></path></g></g></svg>
                        
                    </div>
                    <h3 className="benefits__subtitle">
                        {t('COMPLIMENTARYSHIPPING')}
                    </h3>
                    <p className="p--medium benefits__descr">
                        {t('COMPLIMENTARYSHIPPINGdisc')}
                    </p>
                </div>
            
                <div className={`${isRTL?'benefits__block__arabic':'benefits__block'}`}>
                    <div className="benefits__icon">
                        
                            <svg style={{fill:'#2d2d2d'}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 41.7 37.6">
                            <defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                              <rect className="cls-1" x="30.7" y="15.41" width="1.69" height="1.69"></rect><rect className="cls-1" x="34.08" y="15.41" width="1.69" height="1.69"></rect><rect className="cls-1" x="27.32" y="15.41" width="1.69" height="1.69"></rect><path className="cls-1" d="M41.7,9.27H26.09a4.07,4.07,0,0,0,0-.5,8.78,8.78,0,1,0-8.78,8.78,8.6,8.6,0,0,0,4.06-1v3.2A17.46,17.46,0,0,0,0,36.75v.85H34.92v-.85A17.26,17.26,0,0,0,29.37,24H41.7ZM17.34,15.85a7.08,7.08,0,1,1,7.08-7.08c0,.17,0,.34,0,.5h-3v5.28A6.94,6.94,0,0,1,17.34,15.85Zm15.85,20H1.72A15.77,15.77,0,0,1,17.45,21a15.44,15.44,0,0,1,3.95.5V24h2v4.83l4.18-4.18A15.58,15.58,0,0,1,33.19,35.9ZM40,22.29H27.47l-2.42,2.42V22.29H23.1V11H40Z"></path></g></g></svg>
                        
                    </div>
                    <h3 className="benefits__subtitle">
                        {t('PRIVATESESSION')}
                    </h3>
                    <p className="p--medium benefits__descr">
                        {t('PRIVATESESSIONdisc')}
                    </p>
                </div>
            
                <div className={`${isRTL?'benefits__block__arabic':'benefits__block'}`}>
                    <div className="benefits__icon">
                        
                            <svg style={{fill:'#2d2d2d'}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 40 39.27"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M38.61,29.7V8.11H32.36A14.53,14.53,0,0,0,19.31,0a14.31,14.31,0,0,0-13,8.11H0V36.25H28.07l-1.72-1.72H1.76V9.83H36.92V28ZM8.19,8.11a12.68,12.68,0,0,1,11.12-6.4,12.66,12.66,0,0,1,11.11,6.4Z"></path><polygon className="cls-1" points="38.95 39.27 23.3 23.58 23.9 30.59 22.42 30.72 21.58 20.81 31.58 21.65 31.45 23.13 24.33 22.53 40 38.22 38.95 39.27"></polygon></g></g></svg>
                        
                    </div>
                    <h3 className="benefits__subtitle">
                        {t('CLICKCOLLECT')}
                    </h3>
                    <p className="p--medium benefits__descr">
                        {t('CLICKCOLLECTdisc')}
                    </p>
                </div>
            
            

        </div>
    </div>
</section>
  );
};

export default Benefits;
