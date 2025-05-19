// components/vehicle/VehicleModal.tsx
import { Modal, Box, Typography } from "@mui/material";
import { VehicleForm } from "../forms/VehicleForm";
import { IVehicle, VehicleInputs } from "@/types";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

interface VehicleModalProps {
  open: boolean;
  onClose: () => void;
  initialData: VehicleInputs | IVehicle | null;
  onSubmit: (data: VehicleInputs) => Promise<void>;
  isEdit?: boolean;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  isEdit
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {initialData ? "Edit Vehicle" : "Add New Vehicle"}
        </Typography>
        <VehicleForm
          initialData={initialData as VehicleInputs}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </Box>
    </Modal>
  );
};
