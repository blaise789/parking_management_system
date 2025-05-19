import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { userCreateReservation } from "@/services/reservations";
import { toast } from "react-hot-toast";
import { IVehicle } from "@/types";
import api from "@/api";

interface NewReservationModalProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

const NewReservationModal: React.FC<NewReservationModalProps> = ({
  visible,
  onHide,
  onSuccess,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user's vehicles
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/user/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);

  const handleSubmit = async () => {
    if (!selectedVehicle) {
      toast.error("Please select a vehicle");
      return;
    }

    try {
      setLoading(true);
      await userCreateReservation(selectedVehicle.id);
      toast.success("Reservation created successfully");
      onSuccess();
      onHide();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      header="New Parking Reservation"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <div className="p-fluid grid">
        <div className="field col-12">
          <label htmlFor="vehicle">Select Vehicle</label>
          <Dropdown
            id="vehicle"
            options={vehicles.map((v) => ({
              label: `${v.plateNumber} (${v.vehicleType}, ${v.size})`,
              value: v,
            }))}
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.value)}
            optionLabel="label"
            placeholder="Select your vehicle"
          />
        </div>
        <div className="field col-12 flex justify-end gap-2 mt-4">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-text"
          />
          <Button
            label="Submit"
            icon="pi pi-check"
            onClick={handleSubmit}
            loading={loading}
            disabled={!selectedVehicle}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default NewReservationModal;
