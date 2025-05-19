import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FiPlus, FiX } from "react-icons/fi";
import {
  userGetMyReservations,
  //   userCreateReservation,
  userCancelReservation,
} from "@/services/reservations";
import { ParkingReservation } from "@/types";
import NewReservationModal from "@/components/modals/NewReservationModals";

const UserReservations = () => {
  const [reservations, setReservations] = useState<ParkingReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await userGetMyReservations();
      setReservations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId: string) => {
    try {
      await userCancelReservation(reservationId);
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const statusBodyTemplate = (rowData: ParkingReservation) => {
    return (
      <span className={`status-badge ${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: ParkingReservation) => {
    return (
      <div className="flex gap-2">
        {rowData.status === "PENDING" && (
          <Button
            icon={<FiX />}
            className="p-button-danger"
            onClick={() => handleCancel(rowData.id)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Parking Reservations</h1>
        <Button
          icon={<FiPlus />}
          label="New Reservation"
          onClick={() => setModalVisible(true)}
        />
      </div>

      <DataTable
        value={reservations}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="No reservations found"
      >
        <Column field="vehicle.plateNumber" header="Vehicle" />
        <Column field="vehicle.vehicleType" header="Type" />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column field="createdAt" header="Date" />
        <Column
          header="Parking Slot"
          body={(rowData) =>
            rowData.parkingSlot
              ? `${rowData.parkingSlot.slotNumber} (${rowData.parkingSlot.location})`
              : "Pending assignment"
          }
        />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>

      <NewReservationModal
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        onSuccess={fetchReservations}
      />
    </div>
  );
};

export default UserReservations;
