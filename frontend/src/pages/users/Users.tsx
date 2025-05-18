import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Header from '@/components/shared/Header';
import SideBar from '@/components/shared/SideBar';
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
// import { getUsers, createUser, updateUser, deleteUser } from '@/services/users';

// Import PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
}

const Users: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<any>(null);
  
  const { user } = useContext(CommonContext);

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchKey]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // const response = await getUsers({ page, limit, searchKey });
      // setUsers(response.data);
      // setMeta(response.meta);
      
      // Mock data for demonstration
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
        { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
        { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'inactive' },
      ];
      setUsers(mockUsers);
      setMeta({ total: mockUsers.length, page, limit });
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (userData: Omit<User, 'id'>) => {
    try {
      setLoading(true);
      if (selectedUser) {
        // await updateUser(selectedUser.id, userData);
        toast.success('User updated successfully');
      } else {
        // await createUser(userData);
        toast.success('User created successfully');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${selectedUser ? 'update' : 'create'} user`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      setLoading(true);
      // await deleteUser(user.id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusBodyTemplate = (rowData: User) => {
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        rowData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
      </span>
    );
  };

  const roleBodyTemplate = (rowData: User) => {
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        rowData.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {rowData.role.charAt(0).toUpperCase() + rowData.role.slice(1)}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => {
            setSelectedUser(rowData);
            setIsModalOpen(true);
          }}
        >
          <FiEdit2 className="inline mr-1" /> Edit
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteUser(rowData)}
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
                  Users Management
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search users..."
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>

                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setSelectedUser(null);
                      setIsModalOpen(true);
                    }}
                  >
                    <FiPlus /> Add User
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
                    value={users}
                    paginator
                    rows={limit}
                    totalRecords={meta?.total}
                    lazy
                    first={(page - 1) * limit}
                    onPage={handlePageChange}
                    loading={loading}
                    emptyMessage="No users found"
                    className="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    paginatorClassName="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg"
                  >
                    <Column field="name" header="Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column field="role" header="Role" body={roleBodyTemplate} sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable />
                    <Column header="Actions" body={actionBodyTemplate} />
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
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent className="p-4 space-y-4">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({
              ...(selectedUser || {} as User),
              name: e.target.value
            })}
          />
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({
              ...(selectedUser || {} as User),
              email: e.target.value
            })}
          />
          
          {!selectedUser?.id && (
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={selectedUser?.password || ''}
              onChange={(e) => setSelectedUser({
                ...(selectedUser || {} as User),
                password: e.target.value
              })}
            />
          )}
          
          <FormControl fullWidth variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser?.role || 'user'}
              onChange={(e) => setSelectedUser({
                ...(selectedUser || {} as User),
                role: e.target.value as 'user' | 'admin'
              })}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedUser?.status || 'active'}
              onChange={(e) => setSelectedUser({
                ...(selectedUser || {} as User),
                status: e.target.value as 'active' | 'inactive'
              })}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
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
            onClick={() => selectedUser && handleSubmit(selectedUser)}
            variant="contained"
            color="primary"
            disabled={!selectedUser?.name || !selectedUser?.email || (!selectedUser.id && !selectedUser.password)}
          >
            {selectedUser?.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;