import { TextField } from "@mui/material";
import styled from "styled-components";

export const ProfileForm = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileTextField = styled(TextField)`
  margin-bottom: 1rem;
`;
export const ProfileImageSection = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  gap: 1rem;
`;
export const Input = styled("input")({
  display: "none",
});