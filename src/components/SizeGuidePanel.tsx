import React, { useState } from 'react';
import { toast } from "../hooks/use-toast";

// Floating Label Textarea Field Component (No changes)
const TextareaField = ({ field, label, labelAr, value, onchange, language = "en", rows = 2 }) => {
  const isRTL = language === 'ar';
  return (
    <div className="relative">
      <textarea
            style={{
            border: '2px solid #d1d5db',
            outline: 'none',
        }}
        id={field}
        value={value}
        onChange={onchange}
        rows={rows}
        className="block px-2.5 pb-3 pt-5 w-full text-sm text-black bg-transparent rounded-lg border border-gray-300 appearance-none resize-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={field}
        className={`absolute text-sm text-black duration-300 transform -translate-y-7 scale-75 top-5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 ${isRTL ? 'right-2' : 'left-1'}`}
      >
        {language === "en" ? label : labelAr}
      </label>
    </div>
  );
};

// InputField Component (No changes)
const InputField = ({ field, label, labelAr, value, onchange, language = "en" }) => {
  return (
    <div className="relative z-0">
      <input 
        style={{
          border: '0',
          borderBottom: '2px solid #d1d5db',
          outline: 'none',
        }}
        type="text" 
        className="block pt-2 pb-0 px-0 w-full text-sm text-black bg-transparent appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" " 
        id={field}
        value={value}
        onChange={onchange}
      />
      <label className="absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 bottom-1 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
        {language === "en" ? label : labelAr}
      </label>
    </div>
  );
};

// MODIFIED: SizeGuideSidepanel Component
const SizeGuideSidepanel = ({
  onClose,
  language = 'en',
  isRTL = false,
  onSave,
  isMobile = false,
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
    const requiredFields = ['bust', 'waist', 'hips', 'shoulders', 'bustPoint', 'waistPoint', 'nippleToNipple', 'armRound', 'wrist', 'armHole', 'sleeveLength', 'fullLength', 'fullTailLength'];
    const isMissing = requiredFields.some(field => !formData[field]);

    if (isMissing) {
      toast({
        title: language === 'en' ? "Custom Size" : "المقاس المخصص",
        description: language === 'en' ? "Please fill in all measurements" : "يرجى ملء جميع القياسات"
      });
      return;
    }
    
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

  const fields = [
    { name: "bust", label: "Bust", labelAr: "صدر" },
    { name: "waist", label: "Waist", labelAr: "خصر" },
    { name: "hips", label: "Hips", labelAr: "أرداف" },
    { name: "shoulders", label: "Shoulders", labelAr: "اكتاف" },
    { name: "bustPoint", label: "Bust Point", labelAr: "نقطة الصدر" },
    { name: "waistPoint", label: "Waist Point", labelAr: "نقطة الخصر" },
    { name: "nippleToNipple", label: "Nipple to Nipple", labelAr: "التباعد بين النهدين" },
    { name: "armRound", label: "Arm Round", labelAr: "دوران اليد" },
    { name: "wrist", label: "Wrist", labelAr: "دوران الرسغ" },
    { name: "armHole", label: "Arm Hole", labelAr: "طول اليد" },
    { name: "sleeveLength", label: "Sleeve Length", labelAr: "طول الكم" },
    { name: "fullLength", label: "Full Length", labelAr: "الطول الكامل" },
    { name: "fullTailLength", label: "Full Tail Length", labelAr: "طول الذيل الكامل" },
  ];

  return (
    // Responsive container: full-screen on mobile, fixed-width on desktop
    <aside className={`${isMobile ? 'w-full h-full' : 'w-96 border-r border-gray-200'} flex-shrink-0 bg-white`}>
      <div className="flex flex-col h-full">

        {/* MODIFIED: Header is now the same for mobile and desktop 
pb-2 flex-shrink-0
*/}
        <div className={`flex-shrink-0 ${isMobile?(isRTL?'pr-8':'p-4'):'pb-4'} border-b border-gray-200`}>
          <button onClick={onClose} className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ fontSize: '13px', fontWeight: '500', color: '#100f0d' }}>
            <span style={{ transform: 'rotate(90deg)' }}>
              <svg width="10" height="10" viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path></svg>
            </span>
            <span className="animation-underline">{language === 'en' ? ' Custom Size' : 'مقاس مخصص'}</span>
          </button>
        </div>

        {/* Scrollable content with responsive grid */}
        <div className={`flex-1 overflow-y-auto p-4 ${isMobile?'pl-8 pr-8':''}`}>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-x-6 ${isMobile?'gap-y-8':'gap-y-10'}`}>
            {fields.map(field => (
              <InputField
                key={field.name}
                field={field.name}
                label={field.label}
                labelAr={field.labelAr}
                value={formData[field.name]}
                onchange={handleNumericChange(field.name)}
                language={language}
              />
            ))}
          </div>

          <div className={`${isMobile?'mt-8':' mt-12'}`}>
            <TextareaField
              field="additionalNotes"
              label="Additional Notes (Optional)"
              labelAr="ملاحظات إضافية (اختياري)"
              value={formData.additionalNotes}
              onchange={handleInputChange('additionalNotes')}
              language={language}
            />
          </div>
        </div>
        
        {/* MODIFIED: Footer is now the same for mobile and desktop */}
        <div className={`flex-shrink-0 ${isMobile?'p-4':'pt-6'}  border-t border-gray-200`}>
           <div className="flex justify-center">
             <button onClick={handleSave} className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ fontSize: '13px', fontWeight: '500', color: '#100f0d' }}>
               <span className="animation-underline">{language === 'en' ? 'Save & Return to product' : 'حفظ وعودة إلى المنتج'}</span>
               <span style={{ transform: 'rotate(270deg)' }}>
                 <svg width="10" height="10" viewBox="0 0 10 6"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path></svg>
               </span>
             </button>
          </div>
        </div>
      </div>
    </aside>
  );
};


export default SizeGuideSidepanel;