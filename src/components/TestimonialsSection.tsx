
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

 const testimonials1 = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      text: "Absolutely love the quality and attention to detail. Every piece I've purchased has become a staple in my wardrobe.",
      product: "Summer Dress Collection"
    },
    {
      id: 2,
      name: "Emily Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "The exclusive designs are truly unique. I always receive compliments when wearing pieces from this collection.",
      product: "Winter Coat"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "Exceptional customer service and fast shipping. The materials are luxurious and the fit is perfect.",
      product: "Spring Blouse"
    }
  ]
   const testimonials2 =  [
    {
      id: 1,
      name: "سارة محمد",
      location: "دبي، الإمارات العربية المتحدة",
      rating: 5,
      text: "أعشق الجودة والاهتمام بالتفاصيل. كل قطعة اشتريتها أصبحت قطعة أساسية في خزانة ملابسي.",
      product: "مجموعة فساتين الصيف"
    },
    {
      id: 2,
      name: "ميرا جاسم",
      location: "الرياض، المملكة العربية السعودية",
      rating: 5,
      text: "التصاميم الحصرية فريدةٌ حقًا. أتلقى دائمًا إطراءاتٍ عند ارتداء قطعٍ من هذه المجموعة.",
      product: "معطف الشتاء"
    },
    {
      id: 3,
      name: "مريم ياسر",
      location: "أبو ظبي، الإمارات العربيى المتحدة",
      rating: 5,
      text: "خدمة عملاء استثنائية وشحن سريع. الخامات فاخرة والمقاس مثالي.",
      product: "بلوزة الربيع"
    }
  ]
  

  
  const TestimonialsSection = () => {
    const {language,isRTL} = useLanguage()
    const {t} = useTranslation()
    let testimonials;
    if (language=="en") {
      testimonials = testimonials1;
    }
    else {
       testimonials = testimonials2;
    }
    return (
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-english'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("testimonialsTitle")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("testimonialsDescription")}
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`bg-white p-6 rounded-lg shadow-sm ${isRTL ? 'font-arabic' : 'font-english'}`}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-blue-600 mt-1">{t("testimonialsTerm")} {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;