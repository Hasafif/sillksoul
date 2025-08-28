export interface ProductColor {
  _id?: string; // ID of the color variant itself
  color: string; // The name, e.g., "Sky Blue"
  colorDeg: string; // The hex code, e.g., "#87CEEB"
  images: string[]; // Array of image URLs for this color
  images_ids: string[]; // Array of Cloudinary IDs
}
export interface Product {
    id: string;
    name_english: string;
    name_arabic: string;
    price: number;
    image: string;
    hoverImage: string;
    category_english: string;
    category_arabic: string;
    collection: string;
   description_english: string;
   description_arabic: string;
   category:string;
    sizes: string[];
    available:boolean[];
    colors: ProductColor[]; // REPLACED old image and color fields
    inStock: boolean;
    rating: number;
    reviews: number;
  }
  export interface Category {
    id: string;
    name_english: string;
    name_arabic: string;
    image?: string,
    image_id?: string,
    //image: string;
    //hoverImage: string;
    //description: string;
    products: Product[]
  }
  export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: ProductColor;
  customSizeData?: any;
}