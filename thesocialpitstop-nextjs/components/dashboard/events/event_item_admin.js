import { Button } from "@mui/material";
import { parseISO } from "date-fns";
import Image from "next/image";
import { useContext, useState } from "react";
import { CLOUDFRONT_URL } from "../../../constants/constants";
import { EventIdContext } from "./events_component";
import {
  EventItemAdminCard,
  EventItemAdminDetail,
} from "./event_item_admin.style";

const EventItemAdmin = (props) => {
  const [src, setSrc] = useState(`${CLOUDFRONT_URL}/${props.data.event_image}`);
  const {eventId, setEventId} = useContext(EventIdContext);  

  return (
    <>
      <EventItemAdminCard>
        <Image
          src={src}
          height={64}
          width={64}
          onError={() =>
            setSrc(`https://ui-avatars.com/api/?name=${props.data.event_name}`)
          }
        />
        <EventItemAdminDetail>
          <div>{props.data.event_name}</div>
          <div>{parseISO(props.data.event_date).toDateString()}</div>
          <div>{props.data.details}</div>
        </EventItemAdminDetail>
        <Button
          onClick={() => {
            props.eventId(props.data.item_type);
            props.openEditModal(props);
          }}
        >
          Edit
        </Button>
        <Button
            sx={{ bgcolor: "error.main" }}

        variant="contained"
          onClick={() => {
            console.log("delete event")
            props.openDeleteModal();
            setEventId(props.data.item_type);
          }}
        >
          Delete
        </Button>
      </EventItemAdminCard>
    </>
  );
};

export default EventItemAdmin;
