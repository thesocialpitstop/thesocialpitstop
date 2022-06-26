import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { formats, modules } from "../../../../constants/quill_config";
import { GET_POST } from "../../../../graphql/queries";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "fit-content(20em)",
  width: "90%",
  height: "80%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReactQuill = dynamic(
  import("react-quill"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

const PostEditModal = ({ open, setOpen, postId }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, error, isLoading } = useUser();
  const [titleText, setTitleText] = useState();
  const [contentText, setContentText] = useState();

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_POST, {
    variables: {
      user_id: user?.sub,
      item_type: postId,
    },
  });

  const handleSubmit = (event) => {
    console.log()
  }
 

  useEffect(() => {
    if (posts) {
      setContentText(posts.getItem?.content);
      setTitleText(posts.getItem?.title);
    }
    if (error) {
      console.log(error);
    }
  }, [posts]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-post-modal"
      aria-describedby="Modal to edit post"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Typography id="edit-post-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextField  fullWidth value={titleText} />
          <Typography id="edit-post-modal-content" variant="h6" component="h2">
            Content
          </Typography>
          {postsLoading ? "loading" : <ReactQuill 
            modules={modules} 
            formats={formats}
            theme="snow" 
            defaultValue={contentText}
            style={{ height:300 }}
            onChange={setContentText}
          />}
          <Button type="submit" variant="contained">Save</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PostEditModal;
