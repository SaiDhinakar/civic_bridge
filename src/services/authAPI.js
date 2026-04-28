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
  verifyToken,
};
