import { Lock, Mail, Wrench } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ComponentType, FormEvent } from 'react';
import { Link } from 'react-router';

export function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-1 flex-col justify-center bg-[#f4f6f8] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center justify-center text-2xl font-bold tracking-tight text-[#0056d2]">
              Ma<Wrench className="mx-[1px] inline h-6 w-6" />ntenanceRecord
            </span>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your service history</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <IconInput id="email" label="Email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="driver@example.com" type="email" />
            <IconInput id="password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} placeholder="••••••••" type="password" />

            <button
              type="submit"
              className="flex w-full justify-center rounded-lg border border-transparent bg-[#0056d2] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0056d2] focus:ring-offset-2"
            >
              Sign In
            </button>

            <div className="mt-4 flex flex-col space-y-3">
              <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-900">Forgot password?</a>
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

function IconInput({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type,
}: {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={id}
          id={id}
          required
          className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 text-sm outline-none transition-colors focus:border-[#0056d2] focus:ring-[#0056d2]"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
