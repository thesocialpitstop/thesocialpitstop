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
import { useRouter } from "next/router";
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "../../../constants/constants";
import { eventCreateModalValidationSchema } from "./event_create_modal_validation_schema";

const EventCreateModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const { uploadToS3 } = useS3Upload();
  const handleClose = () => setOpen(false);
  const [picture, setPicture] = useState();
  const { user } = useUser();
  const [createEvent] = useMutation(CREATE_EVENT);
  const { router } = useRouter();

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
    validationSchema: eventCreateModalValidationSchema,
    initialValues: {
      eventName: "",
      eventDetails: "",
      file: null,
    },
    onSubmit: async (values) => {
      let eventID = `EVENT#${Math.floor(Date.now() / 1000)}`;
      console.log(values);
      await uploadToS3(values.file, {
        endpoint: {
          request: {
            body: {
              directory: "event",
              eventID: eventID,
            },
          },
        },
      });
      createEvent({
        variables: {
          user_id: user?.sub.split("|")[1],
          item_type: eventID,
          datetime: new Date().toISOString(),
          event_name: values.eventName,
          event_date: new Date().toISOString(),
          event_details: values.eventDetails,
          event_location: values.address,
        },
        onCompleted: (data) => {
          setOpen(false);
          console.log("success");
          console.log(data);
          router.reload();
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
            <div style={{ display: "flex", gap: "16px", flexDirection: "row" }}>
              <Image
                width={64}
                height={64}
                src={picture ? picture : PLACEHOLDER_IMAGE}
              />
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  type="file"
                  accept=".png,.jpg"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        formik.setFieldValue("file", fileReader.result);
                        setPicture(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(event.target.files[0]);
                  }}
                />
              </Button>
            </div>

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
            <Button type="submit" variant="contained" 
          disabled={!(formik.isValid && formik.dirty && !formik.isSubmitting)}
          >
              Submit New Event
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EventCreateModal;
