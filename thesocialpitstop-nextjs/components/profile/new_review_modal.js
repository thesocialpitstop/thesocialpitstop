import { Box, Button, Modal, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";

const NewReviewModal = ({open, setOpen}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rating, setRatingValue] = useState();
    const [textFieldValue, setTextFieldValue] = useState();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        border: '2px solid #000',
        width: '80%',
        boxShadow: 24,
        p: 4,
    };

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
      };

    const handleSubmit = () => {
        console.log();
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography variant="h5">Submit New Review</Typography>
                <Rating 
                    name="controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRatingValue(newValue);
                    }} 
                />
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={textFieldValue}
                        onChange={handleChange}
                        placeholder="Share your experience !"
                        fullWidth
                    />
                </div>
                <div>
                    <Button variant="contained">Submit</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default NewReviewModal;