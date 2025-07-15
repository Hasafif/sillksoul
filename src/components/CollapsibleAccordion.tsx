import { useLanguage } from '../contexts/LanguageContext';
import React, { useState } from 'react';

const ProductAccordion = ({ title = "Description", children, maxHeight = 110 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { language, isRTL } = useLanguage();
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <style>{`
        .product-accordion {
          margin: 0;
          width: 100%;
          box-sizing: border-box;
          margin-bottom:0;
        }
        
        .accordion-details {
          display: block;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }
        
        .accordion-summary-english{
          width: 100%;
          list-style: none;
          position: relative;
          font-size: 0.9rem;
          font-family:Helvetica Neue LT W05;
          color: #100F0D;
          line-height: 1;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
          background: none;
          border: none;
          border-bottom: 1px solid #e0e0e0;
          box-sizing: border-box;
        }
          .accordion-summary-arabic{
          width: 100%;
          list-style: none;
          position: relative;
          font-size: 0.9rem;
          font-family:URW DIN ARABIC;
          color: #100F0D;
          line-height: 1;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
          background: none;
          border: none;
          border-bottom: 1px solid #e0e0e0;
          box-sizing: border-box;
        }
        .accordion-summary:focus {
          outline: none;
        }
        
        .accordion-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          color: #acacac;
          height: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .accordion-icon svg {
          transition: transform 0.5s ease-in;
        }
        
       .accordion-content-english {
          padding: 15px 0 5px 0;
          font-size: 0.9rem;
          font-family:Helvetica Neue LT W05;
          color: #100F0D;
          width: 100%;
        }
         .accordion-content-arabic {
          padding: 15px 0 5px 0;
          font-size: 0.9rem;
          font-family:URW DIN ARABIC;
          color: #100F0D;
          width: 100%;
        }
        .accordion-content > *:last-child {
          margin-bottom: 0;
        }
        
        .max-height {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        
        .max-height--inner {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        .max-height--inner-content p {
          word-spacing: 0.001em;
          font-feature-settings: "kern" 1;
          font-kerning: normal;
        }
        
        .max-height--inner-content ul {
          margin: 0;
        }
        
        .max-height-toggle {
          padding-top: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .max-height-toggle span {
          padding-bottom: 3px;
        }
        
        .text-button--read-more {
          color: #666;
          font-size: 0.9rem;
        }
        
        .modal {
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 600px;
          border-radius: 8px;
          position: relative;
        }
        
        .modal-close {
          color: #aaa;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          position: absolute;
          top: 10px;
        }
        
        .modal-close:hover {
          color: #000;
        }
      `}</style>

      <div className="product-accordion accordion" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="accordion-details">
          <button 
            className={`${isRTL?'accordion-summary-english':'accordion-summary-arabic'}`}
            onClick={toggleAccordion}
            style={{
              textAlign: isRTL ? 'right' : 'left',
              padding: isRTL ? '15px 0 15px 40px' : '15px 40px 15px 0'
            }}
          >
            {title}
            <span 
              className="accordion-icon"
              style={{
                [isRTL ? 'left' : 'right']: '18px'
              }}
            >
              <svg 
                viewBox="0 0 10 6" 
                width="14"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
          
          <div 
            className={`${isRTL?'accordion-content-english':'accordion-content-arabic'}`}
            style={{
              display: isOpen ? 'block' : 'none'
            }}
          >
            <div className="max-height">
              <div 
                className="max-height--inner"
                style={{
                  maxHeight: `${maxHeight}px`
                }}
              >
                <div className="max-height--inner-content">
                  {children}
                </div>
              </div>
              {/*<button className="max-height-toggle" onClick={openModal}>
                <span className="animation-underline text-button--read-more">
                  View more
                </span>
              </button>*/}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div 
        className="modal" 
        onClick={closeModal}
        style={{
          display: showModal ? 'block' : 'none'
        }}
      >
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          <span 
            className="modal-close" 
            onClick={closeModal}
            style={{
              [isRTL ? 'left' : 'right']: '15px'
            }}
          >
            &times;
          </span>
          <div style={{ marginTop: '20px' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Demo component to show multiple accordions working independently
const AccordionDemo = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Multiple Accordions Demo</h2>
      
      <ProductAccordion title="First Accordion">
        <p>This is the content of the first accordion. It should open and close independently.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </ProductAccordion>
      
      <ProductAccordion title="Second Accordion">
        <p>This is the content of the second accordion. It should also work independently.</p>
        <p>You can have multiple paragraphs and other content here.</p>
      </ProductAccordion>
      
      <ProductAccordion title="Third Accordion">
        <p>This is the third accordion. All three should work independently now!</p>
        <p>The fix moves the dynamic styles from the CSS template literals to inline styles, ensuring each accordion instance maintains its own state.</p>
      </ProductAccordion>
    </div>
  );
};

export default ProductAccordion;