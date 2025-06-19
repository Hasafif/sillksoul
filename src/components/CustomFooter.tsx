import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";

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
<footer className={`${isRTL?'footer__arabic':'footer'} ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
    <div className="wrapper">
        <div className="footer__top">
        
                <div className="newsletter">     
                    <div className="subtitle">{t('newsletter')}</div>  
                   
                    <form method="post" action="/contact" id="contact_form" accept-charset="UTF-8" className={`contact-form`} dir={isRTL ? 'rtl' : 'ltr'}>
                    <input type="hidden" name="form_type" value="customer"/><input type="hidden" name="utf8" value="✓"/>
                    <label className="form-el">
                        <input type="hidden" name="contact[tags]" value="newsletter"/>
                        <input className={`email ${isRTL?'form-el__field__arabic':'form-el__field'} form-el--required newsletter__email`} type="email" name="contact[email]" id="Email" value="" placeholder={t('enterEmail')} autoCorrect="off" autoCapitalize="off" required={true}/>
                        <span className={`${isRTL?'form-el--validate--arabic':'form-el--validate'} form-el--description`}>
                            {t('newsletterText')} <Link to={"/aboutus"} className="link">{t('privacyPolicy')}</Link>.</span>

                        <span className={`${isRTL?'form-el--validate--arabic':'form-el--validate'} form-el--valid`}>
                            {t('emailSignup')}
                        </span>
                
                     <button className={`${isRTL?'newsletter__btn__arabic':'newsletter__btn'}`} type="submit" name="commit" id="Subscribe" aria-label="Footer Subscribe button">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {isRTL ? (
            // Left arrow for RTL
            <>
                <line x1="14.2259" y1="6.30373" x2="8.2259" y2="12.3037" stroke="#2D2D2D"></line>
                <path d="M14.1573 17.4985L8.6294 11.9699" stroke="#2D2D2D"></path>
            </>
        ) : (
            // Right arrow for LTR
            <>
                <line x1="9.77409" y1="6.30373" x2="15.7741" y2="12.3037" stroke="#2D2D2D"></line>
                <path d="M9.84271 17.4985L15.3706 11.9699" stroke="#2D2D2D"></path>
            </>
        )}
    </svg>
</button>
                    <span className={`${isRTL?'form-el--validate--arabic':'form-el--validate'} form-el--error`}>
                        {t('emailValidate')}
                    </span>
                    </label>
                </form>
                </div>
           
        </div>
        <div className="footer__main">
            
  
            <div className="footer-menu accordion">
                  
      
			<div className="footer-menu__column accordion__item">

                
			<div className={`${isRTL ? 'footer-menu__title__arabic':'footer-menu__title'} accordion__trigger`}>
				{t('customerCare')}
			</div>
			 
				<ul className="footer-menu__linklist accordion__content">
					
						<li><Link to={"/aboutus"}>{t('faq')}</Link></li>
					
						<li><Link to={"/contact"}>{t('contactUs')}</Link></li>
					
						<li><Link to={"/cart"}>{t('ExchangesandReturns')}</Link></li>
					
						<li><Link to={"/aboutus"}>{t('shippingPolicy')}</Link></li>
					
						<li><Link to={"/cart"}>{t('Myaccount')}</Link></li>
					
				</ul>
			

		</div>
      
			<div className="footer-menu__column accordion__item">
                <div className={`${isRTL ? 'footer-menu__title__arabic':'footer-menu__title'} accordion__trigger`}>
				{t('TheCompany')}
			</div>
			 
				<ul className="footer-menu__linklist accordion__content">
					
						<li><Link to={"/aboutus"}>{t('Careers')}</Link></li>
					
						<li><Link to={"/aboutus"}>{t('termsOfService')}</Link></li>
					
				</ul>
			

		</div>
      
			<div className="footer-menu__column accordion__item">
		<div className={`${isRTL ? 'footer-menu__title__arabic':'footer-menu__title'} accordion__trigger`}>
				{t('Boutiqueservices')}
			</div>
			 
				<ul className="footer-menu__linklist accordion__content">
					
						<li><Link to={"/exclusive"}>{t('PrivateViewing')}</Link></li>
					
						<li><Link to={"/contact"}>{t('OnlineAppointments')}</Link></li>
					
				</ul>
			

		</div>
      

  
                <div className="footer-menu__column accordion__item">
                    			<div className={`${isRTL ? 'footer-menu__title__arabic':'footer-menu__title'} accordion__trigger`}>
{t('contactUs')}</div>
                    <ul className="footer-menu__linklist accordion__content">
                        
                            
                                <li>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">         <path d="M4 6.5V6.83605V9.88289V17.5H20V9.88289V6.83605V6.5H4ZM19.2727 7.1721V9.47963L12 12.8849L4.72727 9.47963V7.1721H19.2727ZM19.2727 16.8503H4.72727V10.2189L12 13.6242L19.2727 10.2189V16.8503Z" fill="#2D2D2D"></path>     </svg>
                                    <Link to={"/contact"}>{t('contactUs')}</Link>
                                </li>  
                            
                        
                            
                                <li>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">         <path d="M11.9972 20C12.1069 20 17 11.5892 17 8.6185C17 5.51812 14.7597 3 11.9972 3C9.24219 3 7 5.51812 7 8.6185C7.00189 11.5892 11.8893 20 11.9972 20ZM11.9972 3.72038C14.4021 3.72038 16.3586 5.91762 16.3586 8.6185C16.3586 10.7669 13.2573 16.6255 11.9991 18.7654C10.7408 16.6255 7.64522 10.7669 7.64522 8.6185C7.64333 5.91762 9.59603 3.72038 11.9972 3.72038Z" fill="#2D2D2D"></path>     </svg>
                                    <Link to={"/contact"}>{t('VisitOurBoutiques')}</Link>
                                </li>  
                            
                        
                            
                                <li>
                                    <svg style={{fill:'#2d2d2d'}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 41.7 37.6"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect className="cls-1" x="30.7" y="15.41" width="1.69" height="1.69"></rect><rect className="cls-1" x="34.08" y="15.41" width="1.69" height="1.69"></rect><rect className="cls-1" x="27.32" y="15.41" width="1.69" height="1.69"></rect><path className="cls-1" d="M41.7,9.27H26.09a4.07,4.07,0,0,0,0-.5,8.78,8.78,0,1,0-8.78,8.78,8.6,8.6,0,0,0,4.06-1v3.2A17.46,17.46,0,0,0,0,36.75v.85H34.92v-.85A17.26,17.26,0,0,0,29.37,24H41.7ZM17.34,15.85a7.08,7.08,0,1,1,7.08-7.08c0,.17,0,.34,0,.5h-3v5.28A6.94,6.94,0,0,1,17.34,15.85Zm15.85,20H1.72A15.77,15.77,0,0,1,17.45,21a15.44,15.44,0,0,1,3.95.5V24h2v4.83l4.18-4.18A15.58,15.58,0,0,1,33.19,35.9ZM40,22.29H27.47l-2.42,2.42V22.29H23.1V11H40Z"></path></g></g></svg>
                                    <Link to={"/contact"}>{t('BookAnAppointment')}</Link>
                                </li>  
                            
                        
                            
                        
                            
                        
                            
                        
                            
                        
                            
                        
                            
                        
                    </ul>
                </div>
            </div>
           
        </div>
<div className="footer__logo">

     <img 
              className="rounded-full w-50 h-50" 
              //style={{ backgroundColor: "#2d2d2d"}}
              src="/Silk Soul Logo Mark.svg" 
              alt=""
            />
</div>
        <div className="footer__bottom">
            
            
            <ul className="bottom-menu">
                
                    <li><Link to={"/aboutus"}>{t('Careers')}</Link></li>
                
                    <li><Link to={"/aboutus"}>{t('contact')}</Link></li>
                
                    <li><Link to={"/aboutus"}>{t('termsOfService')}</Link></li>
                
                    <li><Link to={"/aboutus"}>{t('privacyPolicy')}</Link></li>
                    
                <li><a href="#" 
                //onclick="event.preventDefault(); Osano.cm.showDrawer('osano-cm-dom-info-dialog-open');"
                >{t('CookiePreferences')}</a>

</li>
            </ul>
            
            <div className="social-icons">
                
                
                
                
                
                
                
                
                    <a target="_blank" href="https://www.facebook.com" rel="noreferrer noopener"><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">         <path d="M3.125 11.5633V20H6.875V11.5633H9.67109L10.2031 8.07338H6.875V5.80962C6.875 4.8539 7.34 3.92317 8.83063 3.92317H10.3438V0.951994C10.3438 0.951994 8.97008 0.716187 7.65758 0.716187C4.91656 0.716187 3.125 2.38759 3.125 5.41347V8.07338H0.078125V11.5633H3.125Z" fill="#2D2D2D"></path>     </svg></a>
                
                
                
                    <a target="_blank" href="https://www.instagram.com" rel="noreferrer noopener"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">         <rect width="24" height="24" rx="6" fill="#2D2D2D"></rect>         <path d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z" fill="white"></path>         <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="white" stroke="white" stroke-width="1.5"></path>     </svg></a>
                
                
                
                    <a target="_blank" href="https://www.youtube.com" rel="noreferrer noopener"><svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">         <path d="M23.7609 4.20005C23.7609 4.20005 23.5266 2.54536 22.8047 1.8188C21.8906 0.862549 20.8688 0.857861 20.4 0.801611C17.0438 0.557861 12.0047 0.557861 12.0047 0.557861H11.9953C11.9953 0.557861 6.95625 0.557861 3.6 0.801611C3.13125 0.857861 2.10938 0.862549 1.19531 1.8188C0.473438 2.54536 0.24375 4.20005 0.24375 4.20005C0.24375 4.20005 0 6.14536 0 8.08599V9.90474C0 11.8454 0.239062 13.7907 0.239062 13.7907C0.239062 13.7907 0.473437 15.4454 1.19062 16.1719C2.10469 17.1282 3.30469 17.0954 3.83906 17.1985C5.76094 17.3813 12 17.4375 12 17.4375C12 17.4375 17.0438 17.4282 20.4 17.1891C20.8688 17.1329 21.8906 17.1282 22.8047 16.1719C23.5266 15.4454 23.7609 13.7907 23.7609 13.7907C23.7609 13.7907 24 11.85 24 9.90474V8.08599C24 6.14536 23.7609 4.20005 23.7609 4.20005ZM9.52031 12.1125V5.36724L16.0031 8.75161L9.52031 12.1125Z" fill="#2D2D2D"></path>     </svg></a>
                
                
                
                    <a target="_blank" href="https://www.pinterest.co.uk" rel="noreferrer noopener"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 0C5.37188 0 0 5.37188 0 12C0 17.0859 3.16406 21.4266 7.62656 23.175C7.52344 22.2234 7.425 20.7703 7.66875 19.7344C7.88906 18.7969 9.075 13.7719 9.075 13.7719C9.075 13.7719 8.71406 13.0547 8.71406 11.9906C8.71406 10.3219 9.67969 9.075 10.8844 9.075C11.9062 9.075 12.4031 9.84375 12.4031 10.7672C12.4031 11.7984 11.7469 13.3359 11.4094 14.7609C11.1281 15.9562 12.0094 16.9313 13.1859 16.9313C15.3187 16.9313 16.9594 14.6812 16.9594 11.4375C16.9594 8.56406 14.8969 6.55313 11.9484 6.55313C8.53594 6.55313 6.52969 9.1125 6.52969 11.7609C6.52969 12.7922 6.92812 13.8984 7.425 14.4984C7.52344 14.6156 7.5375 14.7234 7.50937 14.8406C7.42031 15.2203 7.21406 16.0359 7.17656 16.2C7.125 16.4203 7.00313 16.4672 6.77344 16.3594C5.27344 15.6609 4.33594 13.4719 4.33594 11.7094C4.33594 7.92188 7.0875 4.44844 12.2625 4.44844C16.425 4.44844 19.6594 7.41563 19.6594 11.3813C19.6594 15.5156 17.0531 18.8438 13.4344 18.8438C12.2203 18.8438 11.0766 18.2109 10.6828 17.4656C10.6828 17.4656 10.0828 19.7578 9.9375 20.3203C9.66562 21.3609 8.93437 22.6688 8.44687 23.4656C9.57187 23.8125 10.7625 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0Z" fill="#2D2D2D"></path> </svg></a>
                
                
                
                    <a target="_blank" href="https://www.linkedin.com" rel="noreferrer noopener"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="#2D2D2D"></path> </svg></a>
                
                
                
                    <a target="_blank" href="https://weibo.com" rel="noreferrer noopener"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M34.16,23.65c-1.37-.53-1.37-.53-1-2,.72-2.53-.39-4.07-3-4.2a2.58,2.58,0,0,0-.68,0c-1.61.38-3.21.78-4.81,1.15a5.61,5.61,0,0,1-.92.06,7.85,7.85,0,0,1,0-.84,17.38,17.38,0,0,0,.24-2,2.52,2.52,0,0,0-2.76-2.73,7.52,7.52,0,0,0-2.75.49A22.39,22.39,0,0,0,6,25.86c-1.61,3.85-.51,7.27,2.84,9.74,3.64,2.67,7.82,3.55,12.24,3.56.42,0,.85,0,1.27,0,5-.27,9.59-1.71,13.24-5.36A10.36,10.36,0,0,0,36.9,32.2C39.25,28.62,38.14,25.19,34.16,23.65ZM29.73,33.3a13.22,13.22,0,0,1-7.52,3.6,14.76,14.76,0,0,1-8.87-1c-5.28-2.45-5.76-7.64-1.05-11a15.08,15.08,0,0,1,8.63-2.75,13.59,13.59,0,0,1,7.87,2C32.34,26.48,32.72,30.25,29.73,33.3ZM42.62,17.06a9.63,9.63,0,0,0-11.6-8,1.24,1.24,0,0,0-1.12,1.45,1.3,1.3,0,0,0,1.58,1.07l1.45-.12a6.8,6.8,0,0,1,5.74,2.8A6.94,6.94,0,0,1,40,20.53c-.3,1.21,0,1.83.84,2s1.48-.22,1.63-1.36A15.57,15.57,0,0,0,42.62,17.06Zm-6.38,3.8c.79.12,1.16-.35,1.34-1.09A4.67,4.67,0,0,0,33,14h-.39c-.8,0-1.5.26-1.5,1.15s.69,1.08,1.51,1.06c2-.05,3,1.18,2.75,3.16C35.3,20.08,35.39,20.73,36.24,20.86ZM21,25.17a6.59,6.59,0,0,0-6.29,2.58,4.49,4.49,0,0,0-.61,5c1,2,2.88,2.7,4.93,2.82a7.11,7.11,0,0,0,4.26-1.43,5.13,5.13,0,0,0,2.19-5.37A4.93,4.93,0,0,0,21,25.17Zm-3.53,8.06a1.67,1.67,0,0,1-1.76-1.58A2.27,2.27,0,0,1,18,29.54a1.66,1.66,0,0,1,1.81,1.62A2.3,2.3,0,0,1,17.44,33.23Zm3.75-3.31a.72.72,0,1,1,.42-1A.79.79,0,0,1,21.19,29.92Z"></path></svg></a>
                
                
            </div>
    
        </div>    
    </div>
  </footer>
  );
};

export default Footer;
