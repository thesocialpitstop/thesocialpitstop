import {
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { formats, modules } from "../../../constants/quill_config";
import { GET_POST } from "../../../graphql/queries";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { UPDATE_POST } from "../../../graphql/mutations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "fit-content(20em)",
  width: "90%",
  height: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const validationSchema = yup.object({
  title: yup.string("Enter your title").required("title is required"),
  content: yup.string("Enter your password").required("Name is required"),
});

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const PostEditModal = ({ open, setOpen, postId }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, error, isLoading } = useUser();
  const [titleText, setTitleText] = useState();
  const [contentText, setContentText] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_POST, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: postId,
    },
  });
  const [
    updatePost,
    { data: updatedData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_POST, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: postId,
    },
  });

  useEffect(() => {
    if (posts) {
      setContentText(posts.getItem?.content);
      setTitleText(posts.getItem?.title);
    }
    if (error) {
      console.log(error);
    }
  }, [posts]);
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: posts?.getItem?.title,
      content: contentText,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updatePost({
        variables: {
          title: values.title,
          content: values.content,
        },
        onCompleted: (data) => {
          console.log("complete");
          console.log(data);
          setOpenSnackbar(true);
          setOpen(false);
        },
      });
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-post-modal"
      aria-describedby="Modal to edit post"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            label="Post Title"
            fullWidth
            value={posts?.getItem?.title}
            onChange={formik.handleChange}
          />
          <Typography id="edit-post-modal-content" variant="h6" component="h2">
            Content
          </Typography>
          {postsLoading ? (
            "loading"
          ) : (
            <ReactQuill
              modules={modules}
              formats={formats}
              theme="snow"
              defaultValue={contentText}
              style={{ height: 300, marginBottom: "170px" }}
              onChange={setContentText}
            />
          )}
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PostEditModal;
