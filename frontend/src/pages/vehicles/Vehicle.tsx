// pages/vehicles.tsx
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { CommonContext } from "@/context/CommonContext";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "@/services/vehicles";
import { IVehicle, VehicleInputs } from "@/types";
import { FiSearch, FiPlus } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { VehicleModal } from "@/components/modals/VehicleModal";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// Import PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { VehicleModal } from "@/components/modals/VehicleModal";

const Vehicles: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<
    IVehicle | VehicleInputs | null
  >(null);

  const { user, vehicles, setVehicles, setMeta, meta } =
    useContext(CommonContext);
  console.log(vehicles);

  const userSlice = useSelector((state: any) => state.userSlice);
  const role: string = userSlice?.user.role;

  useEffect(() => {
    fetchVehicles();
  }, [page, limit, searchKey]);

  const fetchVehicles = async () => {
    await getVehicles({
      page,
      limit,
      setLoading,
      setMeta,
      setVehicles,
      searchKey,
    });
  };

  const handleSubmit = async (vehicleData: VehicleInputs) => {
    try {
      setLoading(true);
      if (selectedVehicle && "id" in selectedVehicle) {
        await updateVehicle({
          id: selectedVehicle.id,
          vehicleData,
          setLoading,
        });
        toast.success("Vehicle updated successfully");
      } else {
        await createVehicle({
          vehicleData,
          setLoading,
        });
        toast.success("Vehicle created successfully");
      }
      setIsModalOpen(false);
      fetchVehicles();
    } catch (error) {
      toast.error(`Failed to ${selectedVehicle ? "update" : "create"} vehicle`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicle: IVehicle) => {
    try {
      setLoading(true);
      await deleteVehicle({ id: vehicle.id, setLoading });
      toast.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch (error) {
      toast.error("Failed to delete vehicle");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestStatusBodyTemplate = (rowData: IVehicle) => {
    const hasRequests = rowData?.requests?.length > 0;
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          hasRequests
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {hasRequests ? "Requested" : "No Request"}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: IVehicle) => {
    return (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => {
            setSelectedVehicle(rowData);
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteVehicle(rowData)}
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
        <Header name={user.firstName} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {role === "ADMIN" ? "All Vehicles" : "Your Vehicles"}
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by plate number, brand, or type..."
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>

                  {role !== "ADMIN" && (
                    <button
                      className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        setSelectedVehicle(null);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiPlus /> Add Vehicle
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <DataTable
                    value={vehicles}
                    paginator
                    rows={limit}
                    totalRecords={meta?.total}
                    lazy
                    first={(page - 1) * limit}
                    onPage={handlePageChange}
                    loading={loading}
                    emptyMessage="No vehicles found"
                    className="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                  >
                    <Column
                      field="plateNumber"
                      header="PLATE NUMBER"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      sortable
                    />
                    <Column
                      field="vehicleType"
                      header="TYPE"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="brand"
                      header="brand"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="maker"
                      header="MAKER"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="color"
                      header="COLOR"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    />
                    <Column
                      header="REQUEST STATUS"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      body={requestStatusBodyTemplate}
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

      <VehicleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={
          selectedVehicle
            ? {
                plateNumber: selectedVehicle.plateNumber,
                vehicleType: selectedVehicle.vehicleType,
                brand: selectedVehicle.brand,
                color: selectedVehicle.color,
                size: selectedVehicle.size || "",
              }
            : null
        }
        onSubmit={handleSubmit}
        isEdit={!!selectedVehicle}
      />
    </div>
  );
};

export default Vehicles;
