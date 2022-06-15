import { Box, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const ReviewModal = ({ open, setOpen, id }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography>Hello</Typography>
            </Box>
        </Modal>
    )
}

export default ReviewModal;