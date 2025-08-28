import type { Category, Product } from "../types/product";
import axios from "axios";
export async function loadCategory(categoryID:string) {
  console.log(categoryID)
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/main/category",
        params:{
        categoryID:categoryID
      }
    });
    //let products = response.data;
    console.log(response.data)
    let category: Category;
    category =  {
    id: response.data._id,
    name_english: response.data.name_english,
    name_arabic: response.data.name_arabic,
    products:response.data.products,
    
  };
   
    console.log(category)
    return category; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export async function loadProduct(productID:string) {
  
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/main/product",
        params:{
        productID:productID
      }
    });
    //let products = response.data;
    //console.log(response.data)
    let product: Product;
    product =  {
    id: response.data._id,
    name_english: response.data.name_english,
    name_arabic: response.data.name_arabic,
    price: response.data.price,
    image: response.data.colors[0].images[0],
    hoverImage: response.data.colors[0].images[1],
    category_english: response.data.categoryName_english,
    category_arabic:response.data.categoryName_arabic,
    collection: "",
     category:response.data.category,
    description_english: response.data.description_english,
    description_arabic: response.data.description_arabic,
    sizes: response.data.sizes,
    available: response.data.quantities.map((q: number) => q > 0),
    colors: response.data.colors,
    inStock: (response.data.quantity>0)? true:false,
    rating: 4.8,
    reviews: 124
  };
   
    console.log(product)
    return product; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export async function loadProducts(categoryID:string) {
  
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/main/product/category",
        params:{
        categoryID:categoryID
      }
    });
    //let products = response.data;
    let products: Product[] = [];
    response.data.forEach(prod => {
      products.push(
       {
    id: prod._id,
    name_english: prod.name_english,
    name_arabic: prod.name_arabic,
    price: prod.price,
    image: prod.colors[0].images[0],
    hoverImage: prod.colors[0].images[1],
    category_english: prod.categoryName_english,
    category_arabic:prod.categoryName_arabic,
    collection: "",
    category:prod.category,
    description_english: prod.description_english,
    description_arabic: prod.description_arabic,
    sizes: prod.sizes,
    available: prod.quantities.map((q: number) => q > 0),
    colors: prod.colors,
    inStock: (prod.quantity>0)? true:false,
    rating: 4.8,
    reviews: 124
  }
      )
      
    });
    console.log(products)
    return products; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export async function loadProductsByCategoryName(categoryName:string) {
  
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/main/product/categoryname",
        params:{
        categoryName:categoryName
      }
    });
    //let products = response.data;
    let products: Product[] = [];
    response.data.forEach(prod => {
      products.push(
       {
    id: prod._id,
    name_english: prod.name_english,
    name_arabic: prod.name_arabic,
    price: prod.price,
    image: prod.colors[0].images[0],
    hoverImage: prod.colors[0].images[1],
    category_english: prod.categoryName_english,
    category_arabic:prod.categoryName_arabic,
    collection: "",
    category:prod.category,
    description_english: prod.description_english,
    description_arabic: prod.description_arabic,
    sizes: prod.sizes,
    available: prod.quantities.map((q: number) => q > 0),
    colors: prod.colors,
    inStock: (prod.quantity>0)? true:false,
    rating: 4.8,
    reviews: 124
  }
      )
      
    });
    console.log(products)
    return products; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export async function loadAllProducts() {
  
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/admin/product/list",
       
    });
    //let products = response.data;
    console.log(response.data)
    let products: Product[] = [];
    response.data.forEach(prod => {
      products.push(
       {
    id: prod._id,
    name_english: prod.name_english,
    name_arabic: prod.name_arabic,
    price: prod.price,
    image: prod.colors[0].images[0],
    hoverImage: prod.colors[0].images[1],
    category_english: prod.categoryName_english,
    category_arabic:prod.categoryName_arabic,
    collection: "",
    category:prod.category,
    description_english: prod.description_english,
    description_arabic: prod.description_arabic,
    sizes: prod.sizes,
    available: prod.quantities.map((q: number) => q > 0),
    colors: prod.colors,
    inStock: (prod.quantity>0)? true:false,
    rating: 4.8,
    reviews: 124
  }
      )
      
    });
    console.log(products)
    return products; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export async function loadCategories() {
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/admin/product/category/list",
    });

    const categories: Category[] = response.data
      .filter((cat: any) => cat.name_english !== "Jalabiyas")
      .map((cat: any) => ({
        id: cat._id,
        name_english: cat.name_english,
        name_arabic: cat.name_arabic,
        image: cat.image,
        image_id: cat.image_id,
        products: cat.products,
      }));

    console.log(categories);
    return categories;
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}
// Assuming ProductColor interface is defined elsewhere as:
// export interface ProductColor {
//   _id?: string;
//   color: string;
//   colorDeg: string;
//   images: string[];
//   images_ids: string[];
// }

