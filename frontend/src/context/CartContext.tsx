// --- src/context/CartContext.tsx ---
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItemsInCart: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fungsi Tambah Barang
  const addToCart = (newItem: Omit<CartItem, 'qty'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item => item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  // Fungsi Kurangi Barang
  const removeFromCart = (id: number) => {
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
          .filter(item => item.qty > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart harus digunakan di dalam CartProvider');
  return context;
};
