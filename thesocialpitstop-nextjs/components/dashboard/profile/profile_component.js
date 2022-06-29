import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Button,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import categories from "../../../constants/categories";
import { GET_PROFILE } from "../../../graphql/queries";
import { UPDATE_PROFILE } from "../../../graphql/mutations";
import parsePhoneNumber from "libphonenumber-js";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { validationSchema } from "./validation_schema";
import {
  ProfileForm,
  ProfileTextField,
  ProfileImageSection,
  Input,
} from "./profile_component.style";
import { useS3Upload } from 'next-s3-upload';
import { CLOUDFRONT_URL } from "../../../constants/constants";

const ProfileComponent = () => {
  const { user } = useUser();
  const { uploadToS3 } = useS3Upload();
  const { data: userData } = useQuery(GET_PROFILE, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: `SOO-PROFILE`,
    },
  });
  const [userProfile, setUserProfile] = useState([]);
  const [phoneNum, setPhoneNum] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: `SOO-PROFILE`,
    },
    refetchQueries: [{ query: GET_PROFILE }, "MyQuery"],
  });

  useEffect(() => {
    if (userData && userData.getItem) {
      console.log(userData);
      setUserProfile(userData.getItem);
      setPhoneNum(parsePhoneNumber(userData.getItem.contact_num));
      console.log(phoneNum);
    }
  }, [userData]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfile?.name,
      address: userProfile?.address,
      category: userProfile?.category,
      contact_num: phoneNum?.nationalNumber,
      details: userProfile?.details,
      email: userProfile?.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateProfile({
        variables: {
          name: values.name,
          email: values.email,
          details: values.details,
          category: values.category,
          address: values.address,
          contact_num: parsePhoneNumber(values.contact_num, "SG").number,
        },
        onCompleted: (data) => {
          console.log("complete");
          console.log(data);
          setOpenSnackbar(true);
          formik.resetForm();
        },
      })
        .then((msg) => console.log(msg))
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const handleInputChange = async (event) => {
    console.log(event);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    await uploadToS3(event.target.files[0], {
      endpoint: {
        request: {
          body: {
            directory: "profile",
            user_id: user.sub.split('|')[1],
          }
        }
      }
    });
    setUserProfile((prevState) => ({
      ...prevState,
      image_url: objectUrl,
    }));
  };

  return (
    <ProfileForm>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Profile Successfully Saved"
        action={action}
      />
      <form onSubmit={formik.handleSubmit}>
        <ProfileImageSection>
          <Image src={`${CLOUDFRONT_URL}/profile/${user?.sub.split("|")[1]}`} width={64} height={64} />

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleInputChange}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </ProfileImageSection>
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
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            );
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
          error={
            formik.touched.contact_num && Boolean(formik.errors.contact_num)
          }
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

        <Button
          type="submit"
          variant="contained"
          disabled={!formik.dirty || !formik.validateForm}
        >
          Save
        </Button>
      </form>
    </ProfileForm>
  );
};

export default ProfileComponent;
