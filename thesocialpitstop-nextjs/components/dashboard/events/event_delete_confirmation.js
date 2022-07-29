import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useDeleteItem } from "../../../global_api/api.ts";
import { DELETE_ITEM } from "../../../graphql/mutations";
import { GET_ALL_EVENTS_OF_USER } from "../../../graphql/queries";
import { EventIdContext } from "./events_component";

const EventDeleteModal = ({ open, setOpen, userId }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { eventId, setEventId } = useContext(EventIdContext);
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-event-modal"
      aria-describedby="Modal to edit event"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Delete?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDeleteModal;
