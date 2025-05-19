import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FiCheck, FiX } from "react-icons/fi";
import {
  adminGetAllReservations,
  adminApproveReservation,
  adminRejectReservation,
  adminAssignSlot,
} from "@/services/reservations";
import {
  IParkingSlot,
  ParkingReservation,
  ReservationStatus,
  VehicleSize,
  VehicleType,
} from "@/types";
import { getAvailableSlots } from "@/services/reservations";

const AdminReservations = () => {
  const [reservations, setReservations] = useState<ParkingReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | null>(
    null
  );

  useEffect(() => {
    fetchReservations();
  }, [statusFilter]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await adminGetAllReservations();
      setReservations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await adminApproveReservation(id);
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminRejectReservation(id);
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignSlot = async (reservationId: string, slotId: string) => {
    try {
      await adminAssignSlot(reservationId, slotId);
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
          <>
            <Button
              icon={<FiCheck />}
              className="p-button-success"
              onClick={() => handleApprove(rowData.id)}
            />
            <Button
              icon={<FiX />}
              className="p-button-danger"
              onClick={() => handleReject(rowData.id)}
            />
          </>
        )}
        {rowData.status === "PENDING" && rowData.vehicle && (
          <SlotAssignment
            reservationId={rowData.id}
            vehicleType={rowData.vehicle.vehicleType}
            vehicleSize={rowData.vehicle.size}
            onAssign={handleAssignSlot}
          />
        )}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Parking Reservations</h1>
        <div className="flex gap-4">
          <Dropdown
            value={statusFilter}
            options={[
              { label: "All", value: null },
              ...Object.values(ReservationStatus).map((status) => ({
                label: status,
                value: status,
              })),
            ]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filter by status..."
          />
        </div>
      </div>

      <DataTable
        value={reservations.filter((res) =>
          statusFilter ? res.status === statusFilter : true
        )}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="No reservations found"
      >
        <Column
          field="user.firstName"
          header="User"
          body={(data) => `${data.user.firstName} ${data.user.lastName}`}
        />
        <Column field="vehicle.plateNumber" header="Vehicle" />
        <Column field="vehicle.vehicleType" header="Type" />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column field="createdAt" header="Date" />
        <Column
          header="Parking Slot"
          body={(rowData) =>
            rowData.parkingSlot
              ? `${rowData.parkingSlot.slotNumber} (${rowData.parkingSlot.location})`
              : "Not assigned"
          }
        />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

const SlotAssignment = ({
  reservationId,
  vehicleType,
  vehicleSize,
  onAssign,
}: {
  reservationId: string;
  vehicleType: VehicleType;
  vehicleSize: VehicleSize;
  onAssign: (reservationId: string, slotId: string) => void;
}) => {
  const [slots, setSlots] = useState<IParkingSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const availableSlots = await getAvailableSlots(
          vehicleType,
          vehicleSize
        );
        setSlots(availableSlots);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [vehicleType, vehicleSize]);

  return (
    <div className="flex gap-2 items-center">
      <Dropdown
        value={selectedSlot}
        options={slots.map((slot) => ({
          label: `${slot.slotNumber} (${slot.location})`,
          value: slot.id,
        }))}
        onChange={(e) => setSelectedSlot(e.value)}
        placeholder="Select slot"
        disabled={loading || slots.length === 0}
      />
      <Button
        icon={<FiCheck />}
        className="p-button-success"
        disabled={!selectedSlot}
        onClick={() => selectedSlot && onAssign(reservationId, selectedSlot)}
      />
    </div>
  );
};

export default AdminReservations;
