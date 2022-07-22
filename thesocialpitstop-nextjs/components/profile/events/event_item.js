import Image from "next/image";
import PropTypes from "prop-types";
import {
  EventCard,
  EventCardInfo,
  EventCardTitle,
  EventCardDate,
  EventCardLocation,
} from "./event_item.style";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { parseISO } from "date-fns";
import { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import { EventModalContext } from "../../../pages/profile/event_context";

const EventItem = (props) => {
  const [src, setSrc] = useState(props.image_url ? props.image_url : "/");
  return (
    <EventCard>
      <Image
        src={src}
        layout="responsive"
        height={64}
        width={64}
        onError={() =>
          setSrc(`https://ui-avatars.com/api/?name=${props.data.event_name}`)
        }
      />

      <EventCardInfo>
        <EventModalContext.Consumer>
          {(eventInfoModal) => <div>{eventInfoModal}</div>}
        </EventModalContext.Consumer>
        <EventCardTitle>{props.data.event_name}</EventCardTitle>
        <EventCardDate>
          <DateRangeIcon />
          {parseISO(props.data.event_date).toDateString()}
        </EventCardDate>
        <EventCardLocation>
          <RoomIcon />
          {props.data.event_location}
        </EventCardLocation>
      </EventCardInfo>
    </EventCard>
  );
};

EventItem.propTypes = {
  event_name: PropTypes.string,
};

export default EventItem;
