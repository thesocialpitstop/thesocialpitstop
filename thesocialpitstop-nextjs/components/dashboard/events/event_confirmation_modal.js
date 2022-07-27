import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { modalStyle } from "../modal_style";

const EventCreateModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-event-modal"
      aria-describedby="Modal to edit event"
    >
      <Box sx={modalStyle}>
        <h1>Confirm Delete?</h1>

      </Box>
    </Modal>
  );
};

export default EventCreateModal;
