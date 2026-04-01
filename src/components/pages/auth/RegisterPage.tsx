import { AtSign, Calendar, Car, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router';
import { register } from '@/api/services/authApi';
import { FormField } from '@/components/FormField';
import { cls } from '@/styles/classes';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    dob: '',
    car: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await register(formData);
    setIsSubmitting(false);
  };

  return (
    <div className={`${cls.page} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Join our community and get started today.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <FormField id="fullName" label="Full Name" icon={User} value={formData.fullName} onChange={handleChange} placeholder="John Doe" required colSpan2 />
              <FormField id="username" label="Username" icon={AtSign} value={formData.username} onChange={handleChange} placeholder="johndoe123" required colSpan2 />
              <FormField id="email" label="Email Address" icon={Mail} value={formData.email} onChange={handleChange} placeholder="john@example.com" required colSpan2 type="email" />
              <FormField id="dob" label="Date of Birth" icon={Calendar} value={formData.dob} onChange={handleChange} required type="date" />
              <FormField id="car" label="Your Car" icon={Car} value={formData.car} onChange={handleChange} placeholder="e.g. Toyota Corolla" />
              <FormField id="password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} placeholder="••••••••" required colSpan2 type="password" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${cls.btnWide} bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className={`${cls.btnOutline} w-full`}
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
