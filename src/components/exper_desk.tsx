import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import React, { useState } from 'react';

const DesignerIntro = ({ 
  name = "About Us",
  imageUrl = "https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_1024%2Cc_limit/elie-saab.jpg",
  imageSrcSet = "https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_120,c_limit/elie-saab.jpg 120w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_240,c_limit/elie-saab.jpg 240w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_320,c_limit/elie-saab.jpg 320w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_640,c_limit/elie-saab.jpg 640w, https://assets.vogue.com/photos/5790d217b5db872b52787558/6:7/w_960,c_limit/elie-saab.jpg 960w",
  imageAlt = "This image may contain Human Person Clothing Apparel Toni Garrn and Coat",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    name = t('aboutTitle');
    const fontClass = isRTL ? "URW DIN ARABIC" : "Helvetica Neue LT W05";

  const defaultContent2 = (
      <div>
<p
          className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
> {t('aboutDescription1')}

      </p>
        <p  
        className={`BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`}
        >
{t('aboutDescription2')}        </p>

    </div>
  
  );
  return (
    <div>
      <style>
        {`
        /* --- ALL MOBILE STYLES ARE PRESERVED --- */
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
          margin-top: 4rem;
          padding-bottom:4rem;
          gap: 1rem;
        }

        .gkCFoE {
          display: grid;
          grid-template-columns: 1fr;
          margin: 0px auto;
          --grid-gap: 1rem;
          --grid-margin: 1.5rem;
          max-width: 1600px;
          padding-right: var(--grid-margin);
          padding-left: var(--grid-margin);
        }
        
        @media (min-width: 768px) {
          .gkCFoE {
            --grid-gap: 1.5rem;
            --grid-margin: 3rem;
          }
        }
        
        @media (min-width: 1024px) {
          .gkCFoE {
            --grid-gap: 2rem;
          }
        }

        /* --- DESKTOP STYLES START HERE --- */
        
        @media (min-width: 768px) {
          .DesignerIntroWrapper-sc-cdteAU.ckNYsD {
            grid-template-areas: "video title" "video body";
            grid-template-columns: 1fr 1fr;
            margin-top: 4rem;
            gap: 2rem; 
            grid-template-rows: auto 1fr;
          }
        }
        
        .DesignerIntroTitle-jfmGui.csQcLb {
          grid-area: title;
          align-self: start; 
          /* CHANGED: Increased from 3rem to push the title further down. */
          padding-top: 5rem; 
        }

        .qRstE {
          text-align: center;
          font-family:Starsight;
          font-size: 48px;
          font-weight: 300;
          color: rgb(0, 0, 0);
        }
        
        @media (min-width: 768px) {
          .qRstE {
            text-align: ${isRTL?'right':'left'};
            /* CHANGED: Decreased from 2rem to bring the title closer to the text. */
            margin-bottom: 0.8rem; 
            font-size: 64px;
            line-height: 1.125em;
          }
        }

        .SpanWrapper-umhxW.cudDwW.responsive-asset.DesignerIntroImage-bNPsMh.hDgjsm {
          grid-area: video;
          display: block;
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

        @media (min-width: 768px) {
          .ClampWrapper-kZxfkB.hTTNGO.clamp {
            grid-area: body;
            align-self: start;
          }
        }
        
        .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
          text-transform: none;
          font-family:Starsight;
          font-weight: 400;
          color: rgb(31, 31, 31);
        }

        @media (min-width: 768px) {
          .BodyWrapper-kufPGa.jsixHr.body p + p {
            margin-top: 1.5em;
          }
        }
        
        @media (min-width: 768px) {
          .BodyWrapper-kufPGa.jsixHr.body.DesignerIntroBody-ewKWAa.gWmsiL {
            font-size: 17px;
            line-height: 1.41em;
          }
        }
      `}
      </style>
      <div className='gkCFoE'>
      {/* JSX IS UNCHANGED FROM YOUR ORIGINAL CODE */}
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
        
        <span className="SpanWrapper-umhxW cudDwW responsive-asset DesignerIntroImage-bNPsMh hDgjsm">
          <picture className="ResponsiveImagePicture-cWuUZO dUOtEa DesignerIntroImage-bNPsMh hDgjsm responsive-image">
            <video 
              className="ResponsiveImageContainer-eybHBd fptoWY responsive-image__image"
              src={`/v2.mp4`} 
              autoPlay
              muted
              loop
              playsInline
            />
          </picture>
        </span>
        
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
        </div>
      </section>
    </div>
    </div>
  );
};

export default DesignerIntro;