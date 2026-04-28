import { useState, useEffect, useCallback } from 'react';
import { useNGO } from '../context/NGOContext';

/**
 * Custom hook to fetch NGO data
 */
export const useNGOData = () => {
  const { state } = useNGO();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (fetchFn) => {
    try {
      setLoading(true);
      setError(null);

      if (!state.ngoId) {
        throw new Error('NGO ID not found');
      }

      const response = await fetchFn(state.ngoId);
      setData(response.data.data);
    } catch (err) {
      console.error('Error fetching NGO data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [state.ngoId]);

  return { data, loading, error, fetchData };
};

/**
 * Custom hook to handle form submissions with loading and error states
 */
export const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (submitFn) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await submitFn();

      setSuccess(true);
      return result;
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccess(false), []);

  return { loading, error, success, submit, clearError, clearSuccess };
};

export default {
  useNGOData,
  useFormSubmit,
};
