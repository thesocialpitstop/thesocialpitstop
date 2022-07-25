import { useContext } from 'react';
import { createContext } from 'react';
const EventModalContext = createContext(false);

const useEventModal = () => useContext(EventModalContext);

export {EventModalContext, useEventModal}
