import { apiFetch } from './api';

export const placeOrder = (address) => apiFetch('/orders', { method: 'POST', body: JSON.stringify({ address }) });
export const getUserOrders = () => apiFetch('/orders/user');
export const getAllOrders = () => apiFetch('/orders'); // Admin only
