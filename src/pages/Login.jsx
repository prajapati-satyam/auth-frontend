import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn, Mail, Lock, Eye, EyeOff, Key, X } from 'lucide-react';
import { loginUser } from '../utils/api';
import { validateLogin, validateEmail } from '../utils/validation';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginUser(formData);
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to profile page
        navigate('/profile');
      } else {
        toast.error(response.message || "Login failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
  };

  const handleForgotPasswordEmailChange = (e) => {
    setForgotPasswordEmail(e.target.value);
    if (forgotPasswordError) {
      setForgotPasswordError('');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(forgotPasswordEmail);
    if (emailError) {
      setForgotPasswordError(emailError);
      return;
    }

    setIsForgotPasswordLoading(true);
    setForgotPasswordError('');

    try {
      const response = await axios.post('https://auth-cpgr.onrender.com/api/v2/forgot-password/request', {
        mail: forgotPasswordEmail
      });
      
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
        handleCloseForgotPasswordModal();
      } else {
        toast.error(response.data.message || "Failed to send password reset email", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data.message || "Failed to send password reset email", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Network error. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LogIn className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={formData.identifier}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.identifier ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isLoading ? 'bg-gray-100' : ''
                }`}
                placeholder="Enter your email or username"
              />
            </div>
            {errors.identifier && (
              <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isLoading ? 'bg-gray-100' : ''
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
            } transition-all duration-200 shadow-lg`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Forgot Password Section */}
        <div className="text-center space-y-4">
          <button
            onClick={handleForgotPasswordClick}
            className="flex items-center justify-center space-x-2 mx-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <Key className="h-4 w-4" />
            <span>Forgot Password?</span>
          </button>
          
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Forgot Password</h3>
              <button
                onClick={handleCloseForgotPasswordModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Please enter your email address to forgot your password. We will send you a password reset link to the provided email address.
            </p>
            
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="forgotPasswordEmail"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={handleForgotPasswordEmailChange}
                    disabled={isForgotPasswordLoading}
                    className={`w-full pl-10 pr-3 py-2 border ${
                      forgotPasswordError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                      isForgotPasswordLoading ? 'bg-gray-100' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {forgotPasswordError && (
                  <p className="mt-1 text-sm text-red-600">{forgotPasswordError}</p>
                )}
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForgotPasswordModal}
                  disabled={isForgotPasswordLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isForgotPasswordLoading}
                  className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white ${
                    isForgotPasswordLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-700'
                  } transition-colors`}
                >
                  {isForgotPasswordLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Key className="h-4 w-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;