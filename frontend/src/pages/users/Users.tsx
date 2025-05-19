// pages/users.tsx
import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { FiSearch, FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { CommonContext } from "@/context/CommonContext";
import { UserModal } from "@/components/modals/UserModal";
import { User, UserInputs } from "@/types";
import { useSelector } from "react-redux";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/users";

// Import PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Users: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { user, users, setUsers, setMeta, meta } = useContext(CommonContext);
  const userSlice = useSelector((state: any) => state.userSlice);
  // const role: string = userSlice.user.role;

  const fetchUsers = async () => {
    await getUsers({
      page,
      limit,
      searchKey,
      setLoading,
      setMeta,
      setUsers,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchKey]);

  const handleSubmit = async (userData: UserInputs) => {
    try {
      setLoading(true);
      if (selectedUser) {
        await updateUser({
          id: selectedUser.id,
          userData,
          setLoading,
        });
        toast.success("User updated successfully");
      } else {
        await createUser({
          userData,
          setLoading,
        });
        toast.success("User created successfully");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${selectedUser ? "update" : "create"} user`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      setLoading(true);
      await deleteUser({
        id: user.id,
        setLoading,
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusBodyTemplate = (rowData: User) => {
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          rowData.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {rowData?.status ?? rowData.status}
      </span>
    );
  };

  const roleBodyTemplate = (rowData: User) => {
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          rowData.role === "admin"
            ? "bg-purple-100 text-purple-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
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
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteUser(rowData)}
        >
          Delete
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
        <Header name={user?.firstName || "Admin"} />

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
                  >
                    <Column field="name" header="Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column
                      field="role"
                      header="Role"
                      body={roleBodyTemplate}
                      sortable
                    />
                    <Column
                      field="status"
                      header="Status"
                      body={statusBodyTemplate}
                      sortable
                    />
                    <Column header="Actions" body={actionBodyTemplate} />
                  </DataTable>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
        onSubmit={handleSubmit}
        isEdit={!!selectedUser}
      />
    </div>
  );
};

export default Users;
