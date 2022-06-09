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
const ReactQuill = dynamic(
  import("react-quill"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);


const NewPost = () => {
  const [title, setTitle] = useState();
  const [textContent, setTextContent] = useState("");
  const [createPost] = useMutation(CREATE_POST);
  const router = useRouter();

  // PLACEHOLDER CONSTS: REPLACE WITH QUERY FOR USER DETAILS
  const userID = '54321';
  const orgType = 'SOO';
  const orgName = 'Test SOO';
  const postID = '1';

  const modules = {
    toolbar: [
      [{ header: [] }, { font: [] }],
      [{ color: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { script: 'sub'},
        { script: 'super' }
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  
  const formats = [
    'header',
    'font',
    'color',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'script',
    'link',
    'image',
    'video',
  ]
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, textContent);
    createPost({
      variables: {
        content: textContent, 
        datetime: new Date().toISOString(), 
        item_type: `${orgType}-POST#${postID}`, 
        name: orgName, 
        title: title,
        user_id: userID
      }
    });
    router.push(`/${userID}/${postID}`);
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
              value={textContent}
              onChange={setTextContent}
            />
          </EditorDiv>
          <br />
          <SubmitButton type="submit" variant="contained">Post</SubmitButton>
        </form>
      </NewPostPage>
    )
}

export default NewPost;