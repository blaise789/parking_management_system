// components/parking/ParkingSlotModal.tsx
import { Modal, Box, Typography } from "@mui/material";
import { ParkingSlotForm } from "./ParkingSlotForm";
import { ParkingSlotInputs } from "@/types";

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

interface ParkingSlotModalProps {
  open: boolean;
  onClose: () => void;
  initialData: ParkingSlotInputs | null;
  onSubmit: (data: ParkingSlotInputs) => Promise<void>;
}

export const ParkingSlotModal: React.FC<ParkingSlotModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
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
          {initialData ? "Edit Parking Slot" : "Add New Parking Slot"}
        </Typography>
        <ParkingSlotForm
          initialData={initialData as ParkingSlotInputs}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </Box>
    </Modal>
  );
};
