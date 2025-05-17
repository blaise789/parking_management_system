// components/parking/BulkCreateParkingSlotModal.tsx
import { Modal, Box, Typography } from "@mui/material";
import { BulkCreateParkingSlotDto} from "@/types";
import { BulkCreateParkingSlotForm } from "./BulkCreateSlotForm";

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

interface BulkCreateParkingSlotModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BulkCreateParkingSlotDto) => Promise<void>;
}

export const BulkCreateParkingSlotModal: React.FC<BulkCreateParkingSlotModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="bulk-create-modal-title"
      aria-describedby="bulk-create-modal-description"
    >
      <Box sx={style}>
        <Typography id="bulk-create-modal-title" variant="h6" component="h2" mb={2}>
          Bulk Create Parking Slots
        </Typography>
        <BulkCreateParkingSlotForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </Box>
    </Modal>
  );
};