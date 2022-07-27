import { Button, TextField } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

export const NewPostPage = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 0px 16px 0px 16px; //TRBL
`;

export const NewPostTextField = styled(TextField)`
  width: 100%;
`;

export const SubmitButton = styled(Button)``;

export const EditorDiv = styled.div`
  margin: 1rem 2rem;
`;
export const ImageUploadPreviewSection = styled.div`
  display: flex;
  margin: 8px;
  align-items: center;
  justify-content: center;
`;

export const ImagePreview = styled(Image)``;
