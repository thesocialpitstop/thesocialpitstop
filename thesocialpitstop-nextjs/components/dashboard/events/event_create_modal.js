import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE } from "../../../constants/constants";
import { CREATE_EVENT } from "../../../graphql/mutations";
import { AddressAutocomplete } from "../profile/address_autocomplete";
import { eventCreateModalValidationSchema } from "./event_create_modal_validation_schema";
import {
  EventModalDiv,
  EventModalImage, EventModalInfoDiv,
  eventModalStyle,
  EventModalUploadSection
} from "./event_modals.style";

const EventCreateModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const { uploadToS3 } = useS3Upload();
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useUser();
  const [createEvent] = useMutation(CREATE_EVENT, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: "hello",
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: eventCreateModalValidationSchema,
    initialValues: {
      eventName: "",
      address: "",
      eventDetails: "",
      file: null,
    },
    onSubmit: async (values) => {
      let currentTimestamp = Math.floor(Date.now() / 1000);
      let eventID = `EVENT#${currentTimestamp}`;
      let date = new Date().toISOString();
      console.log(values);
      await uploadToS3(selectedImage, {
        endpoint: {
          request: {
            body: {
              directory: "event",
              user_id: currentTimestamp,
            },
          },
        },
      }).then((data) => {
        console.log(data);
        createEvent({
          variables: {
            user_id: user?.sub.split("|")[1],
            item_type: eventID,
            datetime: date,
            event_name: values.eventName,
            event_date: date,
            event_details: values.eventDetails,
            event_location: values.address,
            event_image: data.key,
          },
          onCompleted: (data) => {
            setOpen(false);
            console.log("success");
            console.log(data);
          },
          onError: (error) => {
            console.error(error);
          },
        });
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
      <Box sx={eventModalStyle}>
        <h1>Create New Event</h1>
        <form onSubmit={formik.handleSubmit}>
          <EventModalDiv>
            <EventModalUploadSection>
              <EventModalImage>
                <Image
                  layout="fill"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : PLACEHOLDER_IMAGE
                  }
                />
              </EventModalImage>
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  type="file"
                  accept=".png,.jpg"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </Button>
            </EventModalUploadSection>

            <EventModalInfoDiv>
              <TextField
                fullWidth
                id="eventName"
                name="eventName"
                label="Event Name"
                onChange={formik.handleChange}
                value={formik.values.eventName}
              />

              <AddressAutocomplete
                id="address"
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
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !(formik.isValid && formik.dirty && !formik.isSubmitting)
                }
              >
                Submit New Event
              </Button>
            </EventModalInfoDiv>
          </EventModalDiv>
        </form>
      </Box>
    </Modal>
  );
};

export default EventCreateModal;
