import React, { useState } from 'react';
import { toast } from "../hooks/use-toast";
// Floating Label Input Field Component
// This is the same InputField component you provided.
const InputField = ({ field, label, labelAr, value, onchange, language = "en" }) => {
  return (
    <div className="relative z-0">
      <input 
        style={{
          border: '0',
          borderBottom: '2px solid #d1d5db',
          outline: 'none'
        }}
        type="text" 
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        id={field}
        value={value}
        onChange={onchange}
      />
      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 bottom-0 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
        {language === "en" ? label : labelAr}
      </label>
    </div>
  );
};

// Modified SizeGuideSidepanel Component
// It no longer controls its own positioning and is now a simple form container.
const SizeGuideSidepanel = ({ 
  onClose,
  language = 'en', 
  isRTL = false,
  onSave, 
}) => {
  const [formData, setFormData] = useState({
    bust: '', waist: '', hips: '', shoulders: '', bustPoint: '', waistPoint: '',
    nippleToNipple: '', armRound: '', wrist: '', armHole: '', sleeveLength: '',
    fullLength: '', fullTailLength: '', additionalNotes: ''
  });

  const handleNumericChange = (field) => (e) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setFormData(prev => ({ ...prev, [field]: inputValue }));
    }
  };
  
  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    // Basic validation
    const requiredFields = ['bust', 'waist', 'hips', 'shoulders', 'bustPoint', 'waistPoint', 'nippleToNipple', 'armRound', 'wrist', 'armHole', 'sleeveLength', 'fullLength', 'fullTailLength'];
    const isMissing = requiredFields.some(field => !formData[field]);

    if (isMissing) {
      toast({
        title: language === 'en' ? "Custom Size" : "المقاس المخصص",
        description: language === 'en' ? "Please fill in all measurements" : "يرجى ملء جميع القياسات"
      });
      return;
    }
    
    // Convert to numbers before saving
    const numericData = Object.keys(formData).reduce((acc, key) => {
        if (key !== 'additionalNotes') {
            acc[key] = parseFloat(formData[key]) || 0;
        } else {
            acc[key] = formData[key];
        }
        return acc;
    }, {});
    
    onSave(numericData);
    onClose();
  };

  return (
    <aside className="w-96 flex-shrink-0 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="pb-2 flex-shrink-0">
          <button onClick={onClose} className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ fontSize: '13px', fontWeight: '500', color: '#100f0d' }}>
            <span style={{ transform: 'rotate(90deg)' }}>
              <svg width="10" height="10" viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path></svg>
            </span>
            <span className="animation-underline">{language === 'en' ? 'Size Guide' : 'دليل المقاسات'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Input fields... */}
            <div className="grid grid-cols-2 gap-6">
              <InputField field="bust" label="Bust" labelAr="صدر" value={formData.bust} onchange={handleNumericChange("bust")} language={language} />
              <InputField field="waist" label="Waist" labelAr="خصر" value={formData.waist} onchange={handleNumericChange("waist")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="hips" label="Hips" labelAr="أرداف" value={formData.hips} onchange={handleNumericChange("hips")} language={language} />
              <InputField field="shoulders" label="Shoulders" labelAr="اكتاف" value={formData.shoulders} onchange={handleNumericChange("shoulders")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="bustPoint" label="Bust Point" labelAr="نقطة الصدر" value={formData.bustPoint} onchange={handleNumericChange("bustPoint")} language={language} />
              <InputField field="waistPoint" label="Waist Point" labelAr="نقطة الخصر" value={formData.waistPoint} onchange={handleNumericChange("waistPoint")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="nippleToNipple" label="Nipple to Nipple" labelAr="التباعد بين النهدين" value={formData.nippleToNipple} onchange={handleNumericChange("nippleToNipple")} language={language} />
              <InputField field="armRound" label="Arm Round" labelAr="دوران اليد" value={formData.armRound} onchange={handleNumericChange("armRound")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="wrist" label="Wrist" labelAr="دوران الرسغ" value={formData.wrist} onchange={handleNumericChange("wrist")} language={language} />
              <InputField field="armHole" label="Arm Hole" labelAr="طول اليد" value={formData.armHole} onchange={handleNumericChange("armHole")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="sleeveLength" label="Sleeve Length" labelAr="طول الكم" value={formData.sleeveLength} onchange={handleNumericChange("sleeveLength")} language={language} />
              <InputField field="fullLength" label="Full Length" labelAr="الطول الكامل" value={formData.fullLength} onchange={handleNumericChange("fullLength")} language={language} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField field="fullTailLength" label="Full Tail Length" labelAr="طول الذيل الكامل" value={formData.fullTailLength} onchange={handleNumericChange("fullTailLength")} language={language} />
              <div></div>
            </div>
            
            {/* Additional Notes */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : 'font-english text-left'}`}>{language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}</label>
              <textarea 
              value={formData.additionalNotes} onChange={handleInputChange('additionalNotes')} rows={4} className={`w-full px-3 py-2.5 ${isRTL ? 'text-right' : 'text-left'}`} style={{ "border": "1px solid #d1d1d0", "borderRadius": "3px" ,outline:'none'}} placeholder={language === 'en' ? 'Please write any additional notes clearly...' : 'لأي ملاحظات أخرى يرجى كتابتها بوضوح...'} />
            </div>
                     <div className="absolute right-0 p-3 flex-shrink-0">
          <button onClick={handleSave} className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ fontSize: '13px', fontWeight: '500', color: '#100f0d' }}>
                       <span className="animation-underline">{language === 'en' ? 'Save & Return to product' : 'حفظ وعودة إلى المنتج'}</span>
            <span style={{ transform: 'rotate(270deg)' }}>
              <svg width="10" height="10" viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path></svg>
            </span>
          </button>
        </div>
            {/* Save Button */}
            {/*<div className="pt-4">
              <button onClick={handleSave} className={`w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3.5 px-6 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' ? 'Save Measurements' : 'حفظ القياسات'}
              </button>
            </div>*/}
          </div>
        </div>
      </div>
    </aside>
  );
};


export default SizeGuideSidepanel;