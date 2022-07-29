import styled from "styled-components";

export const eventModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "fit-content(20em)",
  width: "90%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EventModalDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 16px;
`;

export const EventModalUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EventModalInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EventModalImage = styled.div`
  position: relative;
  height: 100%;
`;
