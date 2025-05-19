// components/modals/UserModal.tsx
import { Modal, Box, Typography } from "@mui/material";
import { UserForm } from "../forms/UserForm";
import { User, UserInputs } from "@/types";

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

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  initialData: User | UserInputs | null;
  onSubmit: (data: UserInputs) => Promise<void>;
  isEdit?: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  isEdit,
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
          {initialData ? "Edit User" : "Add New User"}
        </Typography>
        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isEdit={isEdit}
        />
      </Box>
    </Modal>
  );
};
