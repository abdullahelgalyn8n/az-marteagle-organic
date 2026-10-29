import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import {
  CartItem,
  addItemToCart,
  updateCartItemQuantity,
  calculateCartTotals,
  CartTotals,
} from '../utils/storeLogic';

export interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'card';
  items: CartItem[];
  totals: CartTotals;
  createdAt: string;
}

interface StoreContextType {
  cart: CartItem[];
  totals: CartTotals;
  couponCode: string;
  setCouponCode: (code: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  moveAllWishlistToCart: () => void;
  lastOrder: ConfirmedOrder | null;
  placeOrder: (details: Omit<ConfirmedOrder, 'orderNumber' | 'items' | 'totals' | 'createdAt'>) => ConfirmedOrder;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_CART_KEY = 'marteagle_cart_v1';
const STORAGE_WISHLIST_KEY = 'marteagle_wishlist_v1';
const STORAGE_THEME_KEY = 'marteagle_theme_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [{ product: PRODUCTS[0], quantity: 1 }];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHLIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-51', 'prod-63'];
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved !== null) return saved === 'dark';
    } catch {
      // ignore
    }
    return false;
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<ConfirmedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => addItemToCart(prev, product, quantity));
    showToast(`تمت إضافة "${product.name}" إلى سلة التسوق`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, quantity));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        if (product) showToast(`تمت إزالة "${product.name}" من المفضلة`);
        return prev.filter((id) => id !== productId);
      } else {
        if (product) showToast(`تم حفظ "${product.name}" في المفضلة`);
        return [...prev, productId];
      }
    });
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    showToast('تم إفراغ قائمة المفضلة');
  };

  const moveAllWishlistToCart = () => {
    const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
    if (wishlistedProducts.length === 0) return;
    setCart((prev) => {
      let updated = [...prev];
      wishlistedProducts.forEach((prod) => {
        updated = addItemToCart(updated, prod, 1);
      });
      return updated;
    });
    showToast(`تم نقل ${wishlistedProducts.length} منتجات من المفضلة إلى السلة!`);
  };

  const totals = calculateCartTotals(cart, couponCode);

  const placeOrder = (
    details: Omit<ConfirmedOrder, 'orderNumber' | 'items' | 'totals' | 'createdAt'>
  ): ConfirmedOrder => {
    const orderNumber = `ME-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: ConfirmedOrder = {
      ...details,
      orderNumber,
      items: [...cart],
      totals,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setLastOrder(newOrder);
    setCart([]);
    setCouponCode('');
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        totals,
        couponCode,
        setCouponCode,
        addToCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlistIds,
        toggleWishlist,
        clearWishlist,
        moveAllWishlistToCart,
        lastOrder,
        placeOrder,
        toastMessage,
        showToast,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
