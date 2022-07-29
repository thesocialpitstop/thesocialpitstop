import { useMutation } from "@apollo/client";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useDeleteItem } from "../../../global_api/api.ts";
import { DELETE_ITEM } from "../../../graphql/mutations";
import { GET_ALL_EVENTS_OF_USER } from "../../../graphql/queries";
import { EventIdContext } from "./events_component";

const EventDeleteModal = ({ open, setOpen, userId }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {eventId, setEventId} = useContext(EventIdContext);  
  const handleDelete = () => {
    deleteEvent({
      onCompleted: (data) => {
        console.log("success delete");
        console.log(data);
        handleClose();
      },
    });
  };
  const [deleteEvent] = useMutation(DELETE_ITEM, {
    variables: {
      user_id: userId,
      item_type: eventId,
    },
  refetchQueries: [{ query: GET_ALL_EVENTS_OF_USER }, "GetAllEvents"],
  });

    const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "fit-content(20em)",
    width: "90%",
    height: "30%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-event-modal"
      aria-describedby="Modal to edit event"
    >
      <Box sx={style}>
        <h1>Confirm Delete?{eventId}</h1>
        <>
            <Button variant="contained" onClick={handleDelete}>Yes</Button>
            <Button variant="contained" onClick={handleClose}>No</Button>
        </>
      </Box>
    </Modal>
  );
};

export default EventDeleteModal;
