import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Autocomplete,
  Button,
  Chip,
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
  DashboardProfileEdit,
  Input,
} from "./profile_component.style";
import { useS3Upload } from "next-s3-upload";
import {
  CLOUDFRONT_URL,
  SOO_PROFILE_STRING,
} from "../../../constants/constants";
import { AddressAutocomplete } from "./address_autocomplete";

const sooNeeds = [
  { title: "Volunteering", value: "volunteering" },
  { title: "Funding", value: "funding" },
];

const ProfileComponent = () => {
  const { user } = useUser();
  const { uploadToS3 } = useS3Upload();
  const { data: userData } = useQuery(GET_PROFILE, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: SOO_PROFILE_STRING,
    },
  });
  const SUCCESS_MESSAGE = "Profile Successfully Saved";
  const FAILURE_MESSAGE = "Failed to save";
  const [src, setSrc] = useState(
    `${CLOUDFRONT_URL}/profile/${user?.sub.split("|")[1]}`
  );
  const [snackbarMessage, setSnackbarMessage] = useState(SUCCESS_MESSAGE);
  const [userProfile, setUserProfile] = useState([]);
  const [phoneNum, setPhoneNum] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [needs, setNeeds] = useState([]);
  const fixedOptions = [];
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      user_id: user?.sub.split("|")[1],
      item_type: SOO_PROFILE_STRING,
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
  console.log(userProfile?.address);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfile?.name,
      category: userProfile?.category,
      contact_num: phoneNum?.nationalNumber,
      address: userProfile?.address,
      details: userProfile?.details,
      email: userProfile?.email,
      needs: userProfile?.needs,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(needs);
      updateProfile({
        variables: {
          name: values.name,
          email: values.email,
          details: values.details,
          category: values.category,
          address: values.address,
          contact_num: parsePhoneNumber(values.contact_num, "SG").number,
          needs: needs,
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
          setSnackbarMessage(FAILURE_MESSAGE);
          setOpenSnackbar(true);
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
            filename: user.sub.split("|")[1],
          },
        },
      },
    })
      .then((data) => {
        console.log("finish");
      })
      .catch((e) => console.error(e));

      setSrc(objectUrl);
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
        message={snackbarMessage}
        action={action}
      />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <ProfileImageSection>
            <Image
              src={src}
              width={64}
              height={64}
              onError={() =>
                setSrc(`https://ui-avatars.com/api/?name=${userProfile?.name}`)
              }
            />

            <label htmlFor="contained-button-file">
              <Input
                type="file"
                accept=".png,.jpg"
                id="contained-button-file"
                onChange={handleInputChange}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </ProfileImageSection>
          <DashboardProfileEdit>
            <ProfileTextField
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
            {userProfile ? (
              <AddressAutocomplete
                id="address"
                name="address"
                label="Address"
                defaultValue={{ ADDRESS: userProfile?.address }}
                inputValue={formik.values.address || ""}
                setFieldValue={formik.setFieldValue}
              />
            ) : (
              <></>
            )}
            <TextField
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
            <Autocomplete
              multiple
              id="needs"
              name="needs"
              label="needs"
              value={needs}
              onChange={(event, newValue) => {
                setNeeds([
                  ...fixedOptions,
                  ...newValue.filter(
                    (option) => fixedOptions.indexOf(option.value) === -1
                  ),
                ]);
              }}
              options={sooNeeds}
              getOptionLabel={(option) => option.title || ""}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    key={option.value}
                    label={option.title}
                    {...getTagProps({ index })}
                    disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Needs" placeholder="Needs" />
              )}
              setFieldValue={formik.setFieldValue}
            />
            <ProfileTextField
              type="tel"
              fullWidth
              name="contact_num"
              value={formik.values.contact_num || ""}
              onChange={formik.handleChange}
              label="Contact Number"
              error={
                formik.touched.contact_num && Boolean(formik.errors.contact_num)
              }
              helperText={
                formik.touched.contact_num && formik.errors.contact_num
              }
            />
            <ProfileTextField
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
          </DashboardProfileEdit>
        </div>
      </form>
    </ProfileForm>
  );
};

export default ProfileComponent;
