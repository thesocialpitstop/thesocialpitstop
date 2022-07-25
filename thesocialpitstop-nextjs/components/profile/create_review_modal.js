import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import { useProfile } from "../../api/profile_api";
import { CLOUDFRONT_URL } from "../../constants/constants";
import { CREATE_REVIEW } from "../../graphql/mutations";
import * as yup from "yup";
import { useRouter } from "next/router";

export const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const CreateReviewModal = ({ open, setOpen, id }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser();
  const router = useRouter();
  const profile = useProfile(user?.sub?.split("|")[1]);
  const [createReview] = useMutation(CREATE_REVIEW);
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
  const reviewId = Math.floor(Date.now() / 1000);

  const formik = useFormik({
    validationSchema: yup.object({
      rating: yup.string().required("Rating is required"),
      content: yup.string().required("Review is required")
    }),
    enableReinitialize: true,
    initialValues: {
      rating: undefined,
      content: "",
    },
    onSubmit: (values) => {
      console.log(values);
      createReview({
        variables: {
          user_id: id,
          item_type: `REVIEW#${user?.sub?.split("|")[1]}`,
          rating: values.rating,
          reviewer_id: user?.sub?.split("|")[1],
          review: values.content,
          reviewer_name: profile?.getItem.name,
        },
        onCompleted: (data) => {
          console.log("complete");
          console.log(data);
          router.reload();
          setOpen(false);
        },
      });
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="h5">Submit New Review</Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {profile ? (
                <ProfileImage
                  width={64}
                  height={64}
                  src={`${CLOUDFRONT_URL}/profile/${profile?.getItem.user_id}`}
                />
              ) : (
                <></>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >{`${profile?.getItem.name}`}</div>
                <div style={{ color: "grey", fontSize: "small" }}>
                  Posting this review publicly
                </div>
              </div>
            </div>

            <Rating
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            />
            <TextField
              id="content"
              name="content"
              label="Write a Review"
              multiline
              rows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              placeholder="Share your experience !"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={
                !(formik.isValid && formik.dirty && !formik.isSubmitting)
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateReviewModal;
