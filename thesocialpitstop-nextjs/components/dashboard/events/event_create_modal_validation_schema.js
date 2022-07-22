import * as yup from 'yup';

export const validationSchema = yup.object({
    title: yup.string("Enter your title").required("Name is required"),
    content: yup.string("Enter your password").required("Name is required"),
  });