import * as yup from "yup";

export const validationSchema = yup.object({
    name: yup.string("Enter your password").required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    address: yup.string("Enter your address").required("Address is required"),
    category: yup.string().required("Enter Category"),
    contact_num: yup.string().matches(/^\+?\d[\d\s-]+$/, "wrong format"),
    details: yup.string("Enter your password").required("Details is required"),
  });