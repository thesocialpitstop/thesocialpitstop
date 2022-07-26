import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_ALL_EVENTS_OF_USER } from "../../../graphql/queries";
import EventCreateModal from "./event_create_modal";
import EventEditModal from "./event_edit_modal";
import EventItemAdmin from "./event_item_admin";

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const { user } = useUser();
  const [editModalState, setEditModal] = useState(false);
  const [createModalState, setCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [deleteModalState, setDeleteModalState] = useState(false);

  const { data: eventData } = useQuery(GET_ALL_EVENTS_OF_USER, {
    variables: {
      user_id: user?.sub.split("|")[1],
    },
  });

  const openEditModal = (data) => {
    console.log(data.data);
    setSelectedEvent(data.data);
    setEditModal(true);
  };

  const openCreateModal = () => {
    setCreateModal(true);
  };

  const openDeleteModal = () => {
    setDeleteModalState(true);
  }

  useEffect(() => {
    if (eventData) {
      console.log(eventData.queryUserWithItemTypePrefix.items);
      setEvents(eventData.queryUserWithItemTypePrefix.items);
    }
  }, [eventData]);

  const eventItems = events.map((data) => {
    return <EventItemAdmin key={data.item_type} data={data} eventId={setEventId} openModal={openEditModal}/>;
  });

  return (
    <>
      <Button variant="contained" onClick={openCreateModal}>+ New Event</Button>
      <EventEditModal
        open={editModalState}
        setOpen={setEditModal}
        eventId={eventId}
        data={selectedEvent}
      />
      <EventCreateModal open={createModalState} setOpen={setCreateModal} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px"}}>
        {eventItems}
      </div>
    </>
  );
};

export default EventsComponent;