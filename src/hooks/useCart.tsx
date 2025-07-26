import { useState, createContext, useContext, type ReactNode, useEffect } from "react";
import type { CartItem, Product } from "../types/product";
import { toast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "./useTranslation";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string, customsizedata?: any) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Define a key for localStorage
const CART_STORAGE_KEY = 'silksoul-cart-items';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // 1. Initialize state from localStorage on component mount
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  // 2. Save state to localStorage whenever 'items' changes
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [items]);

  // Helper function to get localized product name
  const getProductName = (product: Product) => {
    return language === 'en' ? product.name_english : product.name_arabic;
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string, customsizedata?: any) => {
    setItems(prev => {
      // Correctly find an existing item, handling custom data objects
      const existingItem = prev.find(item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color &&
        JSON.stringify(item.customSizeData) === JSON.stringify(customsizedata) // Deep compare custom data
      );

      const productName = getProductName(product);

      if (existingItem) {
        toast({
          title: t('cartupdated'),
          description: `${productName} ${t('cartquantityUpdated')}`,
        });
        // Update quantity of the existing item
        return prev.map(item =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color &&
          JSON.stringify(item.customSizeData) === JSON.stringify(customsizedata)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: t('cartaddedToCart'),
          description: `${productName} ${t('cartaddedToCartDesc')}`,
        });
        // Add the new item to the cart
        return [...prev, {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
          customSizeData: customsizedata
        }];
      }
    });
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setItems(prev => {
      const indexToRemove = prev.findIndex(
        item => item.id === productId && item.selectedSize === selectedSize
      );

      if (indexToRemove === -1) return prev;

      const newItems = [...prev];
      newItems.splice(indexToRemove, 1);
      return newItems;
    });

    toast({
      title: t('cartitemRemoved'),
      description: t('cartitemRemovedDesc'),
      className: "destructive"
    });
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === productId && item.selectedSize === selectedSize ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    /*toast({
      title: t('cartcartCleared'),
      description: t('cartcartClearedDesc'),
    });*/
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