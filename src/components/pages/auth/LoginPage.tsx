import { Lock, Mail, Wrench } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router';
import { login } from '@/api/services/authApi';
import { FormField } from '@/components/FormField';
import { cls } from '@/styles/classes';

export function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await login(formData);
    setIsSubmitting(false);
  };

  return (
    <div className={`${cls.page} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center justify-center text-2xl font-bold tracking-tight text-indigo-700">
              Ma<Wrench className="mx-[1px] inline h-6 w-6" />ntenanceRecord
            </span>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your service history</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField id="email" label="Email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="driver@example.com" type="email" required />
            <FormField id="password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} placeholder="••••••••" type="password" required />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${cls.btnWide} bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="mt-4 flex flex-col space-y-3">
              <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-900">Forgot password?</a>
              <div className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
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