export const products: Product[] = [
  {
    id: "1",
    name_english: "Elegant Summer Dress",
    name_arabic: "فستان صيفي أنيق",
    price: 189,
    image: "/p11.jpeg",
    hoverImage: "/p12.jpeg",
    category_english: "Dresses",
    category_arabic: "فساتين",
    collection: "",
    description_english: "A flowing summer dress perfect for warm days.",
    description_arabic: "فستان صيفي متدفق مثالي للأيام الدافئة.",
    category: "",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: [true, true, true, true, true],
    colors: [{
      _id: "1",
      color: "Sage Green",
      colorDeg: "#a4ad98",
      images: ['/p12.jpeg', '/p11.jpeg'],
      images_ids: ['p12', 'p11']
    }],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name_english: "Breathable Linen Shirt",
    name_arabic: "قميص كتان قابل للتنفس",
    price: 95,
    image: "/p22.jpeg",
    hoverImage: "/p23.jpeg",
    category_english: "Dresses",
    category_arabic: "فساتين",
    collection: "summer",
    description_english: "Breathable linen shirt for casual occasions.",
    description_arabic: "قميص كتان قابل للتنفس للمناسبات غير الرسمية.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-2",
      color: "Terracotta",
      colorDeg: "#e44823",
      images: ['/p22.jpeg', '/p23.jpeg', '/p21.jpeg'],
      images_ids: ['p22', 'p23', 'p21']
    }],
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name_english: "Luxurious Wool Coat",
    name_arabic: "معطف صوف فاخر",
    price: 450,
    image: "/p33.jpeg",
    hoverImage: "/p31.jpeg",
    category_english: "Dresses",
    category_arabic: "فساتين",
    collection: "winter",
    description_english: "Luxurious wool coat for cold weather.",
    description_arabic: "معطف صوف فاخر للطقس البارد.",
    category: "",
    sizes: ["XS", "S", "M", "L"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-3",
      color: "Maroon",
      colorDeg: "#842f51",
      images: ['/p33.jpeg', '/p31.jpeg', '/p32.jpeg'],
      images_ids: ['p33', 'p31', 'p32']
    }],
    inStock: true,
    rating: 4.9,
    reviews: 76,
  },
  {
    id: "4",
    name_english: "Soft Cashmere Sweater",
    name_arabic: "سترة من الكشمير الناعم",
    price: 280,
    image: "/p43.jpeg",
    hoverImage: "/p42.jpeg",
    category_english: "Dresses",
    category_arabic: "فساتين",
    collection: "winter",
    description_english: "Soft cashmere sweater for ultimate comfort.",
    description_arabic: "سترة من الكشمير الناعم لتوفير أقصى درجات الراحة.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-4",
      color: "Dusty Rose",
      colorDeg: "#b08183",
      images: ['/p43.jpeg', '/p42.jpeg', '/p41.jpeg'],
      images_ids: ['p43', 'p42', 'p41']
    }],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "5",
    name_english: "Delicate Floral Blouse",
    name_arabic: "بلوزة زهرية رقيقة",
    price: 120,
    image: "/p52.jpeg",
    hoverImage: "/p53.jpeg",
    category_english: "Tops",
    category_arabic: "قمصان",
    collection: "spring",
    description_english: "Delicate floral blouse for spring occasions.",
    description_arabic: "بلوزة زهرية رقيقة لمناسبات الربيع.",
    category: "",
    sizes: ["XS", "S", "M", "L"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-5",
      color: "Almond Cream",
      colorDeg: "#deccb4",
      images: ['/p52.jpeg', '/p53.jpeg', '/p51.jpeg'],
      images_ids: ['p52', 'p53', 'p51']
    }],
    inStock: true,
    rating: 4.5,
    reviews: 92,
  },
  {
    id: "6",
    name_english: "Layering Cardigan",
    name_arabic: "سترة للطبقات",
    price: 155,
    image: "/p63.jpeg",
    hoverImage: "/p62.jpeg",
    category_english: "Tops",
    category_arabic: "قمصان",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-6",
      color: "Lavender Gray",
      colorDeg: "#a2a0ab",
      images: ['/p63.jpeg', '/p62.jpeg', '/p61.jpeg'],
      images_ids: ['p63', 'p62', 'p61']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "7",
    name_english: "Satin Evening Top",
    name_arabic: "بلوزة سهرة من الساتان",
    price: 155,
    image: "/p71.jpeg",
    hoverImage: "/p73.jpeg",
    category_english: "Tops",
    category_arabic: "قمصان",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-7",
      color: "Russet",
      colorDeg: "#c96357",
      images: ['/p71.jpeg', '/p73.jpeg', '/p72.jpeg'],
      images_ids: ['p71', 'p73', 'p72']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "8",
    name_english: "Classic Cotton Tee",
    name_arabic: "تي شيرت قطني كلاسيكي",
    price: 155,
    image: "/p81.jpeg",
    hoverImage: "/p82.jpeg",
    category_english: "Tops",
    category_arabic: "قمصان",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-8",
      color: "Sandy Tan",
      colorDeg: "#cea790",
      images: ['/p81.jpeg', '/p82.jpeg', '/p83.jpeg'],
      images_ids: ['p81', 'p82', 'p83']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "9",
    name_english: "Knit V-Neck Sweater",
    name_arabic: "سترة تريكو بياقة V",
    price: 155,
    image: "/p91.jpeg",
    hoverImage: "/p92.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-9",
      color: "Seafoam Green",
      colorDeg: "#c4d4b8",
      images: ['/p91.jpeg', '/p92.jpeg', '/p93.jpeg'],
      images_ids: ['p91', 'p92', 'p93']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "10",
    name_english: "Turtleneck Pullover",
    name_arabic: "بلوفر بياقة عالية",
    price: 155,
    image: "/p101.jpeg",
    hoverImage: "/p103.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-10",
      color: "Buttercream",
      colorDeg: "#e9e0b7",
      images: ['/p101.jpeg', '/p103.jpeg', '/p102.jpeg'],
      images_ids: ['p101', 'p103', 'p102']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "11",
    name_english: "Ribbed Knit Top",
    name_arabic: "بلوزة تريكو مضلعة",
    price: 155,
    image: "/p111.jpeg",
    hoverImage: "/p112.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-11",
      color: "Ash Rose",
      colorDeg: "#9d767b",
      images: ['/p111.jpeg', '/p112.jpeg'],
      images_ids: ['p111', 'p112']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "12",
    name_english: "Cable-Knit Sweater",
    name_arabic: "سترة بنقشة الكابل",
    price: 155,
    image: "/p123.jpeg",
    hoverImage: "/p122.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-12",
      color: "Fuchsia",
      colorDeg: "#f74368",
      images: ['/p123.jpeg', '/p122.jpeg', '/p121.jpeg'],
      images_ids: ['p123', 'p122', 'p121']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "13",
    name_english: "Oversized Knit Cardigan",
    name_arabic: "سترة كارديغان واسعة",
    price: 155,
    image: "/p131.jpeg",
    hoverImage: "/p133.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-13",
      color: "Walnut Brown",
      colorDeg: "#704c32",
      images: ['/p131.jpeg', '/p133.jpeg', '/p132.jpeg'],
      images_ids: ['p131', 'p133', 'p132']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "14",
    name_english: "Lightweight Knit Polo",
    name_arabic: "بولو تريكو خفيف",
    price: 155,
    image: "/p142.jpeg",
    hoverImage: "/p143.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-14",
      color: "Muted Clay",
      colorDeg: "#d1aa99",
      images: ['/p142.jpeg', '/p143.jpeg', '/p141.jpeg'],
      images_ids: ['p142', 'p143', 'p141']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "15",
    name_english: "Cropped Knit Vest",
    name_arabic: "سترة تريكو قصيرة",
    price: 155,
    image: "/p153.jpeg",
    hoverImage: "/p152.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-15",
      color: "Orchid Haze",
      colorDeg: "#ce96b2",
      images: ['/p152.jpeg', '/p153.jpeg', '/p151.jpeg'],
      images_ids: ['p152', 'p153', 'p151']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "16",
    name_english: "Mock Neck Sweater",
    name_arabic: "سترة بياقة مرتفعة",
    price: 155,
    image: "/p162.jpeg",
    hoverImage: "/p163.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-16",
      color: "Royal Orchid",
      colorDeg: "#9c5392",
      images: ['/p163.jpeg', '/p162.jpeg', '/p161.jpeg'],
      images_ids: ['p163', 'p162', 'p161']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "17",
    name_english: "Fine-Knit Top",
    name_arabic: "بلوزة تريكو ناعمة",
    price: 155,
    image: "/p171.jpeg",
    hoverImage: "/p172.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-17",
      color: "Jet Black",
      colorDeg: "#11110f",
      images: ['/p171.jpeg', '/p172.jpeg', '/p173.jpeg'],
      images_ids: ['p171', 'p172', 'p173']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "18",
    name_english: "Chunky Knit Scarf",
    name_arabic: "وشاح تريكو سميك",
    price: 155,
    image: "/p181.jpeg",
    hoverImage: "/p183.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-18",
      color: "Burgundy",
      colorDeg: "#8d181a",
      images: ['/p181.jpeg', '/p183.jpeg', '/p182.jpeg'],
      images_ids: ['p181', 'p183', 'p182']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "19",
    name_english: "Wool-Blend Beanie",
    name_arabic: "قبعة من مزيج الصوف",
    price: 155,
    image: "/p193.jpeg",
    hoverImage: "/p192.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-19",
      color: "Vanilla Cream",
      colorDeg: "#f5e7c1",
      images: ['/p193.jpeg', '/p192.jpeg', '/p191.jpeg'],
      images_ids: ['p193', 'p192', 'p191']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "20",
    name_english: "Longline Cardigan",
    name_arabic: "سترة كارديغان طويلة",
    price: 155,
    image: "/p201.jpeg",
    hoverImage: "/p202.jpeg",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather.",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي.",
    category: "",
    sizes: ["S", "M", "L", "XL"],
    available: [true, true, true, true],
    colors: [{
      _id: "color-20",
      color: "Dusty Teal",
      colorDeg: "#88bab9",
      images: ['/p201.jpeg', '/p202.jpeg', '/p203.jpeg'],
      images_ids: ['p201', 'p202', 'p203']
    }],
    inStock: true,
    rating: 4.4,
    reviews: 67,
  }
];

