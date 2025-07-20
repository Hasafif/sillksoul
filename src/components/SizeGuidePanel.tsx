import React, { useState } from 'react';
import { ArrowLeft, X, Ruler } from 'lucide-react';

const SizeGuideSidepanel = ({ 
  isOpen, 
  onClose, 
  language, 
  isRTL,
  isMobile,
  containerRef, // Pass the ref of the container section
  //sectionBounds // Or pass the bounds directly: { top, left, width, height }
}) => {
  const [formData, setFormData] = useState({
    bust: '',
    waist: '',
    hips: '',
    shoulders: '',
    bustPoint: '',
    waistPoint: '',
    nippleToNipple: '',
    armRound: '',
    wrist: '',
    armHole: '',
    sleeveLength: '',
    fullLength: '',
    fullTailLength: '',
    additionalNotes: '' // Optional field
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Form data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  // Get section bounds - either from ref or passed directly
  const bounds = (containerRef?.current?.getBoundingClientRect() || {});
  
  // Input field component for reusability
  const InputField = ({ field, label, labelAr, required = true, placeholder, placeholderAr }) => (
    <div className="flex flex-col space-y-2">
      <label className={`text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : 'font-english text-left'}`}>
        {language === 'en' ? label : labelAr}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          step="0.1"
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={` w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${isRTL ? 'text-right pr-8' : 'text-left pl-3'} hover:border-gray-400`}
          placeholder={language === 'en' ? placeholder : placeholderAr}
          required={required}
        />
       {/*
       <Ruler className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'left-3' : 'right-3'}`} />


      */ } 
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay - only covers the specific section */}
      <div 
        className="absolute bg-black bg-opacity-50 transition-opacity pointer-events-auto backdrop-blur-sm"
        style={{
          //left: (isRTL?bounds.left/10:bounds.left/2+bounds.width/2) || 0,
          left:(!isMobile?(isRTL?bounds.left/10:bounds.left):(isRTL?bounds.left/20:bounds.left*1)) || 0,
         // right:bounds.right || 0,
          width: (!isMobile?(bounds.width + (isRTL? bounds.right/10:bounds.left/10)):(bounds.width + (isRTL? bounds.right/10:bounds.left))) || '100%',
          height: (!isMobile?bounds.height:'100%')
        }}
        onClick={onClose}
      />
      
      {/* Sidepanel - slides from right edge to fill the section */}
      <div 
        className={`absolute bg-white shadow-2xl transform transition-all duration-300 ease-in-out pointer-events-auto flex flex-col max-h-full`}
        style={{
          //left: (isRTL?bounds.left/10:bounds.left/2+bounds.width/2) || 0,
         // left: (isRTL?bounds.left/10:bounds.left) || 0,
          left:(!isMobile?(isRTL?bounds.left/10:bounds.left):(isRTL?bounds.left/20:bounds.left*1)) || 0,
          //right:bounds.right/2 || 0,
          width: (!isMobile?(bounds.width + (isRTL? bounds.right/10:bounds.left/10)):(bounds.width + (isRTL? bounds.right/10:bounds.left))) || '100%',
           height: (!isMobile?bounds.height:'100%'),
          transform: isOpen ? 'translateX(0)' : `translateX(${isRTL ? '-100%' : '100%'})`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className={`flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            <span className={`font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}>
              {language === 'en' ? 'Return to Product' : 'العودة إلى المنتج'}
            </span>
          </button>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-6">
            {/* Title Section */}
            <div className={`text-center mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className={`text-center text-2xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' ? 'Size Guide' : 'دليل المقاسات'}
              </h2>
                <p className={`text-sm text-gray-500 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Note: All measurements are in inches'
                  : 'ملاحظة: المقاسات بالإنش'
                }
              </p>
              {/*<p className={`text-gray-600 mb-2 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Enter your measurements to find the perfect fit'
                  : 'أدخل قياساتك للعثور على المقاس المثالي'
                }
              </p>
              <p className={`text-sm text-gray-500 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Note: All measurements are in inches'
                  : 'ملاحظة: المقاسات بالإنش'
                }
              </p>*/}
            </div>

            {/* Form Grid - Two columns */}
            <div className="space-y-2">
              {/* Row 1: Bust & Waist */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="bust"
                  label="Bust"
                  labelAr="صدر"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الصدر"
                />
                <InputField
                  field="waist"
                  label="Waist"
                  labelAr="خصر"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الخصر"
                />
              </div>

              {/* Row 2: Hips & Shoulders */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="hips"
                  label="Hips"
                  labelAr="أرداف"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الأرداف"
                />
                <InputField
                  field="shoulders"
                  label="Shoulders"
                  labelAr="اكتاف"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الاكتاف"
                />
              </div>

              {/* Row 3: Bust Point & Waist Point */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="bustPoint"
                  label="Bust Point"
                  labelAr="نقطة الصدر"
                  placeholder="Enter measurement"
                  placeholderAr="قياس نقطة الصدر"
                />
                <InputField
                  field="waistPoint"
                  label="Waist Point"
                  labelAr="نقطة الخصر"
                  placeholder="Enter measurement"
                  placeholderAr="قياس نقطة الخصر"
                />
              </div>

              {/* Row 4: Nipple to Nipple & Arm Round */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="nippleToNipple"
                  label="Nipple to Nipple"
                  labelAr="التباعد بين النهدين"
                  placeholder="Enter measurement"
                  placeholderAr="قياس التباعد"
                />
                <InputField
                  field="armRound"
                  label="Arm Round"
                  labelAr="دوران اليد"
                  placeholder="Enter measurement"
                  placeholderAr="قياس دوران اليد"
                />
              </div>

              {/* Row 5: Wrist & Arm Hole */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="wrist"
                  label="Wrist"
                  labelAr="دوران الرسغ"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الرسغ"
                />
                <InputField
                  field="armHole"
                  label="Arm Hole"
                  labelAr="طول اليد"
                  placeholder="Enter measurement"
                  placeholderAr="قياس طول اليد"
                />
              </div>

              {/* Row 6: Sleeve Length & Full Length */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="sleeveLength"
                  label="Sleeve Length"
                  labelAr="طول الكم"
                  placeholder="Enter measurement"
                  placeholderAr="قياس طول الكم"
                />
                <InputField
                  field="fullLength"
                  label="Full Length"
                  labelAr="الطول الكامل"
                  placeholder="Enter measurement"
                  placeholderAr="قياس الطول الكامل"
                />
              </div>

              {/* Row 7: Full Tail Length (single field centered) */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  field="fullTailLength"
                  label="Full Tail Length"
                  labelAr="طول الذيل الكامل"
                  placeholder="Enter measurement"
                  placeholderAr="قياس طول الذيل"
                />
                <div></div> {/* Empty div for spacing */}
              </div>

              {/* Additional Notes - Full Width */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : 'font-english text-left'}`}>
                  {language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none hover:border-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Please write any additional notes clearly...' : 'لأي ملاحظات أخرى يرجى كتابتها بوضوح...'}
                />
              </div>
              <div className='pb-20'>

 <button
            onClick={handleSave}
            className={`w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3.5 px-6 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isRTL ? 'font-arabic' : 'font-english'}`}
          >
            {language === 'en' ? 'Save Measurements' : 'حفظ القياسات'}
          </button>
              </div>
                        
              {/* Size Recommendation Card */}
              {/*div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl">
                <h3 className={`font-semibold text-gray-900 mb-3 flex items-center gap-2 ${isRTL ? 'font-arabic text-right flex-row-reverse' : 'font-english'}`}>
                  <Ruler className="w-5 h-5 text-blue-600" />
                  {language === 'en' ? 'Recommended Size' : 'المقاس المُوصى به'}
                </h3>
                <p className={`text-gray-600 text-sm ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' 
                    ? 'Fill in your measurements to get a personalized size recommendation'
                    : 'املأ قياساتك للحصول على توصية المقاس المخصصة لك'
                  }
                </p>
                {/* Progress indicator could go here 
                <div className="mt-3 w-3/4 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>

        {/* Footer 
        <div className="pl-6 pr-6 pt-1 pb-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">

        </div>*/}
      </div>
    </div>
  );
};

export default SizeGuideSidepanel;