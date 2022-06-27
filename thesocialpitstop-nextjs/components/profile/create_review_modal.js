import { Box, Button, Modal, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../../graphql/mutations";
import { useUser } from "@auth0/nextjs-auth0";

const CreateReviewModal = ({open, setOpen, id}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user, error, isLoading } = useUser();
    const [rating, setRatingValue] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState();
    const [createReview, { data: updatedData } ] = useMutation(CREATE_REVIEW)
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
    const reviewId = new Date().toISOString();

    const formik = useFormik({
        enableReinitialize: true,    initialValues: {
            rating: undefined,
            content: '',
          },
        onSubmit: (values) => {
            console.log(values)
            createReview({
                variables: {
                    user_id: id,
                    item_type: `REVIEW#${reviewId}`,
                    rating: values.rating,
                    reviewer_id: user?.sub,
                    review: values.content,
                    reviewer_name: "SOO Company"
                },
                onCompleted: (data) => {
                    console.log("complete");
                    setOpen(false);
                }
            })
        },
      });

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h5">Submit New Review</Typography>
                    <Rating 
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                    />
                    <div>
                        <TextField
                            id="content"
                            name="content"
                            label="content"
                            multiline
                            maxRows={4}
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            placeholder="Share your experience !"
                            fullWidth
                        />
                    </div>
                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default CreateReviewModal;