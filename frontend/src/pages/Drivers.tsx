// pages/Drivers.tsx
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { CommonContext } from '@/context/CommonContext';
// import { getDrivers, createDriver, updateDriver, deleteDriver } from '@/services/drivers';

// Import PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehicleType: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

const Drivers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [meta, setMeta] = useState<any>(null);
  
  const { user } = useContext(CommonContext);

  useEffect(() => {
    fetchDrivers();
  }, [page, limit, searchKey]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
    //   const response = await getDrivers({ page, limit, searchKey });
    //   setDrivers(response.data);
    //   setMeta(response.meta);
    } catch (error) {
      toast.error('Failed to fetch drivers');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (driverData: Omit<Driver, 'id'>) => {
    try {
      setLoading(true);
      if (selectedDriver) {
        // await updateDriver(selectedDriver.id, driverData);
        toast.success('Driver updated successfully');
      } else {
        // await createDriver(driverData);
        toast.success('Driver created successfully');
      }
      setIsModalOpen(false);
      fetchDrivers();
    } catch (error) {
      toast.error(`Failed to ${selectedDriver ? 'update' : 'create'} driver`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async (driver: Driver) => {
    try {
      setLoading(true);
    //   await deleteDriver(driver.id);
      toast.success('Driver deleted successfully');
      fetchDrivers();
    } catch (error) {
      toast.error('Failed to delete driver');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusBodyTemplate = (rowData: Driver) => {
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        rowData.status === 'Active' ? 'bg-green-100 text-green-800' :
        rowData.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {rowData.status}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: Driver) => {
    return (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => {
            setSelectedDriver(rowData);
            setIsModalOpen(true);
          }}
        >
          <FiEdit2 className="inline mr-1" /> Edit
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteDriver(rowData)}
        >
          <FiTrash2 className="inline mr-1" /> Delete
        </button>
      </div>
    );
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
        <Header name={user?.firstName || 'Admin'} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Drivers Management
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search drivers..."
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>

                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setSelectedDriver(null);
                      setIsModalOpen(true);
                    }}
                  >
                    <FiPlus /> Add Driver
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
                    value={drivers}
                    paginator
                    rows={limit}
                    totalRecords={meta?.total}
                    lazy
                    first={(page - 1) * limit}
                    onPage={handlePageChange}
                    loading={loading}
                    emptyMessage="No drivers found"
                    className="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    paginatorClassName="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg"
                  >
                    {/* Columns remain the same as previous example */}
                  </DataTable>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Material-UI Dialog */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gray-50 p-4 border-b">
          {selectedDriver ? 'Edit Driver' : 'Add New Driver'}
        </DialogTitle>
        <DialogContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={selectedDriver?.firstName || ''}
              onChange={(e) => setSelectedDriver({
                ...(selectedDriver || {} as Driver),
                firstName: e.target.value
              })}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={selectedDriver?.lastName || ''}
              onChange={(e) => setSelectedDriver({
                ...(selectedDriver || {} as Driver),
                lastName: e.target.value
              })}
            />
          </div>
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={selectedDriver?.email || ''}
            onChange={(e) => setSelectedDriver({
              ...(selectedDriver || {} as Driver),
              email: e.target.value
            })}
          />
          
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={selectedDriver?.phone || ''}
            onChange={(e) => setSelectedDriver({
              ...(selectedDriver || {} as Driver),
              phone: e.target.value
            })}
          />
          
          <TextField
            label="License Number"
            variant="outlined"
            fullWidth
            value={selectedDriver?.licenseNumber || ''}
            onChange={(e) => setSelectedDriver({
              ...(selectedDriver || {} as Driver),
              licenseNumber: e.target.value
            })}
          />
          
          <TextField
            label="Vehicle Type"
            variant="outlined"
            fullWidth
            value={selectedDriver?.vehicleType || ''}
            onChange={(e) => setSelectedDriver({
              ...(selectedDriver || {} as Driver),
              vehicleType: e.target.value
            })}
          />
          
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedDriver?.status || 'Active'}
              onChange={(e) => setSelectedDriver({
                ...(selectedDriver || {} as Driver),
                status: e.target.value as 'Active' | 'Inactive' | 'Suspended'
              })}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button 
            onClick={() => setIsModalOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => selectedDriver && handleSubmit(selectedDriver)}
            variant="contained"
            color="primary"
            disabled={!selectedDriver}
          >
            {selectedDriver?.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Drivers;