import * as yup from 'yup';

export const eventCreateModalValidationSchema = yup.object({
    eventName: yup.string("Enter Event Name").required("Event Name is required"),
    eventDetails: yup.string("Enter Event Details").required("Event Details is required"),
  });