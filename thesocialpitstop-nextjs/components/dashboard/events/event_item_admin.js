import { Button } from "@mui/material";
import Image from "next/image";
import {
  EventItemAdminCard,
  EventItemAdminDetail,
} from "./event_item_admin.style";

const EventItemAdmin = (props) => {
  console.log(props.data);
  return (
    <>
      <EventItemAdminCard>
        <Image
          src={`https://ui-avatars.com/api/?name=Yue+Hern`}
          height={64}
          width={64}
          onError={() =>
            setSrc(`https://ui-avatars.com/api/?name=Yue+Hern`)
          }
        />
        <EventItemAdminDetail>
          <div>{props.data.event_name}</div>
          <div>{props.data.event_date}</div>
          <div>{props.data.details}</div>
        </EventItemAdminDetail>
        <Button
          onClick={() => {
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
