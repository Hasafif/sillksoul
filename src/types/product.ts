export interface Product {
    id: string;
    name_english: string;
    name_arabic: string;
    price: number;
    image: string;
    hoverImage: string;
     hoverImage2: string;
    category_english: string;
    category_arabic: string;
    collection: string;
   description_english: string;
   description_arabic: string;
    sizes: string[];
    sizes2:string[];
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
    image: string;
    hoverImage: string;
    description: string;
    products: Product[]
  }
  export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  }