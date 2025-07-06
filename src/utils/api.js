import axios from 'axios';

const API_BASE_URL = 'https://auth-cpgr.onrender.com/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Resend verification email
export const resendVerificationEmail = async (emailData) => {
  try {
    const response = await api.post('/resend', emailData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePicture = async (formData) => {
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Delete profile picture
export const deleteProfilePicture = async () => {
  try {
    const response = await api.delete('/delete_profile_picture');
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.get('/logout');
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Request password reset
export const requestPasswordReset = async () => {
  try {
    const response = await api.get('/reset-password/request');
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

// Request forgot password
export const requestForgotPassword = async (mail_forogot) => {
  const mail = {
    mail: mail_forogot
  }
  try {
    const response = await api.post('/forgot-password/request', mail);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export default api;