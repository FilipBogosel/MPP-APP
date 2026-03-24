import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { 
  Car, 
  Wrench, 
  Calendar, 
  Gauge, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  ArrowLeft,
  Trash2,
  Save,
  Pencil,
  LayoutTemplate
} from 'lucide-react';

const mockCars = [
  { id: '1', name: '2018 Toyota Camry' },
  { id: '2', name: '2021 Honda CR-V' },
  { id: '3', name: '2015 Ford F-150' },
];

const mockInitialData = {
  id: '1',
  carId: '1',
  serviceName: 'Oil Change',
  date: '2025-10-15',
  kilometers: '72000',
  nextKilometers: '80000',
  shopName: "Joe's Auto Repair",
  location: '123 Main St, City',
  cost: '85.00',
  notes: 'Everything looks good. Brake pads have about 30% life left.',
};

export function ServiceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [initialData] = useState(mockInitialData);
  const [formData, setFormData] = useState(initialData);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!hasChanges) return;
    console.log('Updating service record:', formData);
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service record?')) {
      console.log('Deleting service record:', id);
      navigate('/');
    }
  };

  const EditableField = ({ 
    label, icon: Icon, name, value, type = "text", options, multiline = false, dark = false 
  }: any) => {
    const [isEditing, setIsEditing] = useState(false);

    const inputClasses = isEditing
      ? `block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-lg outline-none transition-colors border-2 cursor-text ring-0 ${
          dark ? 'bg-slate-700 border-indigo-400 text-white' : 'bg-white border-indigo-500 text-gray-900'
        }`
      : `block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-lg outline-none transition-colors border ${
          dark ? 'bg-slate-800/50 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
        }`;

    const labelClasses = dark 
      ? 'block text-xs uppercase tracking-wider font-semibold mb-1.5 text-slate-400' 
      : 'block text-xs uppercase tracking-wider font-semibold mb-1.5 text-gray-500';

    const iconClasses = dark ? 'text-slate-400' : 'text-gray-400';

    return (
      <div className={multiline ? "sm:col-span-2 w-full" : "w-full"}>
        <label className={labelClasses}>{label}</label>
        <div className="relative rounded-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-0 h-10">
            <Icon className={`h-5 w-5 ${iconClasses}`} />
          </div>
          
          {options ? (
            <select
              name={name}
              value={value}
              onChange={handleChange}
              disabled={!isEditing}
              onBlur={() => setIsEditing(false)}
              className={`${inputClasses} appearance-none`}
            >
              {options.map((opt: any) => (
                <option key={opt.id} value={opt.id} className="text-gray-900 bg-white">{opt.name}</option>
              ))}
            </select>
          ) : multiline ? (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              readOnly={!isEditing}
              onBlur={() => setIsEditing(false)}
              rows={4}
              className={`${inputClasses} resize-y pt-2.5`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              readOnly={!isEditing}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsEditing(false); }}
              className={inputClasses}
            />
          )}

          {!isEditing && (
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              className={`absolute right-3 top-2.5 transition-colors bg-transparent border-none p-0 cursor-pointer ${
                dark ? 'text-slate-500 hover:text-indigo-300' : 'text-gray-400 hover:text-indigo-600'
              }`}
              title="Edit field"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#f4f6f8] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Maintenance
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Service Record Details</h1>
            <p className="mt-2 text-sm text-gray-600">
              View and edit details. Click the pencil icon to make changes.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Record
            </button>
            <button
              onClick={handleUpdate}
              disabled={!hasChanges}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                hasChanges 
                  ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Save className="h-4 w-4 mr-2" />
              {hasChanges ? 'Update Changes' : 'Up to date'}
            </button>
          </div>
        </div>

        {/* 30/70 Split Layout */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row min-h-[600px]">
          
          {/* 30% Left Column - Dark Slate */}
          <div className="w-full sm:w-[35%] bg-slate-800 p-6 sm:p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700 rounded-bl-full opacity-50 pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-white mb-8 tracking-tight flex items-center gap-2 relative z-10">
              <Wrench className="w-6 h-6 text-indigo-400" />
              Service Overview
            </h3>
            
            <div className="space-y-6 flex-1 relative z-10">
              <EditableField 
                label="Select Vehicle" 
                icon={Car} 
                name="carId" 
                value={formData.carId} 
                options={mockCars} 
                dark={true}
              />

              <EditableField 
                label="Service Type" 
                icon={Wrench} 
                name="serviceName" 
                value={formData.serviceName} 
                dark={true}
              />
              
              <EditableField 
                label="Current Odometer" 
                icon={Gauge} 
                name="kilometers" 
                type="number" 
                value={formData.kilometers} 
                dark={true}
              />

              <EditableField 
                label="Date" 
                icon={Calendar} 
                name="date" 
                type="date" 
                value={formData.date} 
                dark={true}
              />
            </div>

            <div className="pt-6 border-t border-slate-700 mt-8 relative z-10">
              <EditableField 
                label="Total Cost" 
                icon={DollarSign} 
                name="cost" 
                type="number" 
                value={formData.cost} 
                dark={true}
              />
            </div>
          </div>

          {/* 70% Right Column - Off-white */}
          <div className="w-full sm:w-[65%] bg-[#fcfcfc] p-6 sm:p-8 flex flex-col overflow-y-auto">
            <div className="flex items-center gap-2 mb-8 border-b border-gray-200/80 pb-4">
              <LayoutTemplate className="w-6 h-6 text-indigo-500" />
              <h3 className="text-xl font-semibold text-gray-800">Detailed Information</h3>
            </div>
            
            <div className="space-y-8">
              <section>
                <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider">Provider & Location</h4>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <EditableField 
                      label="Shop Name" 
                      icon={Building2} 
                      name="shopName" 
                      value={formData.shopName} 
                    />
                    <EditableField 
                      label="Location" 
                      icon={MapPin} 
                      name="location" 
                      value={formData.location} 
                    />
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider">Future Planning</h4>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <EditableField 
                    label="Next Recommended Service (km)" 
                    icon={Gauge} 
                    name="nextKilometers" 
                    type="number" 
                    value={formData.nextKilometers} 
                  />
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider">Materials, Notes & Documents</h4>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-6">
                  <EditableField 
                    label="Mechanic Notes / Description" 
                    icon={FileText} 
                    name="notes" 
                    value={formData.notes} 
                    multiline={true} 
                  />
                  
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-3 text-gray-500">
                      Attached Documents
                    </label>
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 max-w-md transition-colors hover:bg-gray-100 cursor-pointer">
                      <FileText className="h-6 w-6 text-indigo-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">receipt_oil_change.pdf</p>
                        <p className="text-xs text-gray-500">245 KB</p>
                      </div>
                      <span className="text-indigo-600 hover:text-indigo-900 text-sm font-medium px-3 border-l border-gray-200 ml-2">View</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
