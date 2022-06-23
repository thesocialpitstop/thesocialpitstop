import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { ContactSupportOutlined } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Field, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import categories from "../../../../constants/categories";
import { GET_PROFILE } from "../../../../graphql/queries";
import * as yup from "yup";
import { UPDATE_PROFILE } from "../../../../graphql/mutations";

const ProfileForm = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileTextField = styled(TextField)``;

const validationSchema = yup.object({
  name: yup.string("Enter your password").required("Name is required"),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  address: yup.string("Enter your address").required("Address is required"),
  category: yup.string().required("Enter Category"),
  contact_num: yup
    .number()
    .required("Contact Number is required")
    .min(8, "Enter a valid phone number")
    .max(8, "Enter a valid phone number"),
  details: yup.string("Enter your password").required("Details is required"),
});

const ProfileComponent = () => {
  const { user, error: userError, isLoading } = useUser();
  const { data, loading, error, variables } = useQuery(GET_PROFILE, {
    variables: {
      user_id: "auth0|62a0f21a372cb39d2ba2ced0",
    },
  });
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (data) {
      console.log(variables);
      setUserProfile(data.getItem);
    }
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfile?.name,
      address: userProfile?.address,
      category: userProfile?.category,
      contact_num: userProfile?.contact_num,
      details: userProfile?.details,
      email: userProfile?.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        const [updateProfile, {data, loading, error}] = useMutation(UPDATE_PROFILE);
        updateProfile({
            variables: {
                user_id: user?.sub, 
                item_type: `SOO-PROFILE`,
                name: $name,
                email: $email,
                details: $details,
                category: $category,
                address: $address,
            }
        })
        console.log(JSON.stringify(values, null, 2));
        console.log(values.name)
    },
  });

  return (
    <ProfileForm>
      <form onSubmit={formik.handleSubmit}>
        <ProfileTextField
          style={{ marginBottom: "1rem" }}
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name || ""}
          onChange={formik.handleChange}
          placeholder="Jane"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <ProfileTextField
          style={{ marginBottom: "1rem" }}
          fullWidth
          name="address"
          label="Address"
          value={formik.values.address || ""}
          onChange={formik.handleChange}
          placeholder="Doe"
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          style={{ marginBottom: "1rem" }}
          fullWidth
          select
          name="category"
          value={formik.values.category || ""}
          onChange={formik.handleChange}
          label="Category"
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        >
          {categories.map((option) => {
            return <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>;
          })}
        </TextField>
        <ProfileTextField
          type="tel"
          style={{ marginBottom: "1rem" }}
          fullWidth
          name="contact_num"
          value={formik.values.contact_num || ""}
          onChange={formik.handleChange}
          label="Contact Number"
          error={formik.touched.contact_num && Boolean(formik.errors.contact_num)}
          helperText={formik.touched.contact_num && formik.errors.contact_num}
        />
        <ProfileTextField
          style={{ marginBottom: "1rem" }}
          fullWidth
          name="details"
          value={formik.values.details || ""}
          onChange={formik.handleChange}
          label="Details"
          multiline
          rows={4}
          error={formik.touched.details && Boolean(formik.errors.details)}
          helperText={formik.touched.details && formik.errors.details}
        />
        <ProfileTextField
          style={{ marginBottom: "1rem" }}
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email || ""}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="hello@socialpitstop.com"
          onChange={formik.handleChange}
          type="email"
        />

        <Button variant="contained" disabled={!formik.dirty} type="submit">
          Save
        </Button>
      </form>
    </ProfileForm>
  );
};

export default ProfileComponent;
