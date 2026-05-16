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

/**
 * Google Auth
 */
export const googleLogin = async (idToken, isLogin = false) => {
  try {
    const response = await apiClient.post(`/auth/google?isLogin=${isLogin}`, {}, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Google Auth failed' };
  }
};

export default {
  emailLogin,
  emailRegister,
  registerNGO,
  verifyToken,
  googleLogin,
};