export const categories2: Category[] = [
  {
    id: "1",
    name_english: "Dresses",
    name_arabic: "فساتين",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
   // description: "A flowing summer dress perfect for warm days",
    products:products
  },
   {
    id: "2",
    name_english: "Shirts",
    name_arabic: "قمصان",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
    //description: "A flowing summer dress perfect for warm days",
    products:products
  },
   {
    id: "3",
    name_english: "Pants",
    name_arabic: "سراويل",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
    //description: "A flowing summer dress perfect for warm days",
    products:products
  },
   {
    id: "4",
    name_english: "Jumpsuits",
    name_arabic: "بدلات",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
    //description: "A flowing summer dress perfect for warm days",
    products:products
  },
    {
    id: "5",
    name_english: "Skirts",
    name_arabic:"تنانير",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
    //description: "A flowing summer dress perfect for warm days",
    products:products
  },
    {
    id: "6",
    name_english: "Bags",
    name_arabic:"حقائب",
   // image: "/p13.jpeg",
   // hoverImage: "/p93.jpeg",
    //description: "A flowing summer dress perfect for warm days",
    products:products
  },
   {
    id: "7",
    name_english: "Jalabiyas",
    name_arabic: "جلابيات",
    //image: "/p13.jpeg",
    //hoverImage: "/p93.jpeg",
   // description: "A flowing summer dress perfect for warm days",
    products:products
  }
];











