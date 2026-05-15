import apiClient from './apiClient';

/**
 * Email and password login
 */
export const emailLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Email/password registration for volunteer or community
 */
export const emailRegister = async (fields) => {
  try {
    const response = await apiClient.post('/auth/register', fields);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * NGO registration — creates admin user + NGO document
 */
export const registerNGO = async (fields) => {
  try {
    const response = await apiClient.post('/auth/register-ngo', fields);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'NGO registration failed' };
  }
};

/**
 * Verify JWT token
 */
export const verifyToken = async () => {
  try {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Token verification failed' };
  }
};

export default {
  emailLogin,
  emailRegister,
  registerNGO,
  verifyToken,
};
