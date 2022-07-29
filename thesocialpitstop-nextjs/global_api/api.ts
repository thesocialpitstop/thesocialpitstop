import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { DELETE_ITEM } from "../graphql/mutations";
import { GET_ALL_EVENTS_OF_USER } from "../graphql/queries";

export function useDeleteItem(user_id, item_type) {
    const [deleteEvent] = useMutation(DELETE_ITEM, {
      variables: {
        user_id: user_id,
        item_type: item_type,
      },
    refetchQueries: [{ query: GET_ALL_EVENTS_OF_USER }, "GetAllEvents"],

    });
    useEffect(() => {
      deleteEvent({
        onCompleted: (data) => {
          console.log("success delete");
          console.log(data);
        },
      });
    });
  }
  