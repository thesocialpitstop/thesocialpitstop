import { useState } from "react";
import dynamic from 'next/dynamic';
import { TextField } from "@mui/material";
import { 
  NewPostPage,
  SubmitButton,
  EditorDiv
} from "../../components/profile/newpost.style";
import { CREATE_POST } from '../../graphql/mutations';
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { formats, modules } from "../../constants/quill_config";

const ReactQuill = dynamic(
  import("react-quill"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);



const NewPost = () => {
  const [title, setTitle] = useState();
  const [contentText, setContentText] = useState();
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      user_id: user?.sub, 
    },
  });
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  // PLACEHOLDER CONSTS: REPLACE WITH QUERY FOR USER DETAILS
  const userID = user?.sub;
  const orgType = 'SOO';
  const orgName = 'Test SOO';
  const postID = Date.now();

  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, contentText);
    createPost({
      variables: {
        content: contentText, 
        datetime: new Date().toISOString(), 
        item_type: `POST#${userID}#${postID}`, 
        name: orgName, 
        title: title,
        user_id: userID
      },            
      onCompleted: (data) => {
        console.log("complete");
      }
    });
    // router.push(`/${userID}/${postID}`);
  }

    return(
      <NewPostPage>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label="Title"
            onInput={e => setTitle(e.target.value)}
            fullWidth
          />
          <h3>Content</h3>
          <EditorDiv>
            <ReactQuill 
              modules={modules} 
              formats={formats}
              theme="snow" 
              style={{ height:300 }}
              onChange={setContentText}
            />
          </EditorDiv>
          <br />
          <br />
          <br />
          <br />
          <br />
          <SubmitButton type="submit" variant="contained">Post</SubmitButton>
        </form>
      </NewPostPage>
    )
}

export default withPageAuthRequired(NewPost);