import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import React, { useState } from 'react';

const DesignerIntro = ({ 
  name = "About Us",
  imageUrl = "https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_1024%2Cc_limit/elie-saab.jpg",
  imageSrcSet = "https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_120,c_limit/elie-saab.jpg 120w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_240,c_limit/elie-saab.jpg 240w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_320,c_limit/elie-saab.jpg 320w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_640,c_limit/elie-saab.jpg 640w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_960,c_limit/elie-saab.jpg 960w",
  imageAlt = "This image may contain Human Person Clothing Apparel Toni Garrn and Coat",
  //content
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    name = t('aboutTitle');
    const fontClass = isRTL ? "URW DIN ARABIC" : "Helvetica Neue LT W05";
  const defaultContent = (
     <div>
<p
            className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}

>
  “I think working in fashion was more my destiny than anything else,” explains Elie Saab, the Lebanese designer who, by the tender age of 9, was making clothes for his family from materials he found around the house. Apart from a single year spent at a fashion school in Paris, Saab is self-taught—and focused. In 1982, just 18, he made his debut in war-torn Beirut. “There had never been such a presentation in Lebanon,” he later recalled. “Models didn't exist. I found girls who worked in advertising and students. I suspect most, like me, had never even been to a fashion show.”
      </p>
       <p  className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}>Saab got his start designing elaborate bridal gowns, and he has grown his business slowly, steadily, and internationally with dazzling getups that pair the luxury of Eastern embellishment with Western silhouettes. "I like feminine elegance, not extravagance," Saab has said. "I try to give good taste." In 1997 he was invited to show in Rome by the Camera Nazionale della Moda Italiana; three years later the elite Chambre Syndicale de la Haute Couture asked him to present in Paris, naming him a <em>membre correspon­dant</em> in 2006. (Saab is the first Arab to be admitted into the organization.)</p>
      <p className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}>"The code of my collections will always remain the same," the glamour-focused Saab has stated, and his clients, A-listers and otherwise, wouldn't want that to change. Queen Rania of Jordan chose an Elie Saab design for her husband's 1999 coronation; and in 2002 Oscar winner Halle Berry wore Saab's flirtatious flower-embroidered burgundy dress to the awards ceremony, making Saab a diva's go-to red carpet designer overnight. "She wore it out of love, not because a stylist told her to wear it. That is the force behind wearing my designs," Saab told <em>The Telegraph</em>. "Everything comes from the heart."</p>
    </div>
 
  );
 const defaultContent2 = (
     <div>
<p
          className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
          // className={`pb-4`}

> {t('par1')}

      </p>
       <p  
       className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
       // className={`pb-4`}
       >
{t('par2')}        </p>
 <p  
        className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
        >
{t('par3')}        </p>

    </div>
 
  );
  return (
    <div>
      <style>
        {`

         @font-face{
    font-family: "Starsight";
    src: url("../assets/fonts/Starsight.ttf") format("truetype");
    font-weight:normal;
    font-style:normal;
    font-display:swap;
}
            .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
            display: grid;
            grid-template-areas: "title" "video" "body";
            grid-template-columns: 1fr;
            /*gap: 1rem;*/
            margin-top: 4rem;
             padding-bottom:4rem;
          
          }
             .gkCFoE {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0px auto;
    --grid-gap: 1rem;
    --grid-margin: 1.5rem;
    max-width: 1600px;
    padding-right: -calc(1 * var(--grid-margin));
    padding-left: -calc(1 * var(--grid-margin));
}
    @media (min-width: 768px) {
    .gkCFoE {
        --grid-gap: 1.5rem;
        --grid-margin: 3rem;
          padding-right: calc(1 * var(--grid-margin));
    padding-left: calc(1 * var(--grid-margin));
    }
}
    @media (min-width: 1024px) {
    .gkCFoE {
        --grid-gap: 2rem;
    }
}
          @media (max-width:560px) {
          .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
           padding-bottom:4rem;
        
           }
          }
              @media (max-width:330px) {
          .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
           padding-bottom:8rem;
        
           }
          }
           .ckNYsD {
                         gap: 1rem;
           }
          @media (min-width: 768px) {
            .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
              grid-template-areas: "video title" "video body";
              grid-template-columns: 1fr 1fr;
              margin-top: 4rem;
              gap:2rem;
              row-gap: 3rem;
         
           
            }
          }
          @media (min-width: 768px) {
    .ckNYsD {
        --grid-gap: 1.5rem;
        --grid-margin: 3rem;
        
    }
}
          @media (min-width: 1024px) {
            .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
              --grid-gap: 2rem;
            }
          }
          
          @media (min-width: 1280px) {
            .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
              --grid-margin: 4rem;
            }
          }
          
          .DesignerIntroTitle-jfmGui.csQcLb {
            grid-area: title;
             align-self: end;    
          }
            /* @media (min-width:768px){
               .DesignerIntroTitle-jfmGui.csQcLb {
      position:relative;
           top:-2rem;     
          }
                             
             }*/
          
          /*.BaseWrap-sc-gjQpdd.BaseText-ewhhUZ.DesignerIntroHed-sc-KngdW.iUEiRd.cuCmeo.qRstE {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 400;
            line-height: 1.2;
            color: #1f1f1f;
            font-family: ${fontClass}, serif;
          }*/
         .qRstE {
    text-align: center;
    --type-token: discovery . page-hed-section;
    text-transform: none;
    /*font-family: FBDidotS, serif;*/
    /*font-family: ${fontClass}, serif;*/
    font-family:Starsight;
    font-feature-settings: normal;
    font-style: normal;
    letter-spacing: 0.0416667em;
    line-break: auto;
    line-height: 1.125em;
    font-size: 48px;
    font-weight: 300;
    overflow-wrap: normal;
    color: rgb(0, 0, 0);
    
}
          @media (min-width: 768px) {
    .qRstE {
        text-align: ${isRTL?'right':'left'};
        margin-bottom:2rem;
  

       
    }
}
    @media (min-width: 768px) {
    .qRstE {
        font-size: 64px;
        line-height: 1.125em;
        
    }
}


          .SpanWrapper-umhxW.cudDwW.responsive-asset.DesignerIntroImage-bNPsMh.hDgjsm {
            grid-area: video;
            display: block;
            transition: opacity 1s;
            opacity: 1;
            overflow: hidden;
          }
          
          .ResponsiveImagePicture-cWuUZO.dUOtEa.DesignerIntroImage-bNPsMh.hDgjsm.responsive-image {
            display: inline-block;
            position: relative;
            width: -webkit-fill-available;
          }
          
          .ResponsiveImageContainer-eybHBd.fptoWY.responsive-image__image {
            max-width: 100%;
            height: auto;
            vertical-align: bottom;
            border: 0px;
          }
          
         /* .ClampWrapper-kZxfkB.hTTNGO.clamp {
            grid-area: body;
          }*/

 
          
          .ClampContent-hilPkr.gjTTxQ {
            position: relative;
          }
.iUEiRd {
    margin: 0px;
}
   .gWmsiL.gWmsiL.gWmsiL {
    margin-top: -1rem;
}
          .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
            align-self:start;
            text-transform: none;
            /*font-family: "AGaramondPro-Regular";*/
            /*font-family: ${fontClass};*/
            font-family:Starsight;
            font-feature-settings: normal;
            font-style: normal;
            letter-spacing: normal;
            line-break: auto;
            font-weight: 400;
            overflow-wrap: normal;
            color: rgb(31, 31, 31);
            

             
          
          }
                       @media (max-width:768px) {
          .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
                       padding-left:0.7rem;
             padding-right:0.7rem;
             
          }
          }
          .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL p {
            align-self: start;
            text-transform: none;
            /*font-family: 'Crimson Text', serif;*/
            /*font-family: AdobeGaramondPro, serif;*/
            /*font-family: "AGaramondPro-Regular";*/
            /*font-family: ${fontClass};*/
             font-family:Starsight;
            font-feature-settings: normal;
            font-style: normal;
            letter-spacing: normal;
            line-break: auto;
            font-weight: 400;
            overflow-wrap: normal;
              padding-bottom:0.3rem;
              padding-top:0.8rem;
              margin-top:0;
            color: rgb(31, 31, 31);
          
          }
    
          @media (min-width: 768px) {
            .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
              font-size: 17px;
              line-height: 1.41em;
            }
          }
          /*@media (min-width: 1080px)
          {
           .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
           position:relative;
           top:-3rem;
            }
          }      
    @media (min-width: 768px) and (max-width:1080px)
          {
           .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
           position:relative;
           top:-1.5rem;
            }
          }  */
 
          .fIsWrX {
            display: -webkit-box;
           overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: ${isExpanded ? 'none' : '12'};
          }
          
          @media (max-width: 1599px) {
            .fIsWrX {
              -webkit-line-clamp: ${isExpanded ? 'none' : '12'};
            }
          }
          
          .hTTNGO .button--collapse {
            margin: 0px auto;
          }
          
          .BaseButton-bLlsy.ButtonWrapper-xCepQ.cRxydS.dYPVcQ.button.button--secondary.button--collapse.button__icon--chevron-up {
            display: inline-block;
            background-color: rgb(224, 224, 224);
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            appearance: none;
            -webkit-box-pack: center;
            justify-content: center;
            display: flex;
            position: relative;
            -webkit-box-align: center;
            align-items: center;
            z-index: 1;
            border-radius: 0px;
            padding: 0px 1rem;
            min-width: 2.5rem;
            height: 3rem;
            min-height: 0px;
            transition-property: color, background, border;
            transition-duration: 200ms;
            transition-timing-function: ease-in;
            color: rgb(0, 0, 0);
            background-color: transparent;
            text-transform: uppercase;
            font-family: Arial, helvetica, sans-serif;
            font-feature-settings: normal;
            font-style: normal;
            letter-spacing: 0.0994083em;
            line-break: auto;
            line-height: 1.13615em;
            font-size: 13px;
            font-weight: 600;
            overflow-wrap: normal;
            border: none;
            margin-top: 1rem;
          }
          .jsixHr {
    padding: 0px;
    max-width: 1600px;
}
          @media (min-width: 768px) {
            .BaseButton-bLlsy.ButtonWrapper-xCepQ.cRxydS.dYPVcQ.button.button--secondary.button--collapse.button__icon--chevron-up {
              min-width: 10rem;
            }
          }
          
          .ButtonLabel-cjAuJN.hzwRuG.button__label {
            font-variant-ligatures: none;
            padding: 0.5rem 0px;
          }
          
          .ButtonIconWrapper-gFdzAL.iJyRRe.button__icon-container {
            padding-right: 0px;
            padding-left: 0.5rem;
          }
          
          .ButtonIcon-YqaGo.iwlhuX.button-icon.icon.icon-chevron {
            display: block;
           /* width: 32px;*/
            height: 32px;
            transform: ${isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)'};
            transition: transform 200ms ease;
          }
          
          .hTTNGO .BaseButton-bLlsy .ButtonIcon-YqaGo {
            width: 1rem;
          }
          
          svg:not(:root) {
            overflow: hidden;
          }
        `}
      </style>
      <div className='gkCFoE'>
<section 
        data-testid="designer-intro" 
        className="DesignerIntroWrapper-sc-cdteAU ckNYsD"
      >
        <div className="DesignerIntroTitle-jfmGui csQcLb">
          <h1 
            data-testid="designer-intro-hed" 
            className="BaseWrap-sc-gjQpdd BaseText-ewhhUZ DesignerIntroHed-sc-KngdW iUEiRd cuCmeo qRstE"
          >
            {name}
          </h1>
        </div>
        {/* MODIFIED: Video element is now in a styled container */}
        
        {<span className="SpanWrapper-umhxW cudDwW responsive-asset DesignerIntroImage-bNPsMh hDgjsm">
          <picture className="ResponsiveImagePicture-cWuUZO dUOtEa DesignerIntroImage-bNPsMh hDgjsm responsive-image">
           {/*
<img
             alt={imageAlt}
            className="ResponsiveImageContainer-eybHBd fptoWY responsive-image__image"
            //  src={`/Ghala.mp4`}
            src={imageUrl}
              srcSet={imageSrcSet}
             sizes="100vw"
           //  autoPlay={true}
            />*/}


               {<video 
            className="ResponsiveImageContainer-eybHBd fptoWY responsive-image__image"
src={`/v2.mp4`} 
       //  src="https://res.cloudinary.com/www-eliesaab-com/video/upload/c_scale,f_auto,h_1200,q_auto/v1747121895/ES_Summer_Escapade_Banner_1_eumrdh.mp4"

 autoPlay
          muted
          loop
          playsInline
        style={{
            //width:'120',
            //height: '140',
           // maxWidth: '100%',
         //  maxHeight: '20%',
           // transform: 'scale(1.2)'
          }}
        />}
          </picture>
        </span>}
        
        <div data-testid="ClampWrapper" className="ClampWrapper-kZxfkB hTTNGO clamp">
          <div className="ClampContent-hilPkr fIsWrX">
            <div 
              className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
              data-journey-hook="client-content" 
              data-testid="BodyWrapper"
            >
   {defaultContent2}
    
            </div>
          </div>
          
          {<button 
            className="BaseButton-bLlsy ButtonWrapper-xCepQ cRxydS dYPVcQ button button--secondary button--collapse button__icon--chevron-up"
            data-event-click="{&quot;element&quot;:&quot;Button&quot;}"
            data-testid="Button"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="ButtonLabel-cjAuJN hzwRuG button__label">
              {isExpanded ? 'Read less' : 'Read more'}
            </span>
            <div className="ButtonIconWrapper-gFdzAL iJyRRe button__icon-container">
              <svg 
                className="ButtonIcon-YqaGo iwlhuX button-icon icon icon-chevron"
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Chevron</title>
                <path 
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 8 3.646 1.354l.708-.708L11.707 8l-7.353 7.354-.708-.707L10.293 8Z"
                  fill="#000"
                />
              </svg>
            </div>
          </button>}
        </div>
      </section>

      </div>
      
    </div>
  );
};

export default DesignerIntro;