import { useState } from "react";
import dynamic from 'next/dynamic';
import { 
  NewPostPage, 
  NewPostTextField, 
  SubmitButton,
  EditorDiv
} from "../../components/profile/newpost.style";
const ReactQuill = dynamic(
  import("react-quill"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);


const NewPost = () => {
  const [textContent, setTextContent] = useState()

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
  
  const handleSubmit = () => {
    console.log(textContent);
  }

    return(
      <NewPostPage>
        <h1>New Post</h1>
        <NewPostTextField label="Title"/>
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
        <SubmitButton onClick={handleSubmit} variant="contained">Post</SubmitButton>
      </NewPostPage>
    )
}

export default NewPost;