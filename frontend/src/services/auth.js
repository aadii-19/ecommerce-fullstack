import { apiFetch, setAuthToken, removeAuthToken } from './api';

export const login = async (credentials) => {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const register = async (userData) => {
  return await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const logout = () => {
  removeAuthToken();
};
