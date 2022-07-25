import { Button } from "@mui/material";
import { parseISO } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { CLOUDFRONT_URL } from "../../../constants/constants";
import {
  EventItemAdminCard,
  EventItemAdminDetail,
} from "./event_item_admin.style";

const EventItemAdmin = (props) => {
  const [src, setSrc] = useState(`${CLOUDFRONT_URL}/event/${props.data.item_type}`);
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
            console.log("SET EVENT ID", props.data.item_type);
            props.eventId(props.data.item_type);
            props.openModal();
          }}
        >
          Edit
        </Button>
      </EventItemAdminCard>
    </>
  );
};

export default EventItemAdmin;