/*
export const products: Product[] = [
  {
    id: "1",
    name_english: "Elegant Summer Dress",
    name_arabic: "فستان صيفي أنيق",
    price: 189,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Dresses",
    category_arabic:"فساتين",
    collection: "summer",
    description_english: "A flowing summer dress perfect for warm days",
    description_arabic: "فستان صيفي متدفق مثالي للأيام الدافئة",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "White", "Pink"],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name_english: "Casual Linen Shirt",
    name_arabic: "قميص كتان كاجوال",
    price: 95,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Tops",
    category_arabic: "قمصان",
    collection: "summer",
    description_english: "Breathable linen shirt for casual occasions",
    description_arabic: "قميص كتان قابل للتنفس للمناسبات غير الرسمية",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Blue"],
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: "3",
    name_english: "Premium Wool Coat",
    name_arabic: "معطف من الصوف الفاخر",
    price: 450,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Outerwear",
    category_arabic: "ملابس خارجية",
    collection: "winter",
    description_english: "Luxurious wool coat for cold weather",
    description_arabic: "معطف صوف فاخر للطقس البارد",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Camel", "Navy"],
    inStock: true,
    rating: 4.9,
    reviews: 76
  },
  {
    id: "4",
    name_english: "Cashmere Sweater",
    name_arabic: "سترة من الكشمير",
    price: 280,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "winter",
    description_english: "Soft cashmere sweater for ultimate comfort",
    description_arabic: "سترة من الكشمير الناعم لتوفير أقصى درجات الراحة",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Burgundy"],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: "5",
    name_english: "Spring Floral Blouse",
    name_arabic: "بلوزة زهور الربيع",
    price: 120,
    image: "https://images.unsplash.com/photo-1551048632-1ad3de5f94da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Tops",
     category_arabic: "قمصان",
    collection: "spring",
    description_english: "Delicate floral blouse for spring occasions",
    description_arabic: "بلوزة زهرية رقيقة لمناسبات الربيع",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Pink", "Floral Blue", "White"],
    inStock: true,
    rating: 4.5,
    reviews: 92
  },
  {
    id: "6",
    name_english: "Lightweight Cardigan",
    name_arabic: "سترة خفيفة الوزن",
    price: 155,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category_english: "Knitwear",
    category_arabic: "تريكو",
    collection: "spring",
    description_english: "Perfect layering piece for transitional weather",
    description_arabic: "قطعة طبقات مثالية للطقس الانتقالي",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mint", "Lavender", "Peach"],
    inStock: true,
    rating: 4.4,
    reviews: 67
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name_english: "Dresses",
    name_arabic: "فساتين",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "A flowing summer dress perfect for warm days",
    products:products
  },
  {
       id: "2",
    name_english: "T-Shirts",
    name_arabic: "قمصان",
    image: "https://unsplash.com/photos/assorted-clothes-hanged-on-rack-3JAOcgZ_ZXU",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
  {
       id: "3",
    name_english: "Pants",
    name_arabic: "سراويل",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
  {
       id: "4",
    name_english: "Jackets",
    name_arabic: "معاطف",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
  {
    id: "5",
    name_english: "Blouses",
    name_arabic:"بلوز",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
  {
       id: "6",
    name_english: "Skirts",
    name_arabic: "أحذية",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
   {
       id: "7",
    name_english:  "Hoodies",
     name_arabic:  "هوديس",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
     {
       id: "8",
    name_english: "Shorts",
    name_arabic: "شورتات",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
   {
       id: "9",
    name_english:  "Jeans",
    name_arabic:  "حنزات",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
     {
       id: "10",
    name_english:  "Sweaters",
    name_arabic:  "البلوزات",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566479179817-7bc2e91f1e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "",
    products:products
  },
];

*/