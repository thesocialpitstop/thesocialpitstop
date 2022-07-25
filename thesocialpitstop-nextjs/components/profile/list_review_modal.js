import { Box, Button, Modal, Rating, Typography } from "@mui/material"
import { useState } from "react";
import ReviewItem from "./review_item";
import { HeadingDiv, RatingDiv } from "./review_modal.style";
import { TitleDiv } from "./[id].style";

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
  

const ListReviewModal = ({ open, setOpen, profileData, initialItems, openCreateReviewModal }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const reviewItems = initialItems?.map((rev) => {
        return <ReviewItem key={rev.item_type} data={rev}/>
    });
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <HeadingDiv>
                    <TitleDiv>
                        <Typography variant="h5">{profileData?.name}</Typography>
                        <Typography variant="subtitle">{profileData?.address}</Typography>
                    </TitleDiv>
                    <Button 
                        variant="contained" 
                        onClick={openCreateReviewModal}
                    >
                        Leave a Review
                    </Button>

                </HeadingDiv>
                {/* <RatingDiv>
                    <span>4.2</span>
                    <Rating 
                        name={profileData?.name}
                        value={4}
                        readOnly
                    />
                </RatingDiv> */}
                {reviewItems}
            </Box>
        </Modal>
    )
}

export default ListReviewModal;