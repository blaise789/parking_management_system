// pages/Vehicles.tsx
import React, { useState } from 'react';
import Header from '@/components/shared/Header';
import SideBar from '@/components/shared/SideBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Car, Bike, Truck } from 'lucide-react';

const Vehicles: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  // Sample vehicle data
  const vehicles = [
    {
      id: '1',
      licensePlate: 'ABC123',
      type: 'Car',
      size: 'Medium',
      owner: 'Unknown User',
      status: 'Approved',
      lastParked: '10/08/2023',
      currentSlot: 'SQ05 South Section'
    },
    // ... other vehicle data
  ];

  // Filter vehicles based on search text
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.licensePlate.toLowerCase().includes(searchText.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchText.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchText.toLowerCase())
  );

  const getVehicleIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'car':
      case 'van':
        return <Car className="h-5 w-5 text-blue-600" />;
      case 'motorcycle':
        return <Bike className="h-5 w-5 text-blue-600" />;
      case 'truck':
        return <Truck className="h-5 w-5 text-blue-600" />;
      default:
        return <Car className="h-5 w-5 text-blue-600" />;
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        rowData.status === 'Approved' ? 'bg-green-100 text-green-800' :
        rowData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {rowData.status}
      </span>
    );
  };

  const typeBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-2">
        {getVehicleIcon(rowData.type)}
        <span>{rowData.type}</span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex space-x-2">
        <button 
          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          onClick={() => handleViewDetails(rowData.id)}
        >
          Details
        </button>
        <button 
          className="text-red-600 hover:text-red-900 text-sm font-medium"
          onClick={() => handleRemoveVehicle(rowData.id)}
        >
          Remove
        </button>
      </div>
    );
  };

  const handleViewDetails = (id: string) => {
    // Implement view details logic
    console.log('View details for vehicle:', id);
  };

  const handleRemoveVehicle = (id: string) => {
    // Implement remove vehicle logic
    console.log('Remove vehicle:', id);
  };

  const handleAddVehicle = () => {
    // Implement add vehicle logic
    console.log('Add new vehicle');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header name="Admin" />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-2xl font-semibold text-gray-800">Registered Vehicles</h1>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search vehicles..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                
                {/* Add Vehicle Button */}
                <button 
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleAddVehicle}
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Add Vehicle</span>
                </button>
              </div>
            </div>

            {/* Vehicles Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <DataTable
                value={filteredVehicles}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vehicles"
                emptyMessage="No vehicles found"
                className="border-none"
                // headerClassName="hidden"
              >
                <Column
                  field="licensePlate"
                  header="License Plate"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  sortable
                />
                <Column
                  field="type"
                  header="Type"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  body={typeBodyTemplate}
                  sortable
                />
                <Column
                  field="size"
                  header="Size"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  sortable
                />
                <Column
                  field="owner"
                  header="Owner"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  sortable
                />
                <Column
                  field="status"
                  header="Status"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap"
                  body={statusBodyTemplate}
                  sortable
                />
                <Column
                  field="currentSlot"
                  header="Current Slot"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  sortable
                />
                <Column
                  header="Actions"
                  headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  bodyClassName="px-6 py-4 whitespace-nowrap"
                  body={actionBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vehicles;