import { useMutation } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, TextField } from "@mui/material";
import { useS3Upload } from "next-s3-upload";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  EditorDiv, ImagePreview, ImageUploadPreviewSection, NewPostPage,
  SubmitButton
} from "../../components/profile/newpost.style";
import { PLACEHOLDER_IMAGE } from "../../constants/constants";
import { formats, modules } from "../../constants/quill_config";
import { useProfile } from "../../global_api/profile_api";
import { CREATE_POST } from "../../graphql/mutations";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const NewPost = () => {
  const { uploadToS3 } = useS3Upload();
  const [title, setTitle] = useState();
  const [contentText, setContentText] = useState();
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      user_id: user?.sub,
    },
  });
  const { user } = useUser();
  const userID = user?.sub.split("|")[1];
  const profile = useProfile(userID);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  // PLACEHOLDER CONSTS: REPLACE WITH QUERY FOR USER DETAILS
  const postID = Math.floor(Date.now() / 1000);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(title, contentText);
    await uploadToS3(selectedImage, {
      endpoint: {
        request: {
          body: {
            directory: "posts",
            user_id: postID,
          },
        },
      },
    }).then((data) => {
      console.log(data);
      createPost({
        variables: {
          content: contentText,
          datetime: new Date().toISOString(),
          item_type: `POST#${postID}`,
          name: profile?.getItem.name,
          title: title,
          user_id: userID,
        },
        onCompleted: (data) => {
          console.log("complete");
        },
      });
      router.push(`/${userID}/${postID}`);
    });
  };

  return (
    <NewPostPage>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <ImageUploadPreviewSection>
          <ImagePreview
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : PLACEHOLDER_IMAGE
            }
            width={128}
            height={128}
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              id="new-post-file-upload"
              accept=".png,.jpg,.jpeg"
              type="file"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </Button>
        </ImageUploadPreviewSection>

        <TextField
          // required
          label="Title"
          onInput={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <h3>Content</h3>
        <EditorDiv>
          <ReactQuill
            modules={modules}
            formats={formats}
            theme="snow"
            style={{ height: 300 }}
            onChange={setContentText}
          />
        </EditorDiv>
        <br />
        <br />
        <br />
        <br />
        <br />
        <SubmitButton type="submit" variant="contained">
          Post
        </SubmitButton>
      </form>
    </NewPostPage>
  );
};

export default withPageAuthRequired(NewPost);
