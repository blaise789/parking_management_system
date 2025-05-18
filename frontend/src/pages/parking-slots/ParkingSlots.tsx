import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { CommonContext } from "@/context/CommonContext";
import {
  getParkingSlots,
  createParkingSlot,
  updateParkingSlot,
  deleteParkingSlot,
  bulkCreateParkingSlots,
} from "@/services/parking";
import { IParkingSlot, ParkingSlotInputs } from "@/types";
import { FiSearch, FiPlus } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ParkingSlotModal } from "@/components/modals/ParkingSlotModal";
import { toast } from "react-hot-toast";
import { BulkCreateParkingSlotDto } from "@/types";

// Import only necessary PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { BulkCreateParkingSlotModal } from "@/components/modals/BulkCreateModal";

const ParkingSlots: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<IParkingSlot | null>(null);
  // Add this state with your other useState declarations
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  // Add this handler function with your other handlers
  const handleBulkCreate = async (data: BulkCreateParkingSlotDto) => {
    try {
      setLoading(true);
      const response = await bulkCreateParkingSlots({
        ...data,
        setLoading,
      });

      if (response) {
        toast.success(`Successfully created ${data.count} parking slots`);
        fetchParkingSlots();
      } else {
        toast.error("Failed to create parking slots");
      }
    } catch (error) {
      toast.error("Failed to bulk create parking slots");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setIsBulkModalOpen(false);
    }
  };

  const { user, parkingSlots, setParkingSlots, setMeta, meta } =
    useContext(CommonContext);

  useEffect(() => {
    fetchParkingSlots();
  }, [page, limit, searchKey]);

  const fetchParkingSlots = async () => {
    await getParkingSlots({
      page,
      limit,
      setLoading,
      setMeta,
      setParkingSlots,
      searchKey,
    });
  };

  const handleSubmit = async (slotData: ParkingSlotInputs) => {
    try {
      setLoading(true);
      if (selectedSlot) {
        await updateParkingSlot({ id: selectedSlot.id, setLoading, slotData });
        toast.success("Parking slot updated successfully");
      } else {
        await createParkingSlot({ setLoading, slotData });
        toast.success("Parking slot created successfully");
      }
      setIsModalOpen(false);
      fetchParkingSlots();
    } catch (error) {
      toast.error(
        `Failed to ${selectedSlot ? "update" : "create"} parking slot`
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slot: IParkingSlot) => {
    try {
      setLoading(true);
      await deleteParkingSlot({ id: slot.id, setLoading });
      toast.success("Parking slot deleted successfully");
      fetchParkingSlots();
    } catch (error) {
      toast.error("Failed to delete parking slot");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusBodyTemplate = (rowData: IParkingSlot) => {
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          rowData.status === "AVAILABLE"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {rowData.status}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: IParkingSlot) => {
    return (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => {
            setSelectedSlot(rowData);
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteSlot(rowData)}
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
                  Parking Slots
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by slot number, type, size, or location..."
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={()=>setIsBulkModalOpen(!isBulkModalOpen)}>
                      <FiPlus /> Bulk Create
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        setSelectedSlot(null);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiPlus /> Add Slot
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <DataTable
                    value={parkingSlots}
                    paginator
                    rows={limit}
                    totalRecords={meta?.total}
                    lazy
                    first={(page - 1) * limit}
                    onPage={handlePageChange}
                    loading={loading}
                    emptyMessage="No parking slots found"
                    className="border-none"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                  >
                    <Column
                      field="slotNumber"
                      header="SLOT NUMBER"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      sortable
                    />
                    <Column
                      field="vehicleType"
                      header="VEHICLE TYPE"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="size"
                      header="SIZE"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="location"
                      header="LOCATION"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      bodyClassName="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      sortable
                    />
                    <Column
                      field="status"
                      header="STATUS"
                      headerClassName="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                      body={statusBodyTemplate}
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

      {/* Parking Slot Modal */}
      <ParkingSlotModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // To this:
        initialData={
          selectedSlot
            ? {
                slotNumber: selectedSlot.slotNumber,
                vehicleType: selectedSlot.vehicleType,
                size: selectedSlot.size,
                location: selectedSlot.location,
                status: selectedSlot.status,
              }
            : null
        }
        onSubmit={handleSubmit}
      />
      <BulkCreateParkingSlotModal
        open={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSubmit={handleBulkCreate}
      />
    </div>
  );
};

export default ParkingSlots;
