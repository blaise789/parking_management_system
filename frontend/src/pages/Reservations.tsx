import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Import PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Reservations: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  
  const [reservations, setReservations] = useState([
    {
      id: '1',
      user: 'Unknown User No email',
      vehicle: '☑ ABC123 Car (Medium)',
      status: 'Approved',
      date: '10/08/2023',
      parkingSlot: 'SQ05 South Section'
    },
    // Add more reservation data as needed
  ]);

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

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => handleViewDetails(rowData)}
        >
          View
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleCancelReservation(rowData)}
        >
          Cancel
        </button>
      </div>
    );
  };

  const handleViewDetails = (reservation: any) => {
    // Implement view details logic
    toast.success(`Viewing reservation ${reservation.id}`);
  };

  const handleCancelReservation = (reservation: any) => {
    // Implement cancel reservation logic
    toast.success(`Cancelled reservation ${reservation.id}`);
  };

  const handlePageChange = (e: {
    page?: number;
    rows?: number;
    first?: number;
    pageCount?: number;
  }) => {
    const newPage = (e.page ?? 0) + 1;
    const newLimit = e.rows ?? limit;
    setPage(newPage);
    setLimit(newLimit);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:block md:w-64 flex-shrink-0">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header name="Admin" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Reservations
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by user, vehicle, or status..."
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>

                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => console.log('Add new reservation')}
                  >
                    <FiPlus /> Add Reservation
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <DataTable
                    value={reservations}
                    paginator
                    rows={limit}
                    totalRecords={reservations.length}
                    lazy
                    first={(page - 1) * limit}
                    onPage={handlePageChange}
                    loading={loading}
                    emptyMessage="No reservations found"
                    className="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    paginatorClassName="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg"
                  >
                    <Column
                      field="user"
                      header="USER"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      sortable
                    />
                    <Column
                      field="vehicle"
                      header="VEHICLE"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="status"
                      header="STATUS"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap"
                      body={statusBodyTemplate}
                      sortable
                    />
                    <Column
                      field="date"
                      header="DATE"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="parkingSlot"
                      header="PARKING SLOT"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      header="ACTIONS"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      body={actionBodyTemplate}
                    />
                  </DataTable>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservations;