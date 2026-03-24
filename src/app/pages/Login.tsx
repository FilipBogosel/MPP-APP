import React, { useState } from 'react';
import { Link } from 'react-router';
import { Wrench, Mail, Lock } from 'lucide-react';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Handle login here
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f4f6f8]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-sm sm:rounded-2xl border border-gray-100">
          
          <div className="text-center mb-8">
            <span className="text-2xl font-bold text-[#0056d2] tracking-tight inline-flex items-center justify-center mb-4">
              Ma<Wrench className="h-6 w-6 inline mx-[1px]" />ntenanceRecord
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your service history
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="focus:ring-[#0056d2] focus:border-[#0056d2] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                  placeholder="driver@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="focus:ring-[#0056d2] focus:border-[#0056d2] block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0056d2] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0056d2] transition-colors"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-4 flex flex-col space-y-3">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Forgot password?
              </a>
              <div className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-[#0056d2] hover:text-blue-700">
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}