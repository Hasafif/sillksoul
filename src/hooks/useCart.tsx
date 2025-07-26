import { useState, createContext, useContext, type ReactNode, useTransition } from "react";
import type { CartItem, Product } from "../types/product";
import { toast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "./useTranslation";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string,customsizedata?:any) => void;
  removeFromCart: (productId: string,selectedSize: string) => void;
  updateQuantity: (productId: string,selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const {t} = useTranslation();
  const {language,isRTL} = useLanguage();
// Helper function to get localized product name
  const getProductName = (product: Product) => {
    let ProductName = (language=='en') ? product.name_english : product.name_arabic;
    return ProductName;
  };

  // Helper function to get localized product description
  const getProductDescription = (product: Product) => {
    let ProductName = (language=='en') ? product.description_english : product.description_arabic;
    return ProductName;
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string,customsizedata?:any) => {
    setItems(prev => {
      const existingItem = prev.find(item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color && 
         item.customSizeData==customsizedata
      );

      const productName = getProductName(product);

      if (existingItem) {
        toast({
          title: t('cartupdated'),
          description: `${productName} ${t('cartquantityUpdated')}`,
        });
        return prev.map(item =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color && 
         item.customSizeData==customsizedata
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: t('cartaddedToCart'),
          description: `${productName} ${t('cartaddedToCartDesc')}`,
        });
        console.log(customsizedata)
        console.log(items)
        return [...prev, {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
          customSizeData:customsizedata
        }];
        
      }
    });
  };

   const removeFromCart = (productId: string,selectedSize: string) => {
    setItems(prev => prev.filter(item => (item.id !== productId && item.selectedSize!==selectedSize)));
    toast({
      title: t('cartitemRemoved'),
      description: t('cartitemRemovedDesc'),
      className: "destructive"
    });
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId,selectedSize);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === productId && item.selectedSize===selectedSize ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: t('cartcartCleared'),
      description: t('cartcartClearedDesc'),
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};