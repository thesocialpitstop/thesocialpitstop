import { useMutation } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { parsePhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/router";
import categories from "../../constants/categories";
import { CREATE_PROFILE } from "../../graphql/mutations";
import { profileCreateValidationSchema } from "../../components/dashboard/profile/create_validation_schema";
import { AddressAutocomplete } from "../../components/dashboard/profile/address_autocomplete";
import { AUTH0_URL, SOO_NEEDS } from "../../constants/constants";
import { CreateForm, CreateTitle } from "../../components/profile/create.style";
import { useState } from "react";
const CreateProfile = () => {
  const [needs, setNeeds] = useState([]);
  const fixedOptions = [];

  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  const router = useRouter();
  const user_id = parseJwt(router.query.session_token)?.sub.split("|")[1];
  const [createProfile] = useMutation(CREATE_PROFILE);
  const formik = useFormik({
    initialValues: {
      name: "",
      org_type: "SOO",
      category: "",
      email: "",
      phone: "",
      details: "",
      address: "",
      needs:"",
    },
    validationSchema: profileCreateValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      createProfile({
        variables: {
          address: values.address,
          needs: needs,
          category: values.category,
          datetime: new Date().toISOString(),
          details: values.details,
          email: values.email,
          item_type: `${values.org_type}-PROFILE`,
          name: values.name,
          user_id: user_id ? user_id : user?.sub.split("|")[1],
          contact_num: parsePhoneNumber(`+65${values.phone}`, "SG").number,
        },
        onCompleted: (data) => {
          console.log("success", data);
          if (user_id) {
            router.push(`${AUTH0_URL}/continue?state=${router.query.state}`);
          } else {
            router.push("/dashboard");
          }
        },
        onError: (error) => {
          console.error("error", error);
        },
      });
    },
  });

  return (
    <>
      <CreateTitle>Create your profile !</CreateTitle>
      <form onSubmit={formik.handleSubmit}>
        <CreateForm>
          <FormGroup row>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Organisation Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <RadioGroup
            margin="normal"
            row
            name="org_type"
            id="org_type"
            onChange={formik.handleChange}
            value={formik.values.org_type}
          >
            <FormControlLabel value="SOO" control={<Radio />} label="SOO" />
            <FormControlLabel
              value="BIZ"
              control={<Radio />}
              label="Business"
            />
          </RadioGroup>
          <FormGroup>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="category-select"
                id="category"
                name="category"
                value={formik.values.category}
                label="Category"
                onChange={formik.handleChange}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <TextField
              margin="normal"
              id="category"
              select
              label="Category"
              onChange={formik.handleChange}
              value={formik.values.category}
              >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField> */}
            <Autocomplete
              margin="normal"
              multiple
              id="needs"
              name="needs"
              label="needs"
              value={needs}
              onChange={(event, newValue) => {
                setNeeds([
                  ...fixedOptions,
                  ...newValue.filter(
                    (option) => fixedOptions.indexOf(option) === -1
                  ),
                ]);
              }}
              options={SOO_NEEDS}
              getOptionLabel={(option) => option || ""}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
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
          </FormGroup>

          <FormGroup>
            <TextField
              margin="normal"
              id="email"
              label="Email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              margin="normal"
              id="phone"
              name="phone"
              label="Contact No."
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {/* <TextField
            margin="normal"
            id="address"
            name="address"
            label="Address"
            onChange={formik.handleChange}
            value={formik.values.address}
          /> */}
            <AddressAutocomplete
              name="address"
              label="Address"
              initialValue={formik.values.address || ""}
              inputValue={formik.values.address || ""}
              setFieldValue={formik.setFieldValue}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              margin="normal"
              id="details"
              rows={4}
              label="Details"
              multiline
              onChange={formik.handleChange}
              value={formik.values.details}
            />
          </FormGroup>
          <Button
            type="submit"
            disabled={!(formik.isValid && formik.dirty && !formik.isSubmitting)}
            variant="contained"
          >
            Create
          </Button>
        </CreateForm>
      </form>
    </>
  );
};

export default CreateProfile;
