import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import React, { useState } from 'react';

const DesignerIntro = ({
    name = "About Us",
    // Other props are unchanged...
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    name = t('aboutTitle');
    const fontClass = isRTL ? "URW DIN ARABIC" : "Helvetica Neue LT W05";
    const pClassName = `BodyWrapper-kufPGa jsixHr body DesignerIntroBody-ewKWAa gWmsiL`;

    return (
        <div>
            <style>
                {`
                /* --- STYLES ARE UNCHANGED FROM PREVIOUS VERSION --- */
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
                    text-align: ${isRTL ? 'right' : 'left'};
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
                /*  font-family: ${fontClass};*/
                 font-family:"Starsight";
                  font-weight: 400;
                  color: rgb(31, 31, 31);
                }
                .BodyWrapper-kufPGa.jsixHr.body p {
                   /* font-family: ${fontClass}, sans-serif !important;*/
                     font-family:"Starsight";
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
                .hTTNGO .button--collapse {
                    margin: 0px auto;
                }
          
                .BaseButton-bLlsy.ButtonWrapper-xCepQ.cRxydS.dYPVcQ.button.button--secondary.button--collapse.button__icon--chevron-up {
                  display: inline-block;
                  cursor: pointer;
                  text-align: center;
                  text-decoration: none;
                  appearance: none;
                  justify-content: center;
                  display: flex;
                  position: relative;
                  align-items: center;
                  z-index: 1;
                  padding: 0px 1rem;
                  height: 3rem;
                  transition: color 200ms ease-in, background 200ms ease-in, border 200ms ease-in;
                  color: rgb(0, 0, 0);
                  background-color: transparent;
                  text-transform: uppercase;
                  /*font-family: Arial, helvetica, sans-serif;*/
                   font-family:"Starsight";
                  font-size: 13px;
                  font-weight: 600;
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
                  padding-left: 0.5rem;
                }
                
                .ButtonIcon-YqaGo.iwlhuX.button-icon.icon.icon-chevron {
                  display: block;
                  height: 32px;
                  transform: ${isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)'};
                  transition: transform 200ms ease-in-out;
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
                                className={pClassName}
                                data-journey-hook="client-content"
                                data-testid="BodyWrapper"
                            >
                                {/* **MODIFICATION START** */}
                                <p className={pClassName}>{t('par1')}</p>
                                <p className={pClassName}>{t('par2')}</p>

                                {isExpanded && (
                                    <p className={pClassName}>{t('par3')}</p>
                                )}
                                {/* **MODIFICATION END** */}
                            </div>
                        </div>
                        <button
                            className="BaseButton-bLlsy ButtonWrapper-xCepQ cRxydS dYPVcQ button button--secondary button--collapse button__icon--chevron-up"
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
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DesignerIntro;