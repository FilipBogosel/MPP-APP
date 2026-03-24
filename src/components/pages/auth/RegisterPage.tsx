import { AtSign, Calendar, Car, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ComponentType, FormEvent } from 'react';
import { Link } from 'react-router';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    dob: '',
    car: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-1 flex-col justify-center bg-[#f4f6f8] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Join our community and get started today.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <IconInput id="fullName" label="Full Name" icon={User} value={formData.fullName} onChange={handleChange} placeholder="John Doe" required span2 />
              <IconInput id="username" label="Username" icon={AtSign} value={formData.username} onChange={handleChange} placeholder="johndoe123" required span2 />
              <IconInput id="email" label="Email Address" icon={Mail} value={formData.email} onChange={handleChange} placeholder="john@example.com" required span2 type="email" />
              <IconInput id="dob" label="Date of Birth" icon={Calendar} value={formData.dob} onChange={handleChange} required type="date" />
              <IconInput id="car" label="Your Car" icon={Car} value={formData.car} onChange={handleChange} placeholder="e.g. Toyota Corolla" />
              <IconInput id="password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} placeholder="••••••••" required span2 type="password" />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Account
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
                  className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

function IconInput({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  required,
  span2,
  type = 'text',
}: {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  span2?: boolean;
  type?: string;
}) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={id}
          id={id}
          required={required}
          className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 text-sm text-gray-700 outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
