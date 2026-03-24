import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { 
  Car, 
  Wrench, 
  Calendar, 
  Gauge, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  UploadCloud,
  ArrowLeft
} from 'lucide-react';

export function AddService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carId: '1',
    serviceName: '',
    date: new Date().toISOString().split('T')[0],
    kilometers: '',
    nextKilometers: '',
    shopName: '',
    location: '',
    cost: '',
    notes: '',
  });

  const mockCars = [
    { id: '1', name: '2018 Toyota Camry' },
    { id: '2', name: '2021 Honda CR-V' },
    { id: '3', name: '2015 Ford F-150' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New service added:', formData);
    // In a real app, send data to backend then navigate
    navigate('/');
  };

  return (
    <div className="flex-1 bg-[#f4f6f8] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Maintenance
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add Service Record</h1>
          <p className="mt-2 text-sm text-gray-600">
            Log a new maintenance or repair service for your vehicle.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Section 1: Vehicle & Service Basics */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Basic Details</h3>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                
                {/* Car Selection */}
                <div className="sm:col-span-2">
                  <label htmlFor="carId" className="block text-sm font-medium text-gray-700">
                    Vehicle
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Car className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="carId"
                      name="carId"
                      value={formData.carId}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors text-gray-700 bg-white"
                    >
                      {mockCars.map((car) => (
                        <option key={car.id} value={car.id}>{car.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Name */}
                <div>
                  <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Wrench className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="serviceName"
                      id="serviceName"
                      required
                      placeholder="e.g. Oil Change, Brake Pad Replacement"
                      value={formData.serviceName}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors text-gray-700"
                    />
                  </div>
                </div>

                {/* Current Kilometers */}
                <div>
                  <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700">
                    Current Odometer (km)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Gauge className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="kilometers"
                      id="kilometers"
                      required
                      min="0"
                      placeholder="e.g. 50000"
                      value={formData.kilometers}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Next Recommended Kilometers */}
                <div>
                  <label htmlFor="nextKilometers" className="block text-sm font-medium text-gray-700">
                    Next Recommended Service (km)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Gauge className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="nextKilometers"
                      id="nextKilometers"
                      min="0"
                      placeholder="e.g. 60000"
                      value={formData.nextKilometers}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Shop & Cost Details */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Shop & Cost</h3>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                
                {/* Shop Name */}
                <div>
                  <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                    Service Shop Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="shopName"
                      id="shopName"
                      placeholder="e.g. Joe's Auto Repair"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="e.g. 123 Main St, City"
                      value={formData.location}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Total Cost */}
                <div>
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                    Total Cost
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="cost"
                      id="cost"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Notes & Documents */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Notes & Documents</h3>
              <div className="space-y-6">
                
                {/* Mechanic Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Mechanic Notes / Description
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={4}
                      placeholder="Any specific observations or future recommendations from the mechanic..."
                      value={formData.notes}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none transition-colors resize-y"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Receipt or Documents (PDF, Image)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-1"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <Link
                  to="/"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Save Record
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
