import { useUser } from "@auth0/nextjs-auth0";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Input, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import modal_style, { modalStyle } from "../modal_style";
import { CREATE_EVENT } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_EVENTS_OF_USER } from "../../../graphql/queries";
import { AddressAutocomplete } from "../profile/address_autocomplete";

const EventCreateModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser();
  const [createEvent] = useMutation(CREATE_EVENT);

  const handleInputChange = async (event) => {
    console.log(event);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eventName: "",
      eventDetails: "",
    },
    onSubmit: (values) => {
      console.log(values);
      createEvent({
        variables: {
          user_id: user?.sub.split("|")[1],
          item_type: `EVENT#${Math.floor(Date.now() / 1000)}`,
          datetime: new Date().toISOString(),
          event_name: values.eventName,
          event_date: new Date().toISOString(),
          event_details: values.eventDetails,
        },
        onCompleted: (data) => {
          setOpen(false);
          console.log("success");
        },
        onError: (error) => {
          console.error(error);
        },
      });
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-event-modal"
      aria-describedby="Modal to edit event"
    >
      <Box sx={modalStyle}>
        <h1>Create New Event</h1>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>

            <TextField
              fullWidth
              id="eventName"
              name="eventName"
              label="Event Name"
              onChange={formik.handleChange}
              value={formik.values.eventName}
            />

            <AddressAutocomplete
              name="address"
              label="Address"
              inputValue={formik.values.address || ""}
              setFieldValue={formik.setFieldValue}
            />
            <TextField
              fullWidth
              id="eventDetails"
              name="eventDetails"
              label="Event Details"
              rows={4}
              multiline
              onChange={formik.handleChange}
              value={formik.values.eventDetails}
            />
            <Button type="submit" variant="contained">
              Submit New Event
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EventCreateModal;
