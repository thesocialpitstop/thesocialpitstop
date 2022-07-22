import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS_OF_USER } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import EventItem from "./event_item";
import { EventsItemDiv } from "./events.style";

const Events = (props) => {
  console.log(props);
  const [events, setEvents] = useState();
  const { data: eventData } = useQuery(GET_ALL_EVENTS_OF_USER, {
    variables: {
      user_id: props.id,
    },
  });

  useEffect(() => {
    if (eventData) {
      console.log(eventData);
      setEvents(eventData.queryUserWithItemTypePrefix.items);
    }
  }, [eventData]);

  const eventItems = events?.map((element) => {
    return <EventItem data={element} key={element.item_type}/>;
  });

  return (
    <>
      <h1>Events</h1>
      <EventsItemDiv>{eventItems}</EventsItemDiv>
    </>
  );
};

export default Events;
