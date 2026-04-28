import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NGOContext = createContext();

const initialState = {
  ngoId: localStorage.getItem('ngoId') || null,
  ngoData: null,
  adminId: localStorage.getItem('adminId') || null,
  authToken: localStorage.getItem('authToken') || null,
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
};

const ngoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NGO_DATA':
      return {
        ...state,
        ngoData: action.payload,
        ngoId: action.payload.id,
        isLoading: false,
      };

    case 'SET_AUTH_DATA':
      return {
        ...state,
        authToken: action.payload.token,
        adminId: action.payload.adminId,
        ngoId: action.payload.ngoId,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'LOGOUT':
      return {
        ...initialState,
        ngoId: null,
        adminId: null,
        authToken: null,
        isAuthenticated: false,
      };

    case 'UPDATE_NGO_DATA':
      return {
        ...state,
        ngoData: {
          ...state.ngoData,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export const NGOProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ngoReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    if (state.authToken) {
      localStorage.setItem('authToken', state.authToken);
    }
    if (state.ngoId) {
      localStorage.setItem('ngoId', state.ngoId);
    }
    if (state.adminId) {
      localStorage.setItem('adminId', state.adminId);
    }
  }, [state.authToken, state.ngoId, state.adminId]);

  const value = {
    state,
    dispatch,
    // Helper functions
    setNGOData: (ngoData) =>
      dispatch({ type: 'SET_NGO_DATA', payload: ngoData }),
    setAuthData: (token, adminId, ngoId) =>
      dispatch({
        type: 'SET_AUTH_DATA',
        payload: { token, adminId, ngoId },
      }),
    setLoading: (isLoading) =>
      dispatch({ type: 'SET_LOADING', payload: isLoading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    updateNGOData: (updates) =>
      dispatch({ type: 'UPDATE_NGO_DATA', payload: updates }),
  };

  return <NGOContext.Provider value={value}>{children}</NGOContext.Provider>;
};

export const useNGO = () => {
  const context = useContext(NGOContext);
  if (!context) {
    throw new Error('useNGO must be used within NGOProvider');
  }
  return context;
};

export default NGOContext;
