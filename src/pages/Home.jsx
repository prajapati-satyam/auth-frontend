import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Star, Shield, Users, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-bounce mb-8">
            <Shield className="h-20 w-20 text-blue-600 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to <span className="text-blue-600">AuthApp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Your secure authentication platform with beautiful design and seamless user experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-2">
            <Link
              to="/register"
              className="flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="h-6 w-6" />
              <span className="text-lg font-semibold">Get Started</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-3 px-8 py-4 bg-white text-gray-800 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200"
            >
              <LogIn className="h-6 w-6" />
              <span className="text-lg font-semibold">Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose AuthApp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure</h3>
              <p className="text-gray-600">
                Industry-standard security with email verification and encrypted passwords
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast</h3>
              <p className="text-gray-600">
                Lightning-fast authentication with smooth user experience
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Intuitive design with responsive layout for all devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of users who trust AuthApp for their authentication needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create Account
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;