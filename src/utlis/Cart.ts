import { CartItem } from '../types';

const CART_KEY = 'cart';

export const addToCart = (newItem: CartItem) => {
  const currentCart = getCartItems();
  const existingItemIndex = currentCart.findIndex(item => item.projectId === newItem.projectId);

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].volume += newItem.volume;
  } else {
    currentCart.push(newItem);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(currentCart));
};

export const getCartItems = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const removeFromCart = (projectId: number) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.filter(item => item.projectId !== projectId);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};