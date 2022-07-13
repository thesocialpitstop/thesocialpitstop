import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const profileCreateValidationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    org_type: yup
      .string("Enter your organization type")
      .required("Organization type is required"),
    category: yup.string().required("Category is required"),
    email: yup.string("Enter your email").required("Email is required"),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(8)
        .max(8),
    details: yup
      .string("Enter the details of your organization")
      .required("Details is required"),
    address: yup.string("Enter your address").required("Address is required"),
  })