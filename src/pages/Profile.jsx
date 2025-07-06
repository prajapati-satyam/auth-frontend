import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  CheckCircle, 
  Upload, 
  Trash2, 
  Lock, 
  LogOut,
  Edit,
  Camera
} from 'lucide-react';
import { getUserProfile, uploadProfilePicture, deleteProfilePicture, logoutUser, requestPasswordReset, requestForgotPassword } from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const defaultProfilePicture = "https://ik.imagekit.io/wskbkewsr/profile_picture/defualt%20profile%20pic.png?updatedAt=1748085952796";

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    
    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      
      if (response.success) {
        setUser(response.user);
        setProfilePicture(response.user.profilePictureUrl || defaultProfilePicture);
      } else {
        toast.error(response.message || "Failed to fetch profile", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size must be less than 5MB", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('profile_pic', file);

      const response = await uploadProfilePicture(formData);
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setProfilePicture(response.url);
        // Update user data in localStorage
        const updatedUser = { ...user, profilePictureUrl: response.url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        toast.error(response.message || "Failed to upload image", {
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
      setIsUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    try {
      const response = await deleteProfilePicture();
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        
        // Refresh user profile to get updated data
        await fetchUserProfile();
      } else {
        toast.error(response.message || "Failed to delete image", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem('user');
        navigate('/');
      } else {
        // Even if logout fails on server, clear local storage
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (error) {
      // Clear local storage and redirect anyway
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await requestPasswordReset();
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(response.message || "Failed to send reset email", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await requestForgotPassword(user.mail);
      
      if (response.success) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(response.message || "Failed to send forgot password email", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {user.isVerify && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 animate-pulse">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-blue-100 text-lg">@{user.username}</p>
                <div className="flex items-center mt-2">
                  {user.isVerify ? (
                    <div className="flex items-center text-green-200">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Verified Account</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-200">
                      <Shield className="h-4 w-4 mr-1" />
                      <span className="text-sm">Pending Verification</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.mail}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">@{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phNum}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Picture Actions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  <span>{isUploading ? 'Uploading...' : 'Upload Picture'}</span>
                </label>
                
                <button
                  onClick={handleDeletePicture}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove Picture</span>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={handleResetPassword}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  <span>Reset Password</span>
                </button>
                
                <button
                  onClick={handleForgotPassword}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Forgot Password</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;