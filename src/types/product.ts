export interface Product {
    id: string;
    name_english: string;
    name_arabic: string;
    price: number;
    image: string;
    hoverImage: string;
     images:string[];
    category_english: string;
    category_arabic: string;
    collection: string;
   description_english: string;
   description_arabic: string;
   category:string;
    sizes: string[];
    available:boolean[];
    colors: string[];
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
    selectedColor?: string;
  }