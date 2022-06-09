// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import { useState } from "react";
import { Button, Switch, TextField, FormGroup, RadioGroup, Radio, FormControlLabel, MenuItem } from "@mui/material";
import categories from "../../constants/categories";
import { CREATE_PROFILE } from '../../graphql/mutations';
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router'

const CreateProfile = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orgType, setOrgType] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");

  const [createProfile] = useMutation(CREATE_PROFILE);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(orgName, orgType, category, email, phone, address);
    createProfile({
      variables: {
        address: address,
        category: category,
        datetime: new Date().toISOString,
        details: details,
        email: email,
        item_type: `${orgType}-PROFILE`,
        name: orgName,
        user_id: '54321', // PLACEHOLDER
        contact_num: phone
      }
    })
    router.push("/profile");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup row>
          <TextField
            required
            id="name"
            label="Organisation Name"
            onInput={e => setOrgName(e.target.value)}
          />
          <RadioGroup
            row
            name="org_type"
            required
            onChange={e => setOrgType(e.target.value)}
          >
            <FormControlLabel value="SOO" control={<Radio />} label="SOO" />
            <FormControlLabel value="BIZ" control={<Radio />} label="Business" />
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <TextField
            id="category"
            select
            label="Category"
            onChange={e => setCategory(e.target.value)}
          // helperText="
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </FormGroup>

        <FormGroup>
          <TextField
            id="email"
            label="Email"
            type="email"
            onInput={e => setEmail(e.target.value)}
          />
          <TextField
            id="phone"
            label="Contact No."
            onInput={e => setPhone(e.target.value)}
          />
          <TextField
            id="address"
            label="Address"
            onInput={e => setAddress(e.target.value)}
          />
        </FormGroup>

        <TextField
          id="details"
          label="Details"
          helperText="Tell us about your organisation"
          multiline
          onInput={e => setDetails(e.target.value)}
        />

        <Button type="submit" variant="contained">Create</Button>
      </form>
    </>
  );
}

export default CreateProfile;
