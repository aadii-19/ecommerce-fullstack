import { apiFetch } from './api';

export const getCart = () => apiFetch('/cart');
export const addToCart = (productId, quantity) => apiFetch('/cart/add', { method: 'POST', body: JSON.stringify({ productId, quantity }) });
export const updateCartItem = (productId, quantity) => apiFetch('/cart/update', { method: 'PUT', body: JSON.stringify({ productId, quantity }) });
export const removeFromCart = (productId) => apiFetch(`/cart/remove/${productId}`, { method: 'DELETE' });
