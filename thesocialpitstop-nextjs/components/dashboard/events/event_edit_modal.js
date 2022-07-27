import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { FormatStrikethroughOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Input, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CLOUDFRONT_URL } from "../../../constants/constants";
import { UPDATE_EVENT, UPDATE_POST } from "../../../graphql/mutations";
import { GET_ALL_EVENTS_OF_USER, GET_EVENT } from "../../../graphql/queries";
import { AddressAutocomplete } from "../profile/address_autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "fit-content(20em)",
  width: "90%",
  height: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EventEditModal = ({ open, setOpen, eventId, data }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser();
  const [event, setEvent] = useState();
  const [src, setSrc] = useState(`${CLOUDFRONT_URL}/event/${eventId.split("#")[1]}`);

  const {
    data: eventData,
    loading: eventLoading,
    error: eventError,
  } = useQuery(GET_EVENT, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: eventId,
    },
  });
  const [
    updateEvent,
  ] = useMutation(UPDATE_EVENT, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: eventId,
    },
    refetchQueries: [{ query: GET_ALL_EVENTS_OF_USER }, "GetAllEvents"],

  });

  useEffect(() => {
    if (eventData) {
      console.log(eventData);
      setEvent(eventData.getItem)
    }
  }, [eventData]);

  const formik = useFormik({
    initialValues: {
      event_name: data?.event_name,
      event_details: data?.event_details,
      address: data?.event_location,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      updateEvent({
        variables: {
          event_name: values.event_name,
          event_details: values.event_details,
          event_location: values.event_location,
        }, 
        onCompleted: (data) => {
          console.log(data);
          handleClose();
        }
      })
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-event-modal"
      aria-describedby="Modal to edit event"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <Image
              src={src}
              height={64}
              width={64}
              onError={() =>
                setSrc(`https://ui-avatars.com/api/?name=${event?.event_name}`)
              }
            />
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                type="file"
                accept=".png,.jpg"
                id="contained-button-file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0])}}
              />
            </Button>
            <TextField
              fullWidth
              id="event_name"
              name="event_name"
              label="Event Name"
              value={formik.values.event_name || ""}
              onChange={formik.handleChange}
            />
            <AddressAutocomplete
              id="event_location"
              name="event_location"
              label="event_location"
              defaultValue={{ ADDRESS: event?.event_location }}
              inputValue={formik.values.event_location || ""}
              setFieldValue={formik.setFieldValue}
            />
            <TextField
              fullWidth
              id="event_details"
              name="event_details"
              label="Event Details"
              rows={4}
              multiline
              value={formik.values.event_details || ""}
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EventEditModal;
