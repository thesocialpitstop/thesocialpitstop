import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CLOUDFRONT_URL } from "../../../constants/constants";
import { UPDATE_EVENT } from "../../../graphql/mutations";
import { GET_ALL_EVENTS_OF_USER, GET_EVENT } from "../../../graphql/queries";
import { AddressAutocomplete } from "../profile/address_autocomplete";
import {
  EventModalDiv,
  EventModalImage,
  EventModalInfoDiv,
  eventModalStyle,
  EventModalUploadSection,
} from "./event_modals.style";

const EventEditModal = ({ open, setOpen, eventId, data }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser();
  const [event, setEvent] = useState();
  const [src, setSrc] = useState(
    `https://ui-avatars.com/api/?name=${data?.event_name}`
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const { uploadToS3 } = useS3Upload();

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
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: eventId,
    },
    refetchQueries: [{ query: GET_ALL_EVENTS_OF_USER }, "GetAllEvents"],
  });

  useEffect(() => {
    if (eventData) {
      console.log(eventData);
      setEvent(eventData.getItem);
      setSrc(`${CLOUDFRONT_URL}/${eventData?.getItem?.event_image}`);
    }
  }, [eventData]);

  const formik = useFormik({
    initialValues: {
      event_name: data?.event_name,
      event_details: data?.event_details,
      address: data?.event_location,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(imageChanged);
      if (imageChanged) {
        await uploadToS3(selectedImage, {
          endpoint: {
            request: {
              body: {
                directory: "event",
                user_id: event.item_type.split("#")[1],
              },
            },
          },
        })
          .then((data) => {
            console.log(data);
            updateEvent({
              variables: {
                event_name: values.event_name,
                event_details: values.event_details,
                event_location: values.event_location,
                event_image: data.key,
              },
              onCompleted: (data) => {
                console.log(data);
                handleClose();
              },
            });
          })
          .catch((error) => console.error(error));
      } else {
        updateEvent({
          variables: {
            event_name: values.event_name,
            event_details: values.event_details,
            event_location: values.event_location,
          },
          onCompleted: (data) => {
            console.log(data);
            handleClose();
          },
        });
      }
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
        <h1>Edit Event</h1>

        <form onSubmit={formik.handleSubmit}>
          <EventModalDiv>
            <EventModalUploadSection>
              <EventModalImage>
                <Image
                  src={src}
                  layout="fill"
                  onError={() =>
                    setSrc(
                      `https://ui-avatars.com/api/?name=${event?.event_name}`
                    )
                  }
                />
              </EventModalImage>

              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  type="file"
                  accept=".png,.jpg"
                  id="contained-button-file"
                  onChange={(event) => {
                    setImageChanged(true);
                    setSrc(URL.createObjectURL(event.currentTarget.files[0]));
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </Button>
            </EventModalUploadSection>

            <EventModalInfoDiv>
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
            </EventModalInfoDiv>
          </EventModalDiv>
        </form>
      </Box>
    </Modal>
  );
};

export default EventEditModal;
