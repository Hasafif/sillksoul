import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

// Floating Input Component using shadcn/ui
const FloatingInput = ({ 
  id,
  label, 
  value, 
  onChange, 
  type = "text",
  placeholder = "",
  className = "",
  isRTL = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" " // Important: single space to maintain input height
        className={`peer bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        {...props}
      />
      <Label
        htmlFor={id}
        className={`absolute transition-all duration-200 ease-in-out cursor-text ${
          isRTL ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
        } ${
          isFloating
            ? '-top-5 text-sm text-blue-500 scale-75'
            : 'top-3 text-base text-gray-500 scale-100'
        }`}
      >
        {label}
      </Label>
    </div>
  );
};

// Floating Textarea Component
const FloatingTextarea = ({ 
  id,
  label, 
  value, 
  onChange, 
  className = "",
  isRTL = false,
  rows = 4,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        rows={rows}
        className={`peer bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 resize-none ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        {...props}
      />
      <Label
        htmlFor={id}
        className={`absolute transition-all duration-200 ease-in-out cursor-text ${
          isRTL ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
        } ${
          isFloating
            ? '-top-5 text-sm text-blue-500 scale-75'
            : 'top-3 text-base text-gray-500 scale-100'
        }`}
      >
        {label}
      </Label>
    </div>
  );
};

// Demo Component
const FloatingInputDemo = () => {
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
    additionalNotes: ''
  });

  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleNumericChange = (field) => (e) => {
    const inputValue = e.target.value;
    // Allow only numeric values (including empty string and decimal points)
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: inputValue
      }));
    }
  };

  const fields = [
    { field: 'bust', label: 'Bust', labelAr: 'صدر', type: 'number' },
    { field: 'waist', label: 'Waist', labelAr: 'خصر', type: 'number' },
    { field: 'hips', label: 'Hips', labelAr: 'أرداف', type: 'number' },
    { field: 'shoulders', label: 'Shoulders', labelAr: 'اكتاف', type: 'number' },
    { field: 'bustPoint', label: 'Bust Point', labelAr: 'نقطة الصدر', type: 'number' },
    { field: 'waistPoint', label: 'Waist Point', labelAr: 'نقطة الخصر', type: 'number' },
    { field: 'nippleToNipple', label: 'Nipple to Nipple', labelAr: 'التباعد بين النهدين', type: 'number' },
    { field: 'armRound', label: 'Arm Round', labelAr: 'دوران اليد', type: 'number' },
    { field: 'wrist', label: 'Wrist', labelAr: 'دوران الرسغ', type: 'number' },
    { field: 'armHole', label: 'Arm Hole', labelAr: 'طول اليد', type: 'number' },
    { field: 'sleeveLength', label: 'Sleeve Length', labelAr: 'طول الكم', type: 'number' },
    { field: 'fullLength', label: 'Full Length', labelAr: 'الطول الكامل', type: 'number' },
    { field: 'fullTailLength', label: 'Full Tail Length', labelAr: 'طول الذيل الكامل', type: 'number' }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Language Toggle */}
        <div className="mb-6 flex justify-center">
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md transition-colors ${
                language === 'en' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                language === 'ar' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {language === 'en' ? 'Size Guide Form' : 'نموذج دليل المقاسات'}
        </h2>

        {/* Form Fields in Grid */}
        <div className="space-y-8">
          {/* Render fields in pairs */}
          {Array.from({ length: Math.ceil(fields.length / 2) }, (_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.slice(i * 2, i * 2 + 2).map(({ field, label, labelAr, type }) => (
                <FloatingInput
                  key={field}
                  id={field}
                  label={language === 'en' ? label : labelAr}
                  value={formData[field]}
                  onChange={type === 'number' ? handleNumericChange(field) : handleInputChange(field)}
                  type="text" // Always use text to maintain custom numeric validation
                  isRTL={isRTL}
                />
              ))}
            </div>
          ))}

          {/* Additional Notes */}
          <FloatingTextarea
            id="additionalNotes"
            label={language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}
            value={formData.additionalNotes}
            onChange={handleInputChange('additionalNotes')}
            isRTL={isRTL}
            rows={4}
          />

          {/* Save Button */}
          <div className="pt-4">
            <button 
              onClick={() => console.log('Form Data:', formData)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {language === 'en' ? 'Save Measurements' : 'حفظ القياسات'}
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Form Data (Debug):</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingInputDemo;