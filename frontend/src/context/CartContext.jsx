import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../services/cart';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], totalPrice: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data || { items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Failed to fetch cart', error);
      setCart({ items: [], totalPrice: 0 }); // Fallback on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      await addToCart(productId, quantity);
      await fetchCart(); // Refresh cart to get accurate total and items
    } catch (error) {
      console.error('Failed to add to cart', error);
      throw error;
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        await updateCartItem(productId, quantity);
      }
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart', error);
      throw error;
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart', error);
      throw error;
    }
  };

  const clearCartState = () => setCart({ items: [], totalPrice: 0 });

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart: handleAddToCart,
      updateQuantity: handleUpdateQuantity,
      removeFromCart: handleRemove,
      refreshCart: fetchCart,
      clearCartState
    }}>
      {children}
    </CartContext.Provider>
  );
};
