import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const SizeGuideSidepanel = ({ 
  isOpen, 
  onClose, 
  language, 
  isRTL,
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
  console.log(bounds.right)
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay - only covers the specific section */}
      <div 
        className="absolute bg-black bg-opacity-50 transition-opacity pointer-events-auto"
        style={{
          //top: bounds.top || 0,
          left: bounds.left || 0,
          width: bounds.width+bounds.right/10 || '100%',
          height: bounds.height || '100%'
        }}
        onClick={onClose}
      />
      
      {/* Sidepanel - slides from right edge to fill the section */}
      <div 
        className={`absolute bg-white shadow-xl transform transition-transform duration-300 ease-in-out pointer-events-auto`}
        style={{
         // top: bounds.top || 0,
          left: bounds.left || 0, // Start from section's left edge
          width: bounds.width+bounds.right/10 || '100%',
          height: bounds.height || '100%',
          transform: isOpen ? 'translateX(0)' : `translateX(${isRTL ? '-100%' : '100%'})`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={onClose}
            className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className={`${isRTL ? 'font-arabic' : 'font-english'}`}>
              {language === 'en' ? 'Return to Product' : 'العودة إلى المنتج'}
            </span>
          </button>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-6 pl-6 pt-2 pb-1">
          <div className="space-y-2">
            {/*<div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className={`text-2xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' ? 'Size Guide' : 'دليل المقاسات'}
              </h2>
              <p className={`text-gray-600 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Enter your measurements to find the perfect fit'
                  : 'أدخل قياساتك للعثور على المقاس المثالي'
                }
              </p>
              <p className={`text-sm text-gray-500 mt-1 ${isRTL ? 'font-arabic' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Note: All measurements are in inches'
                  : 'ملاحظة: المقاسات بالإنش'
                }
              </p>
            </div>*/}

            <div className="space-y-1">
              {/* Bust */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Bust' : 'صدر'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bust}
                  onChange={(e) => handleInputChange('bust', e.target.value)}
                  className={`px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter bust measurement' : 'أدخل قياس الصدر'}
                  required
                />
              </div>

              {/* Waist */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Waist' : 'خصر'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter waist measurement' : 'أدخل قياس الخصر'}
                  required
                />
              </div>

              {/* Hips */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Hips' : 'أرداف'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.hips}
                  onChange={(e) => handleInputChange('hips', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter hips measurement' : 'أدخل قياس الأرداف'}
                  required
                />
              </div>

              {/* Shoulders */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Shoulders' : 'اكتاف'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.shoulders}
                  onChange={(e) => handleInputChange('shoulders', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter shoulders measurement' : 'أدخل قياس الاكتاف'}
                  required
                />
              </div>

              {/* Bust Point */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Bust Point' : 'نقطة الصدر'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bustPoint}
                  onChange={(e) => handleInputChange('bustPoint', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter bust point measurement' : 'أدخل قياس نقطة الصدر'}
                  required
                />
              </div>

              {/* Waist Point */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Waist Point' : 'نقطة الخصر'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.waistPoint}
                  onChange={(e) => handleInputChange('waistPoint', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter waist point measurement' : 'أدخل قياس نقطة الخصر'}
                  required
                />
              </div>

              {/* Nipple to Nipple */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Nipple to Nipple' : 'التباعد بين النهدين'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nippleToNipple}
                  onChange={(e) => handleInputChange('nippleToNipple', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter nipple to nipple measurement' : 'أدخل قياس التباعد بين النهدين'}
                  required
                />
              </div>

              {/* Arm Round */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Arm Round' : 'دوران اليد'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.armRound}
                  onChange={(e) => handleInputChange('armRound', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter arm round measurement' : 'أدخل قياس دوران اليد'}
                  required
                />
              </div>

              {/* Wrist */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Wrist' : 'دوران الرسغ'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.wrist}
                  onChange={(e) => handleInputChange('wrist', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter wrist measurement' : 'أدخل قياس دوران الرسغ'}
                  required
                />
              </div>

              {/* Arm Hole */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Arm Hole' : 'طول اليد'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.armHole}
                  onChange={(e) => handleInputChange('armHole', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter arm hole measurement' : 'أدخل قياس طول اليد'}
                  required
                />
              </div>

              {/* Sleeve Length */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Sleeve Length' : 'طول الكم'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sleeveLength}
                  onChange={(e) => handleInputChange('sleeveLength', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter sleeve length measurement' : 'أدخل قياس طول الكم'}
                  required
                />
              </div>

              {/* Full Length */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Full Length' : 'الطول الكامل'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fullLength}
                  onChange={(e) => handleInputChange('fullLength', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter full length measurement' : 'أدخل قياس الطول الكامل'}
                  required
                />
              </div>

              {/* Full Tail Length */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Full Tail Length' : 'طول الذيل الكامل'} <span className="text-red-500">*</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fullTailLength}
                  onChange={(e) => handleInputChange('fullTailLength', e.target.value)}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Enter full tail length measurement' : 'أدخل قياس طول الذيل الكامل'}
                  required
                />
              </div>

              {/* Additional Notes - Optional */}
              <div>
                <div className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                  {language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}
                </div>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={language === 'en' ? 'Please write any additional notes clearly' : 'لأي ملاحظات أخرى يرجى كتابتها بوضوح'}
                />
              </div>
            </div>

            {/* Size Recommendation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className={`font-medium text-gray-900 mb-2 ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                {language === 'en' ? 'Recommended Size' : 'المقاس المُوصى به'}
              </h3>
              <p className={`text-gray-600 text-sm ${isRTL ? 'font-arabic text-right' : 'font-english'}`}>
                {language === 'en' 
                  ? 'Fill in your measurements to get a size recommendation'
                  : 'املأ قياساتك للحصول على توصية المقاس'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <button
            onClick={handleSave}
            className={`w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium ${isRTL ? 'font-arabic' : 'font-english'}`}
          >
            {language === 'en' ? 'Save' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideSidepanel;