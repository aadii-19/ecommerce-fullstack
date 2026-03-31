const BASE_URL = '/api';

export const getAuthToken = () => localStorage.getItem('jwt_token');
export const setAuthToken = (token) => localStorage.setItem('jwt_token', token);
export const removeAuthToken = () => localStorage.removeItem('jwt_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    // If unauthorized, token might be expired. Hard reload or clear token.
    console.warn("Unauthorized access - removing token");
    removeAuthToken();
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
       window.location.href = '/login';
    }
  }

  // Parse JSON if possible
  let data = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error(data?.message || 'API Error');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
