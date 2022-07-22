import { TextField } from "@mui/material";
import styled from "styled-components";

export const ProfileForm = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileTextField = styled(TextField)`
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

export const DashboardProfileEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`