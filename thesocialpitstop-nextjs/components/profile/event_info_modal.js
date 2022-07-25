import {
    Box, Modal
} from "@mui/material";
  
  const EventInfoModal = ({ open, setOpen, id }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "white",
      border: "2px solid #000",
      width: "80%",
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
        </Box>
      </Modal>
    );
  };
  
  export default EventInfoModal;
  