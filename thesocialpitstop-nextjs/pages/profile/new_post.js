import { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@mui/material";

const ReactQuill = dynamic(
  import("react-quill"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

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
  const title = document.getElementById('title').value;
  const content = document.querySelector('.ql-editor').innerHTML;
  const datetime = new Date().toISOString();
}

const NewPost = () => {
    return(
      <>
        <h1>New Post</h1>
        <h3>Title</h3>
        <input type="text" id="title" />
        <h3>Content</h3>
        <ReactQuill modules={modules} formats={formats} theme="snow"/>
        <button onClick={handleSubmit}>Post</button>
      </>
    )
}

export default NewPost;