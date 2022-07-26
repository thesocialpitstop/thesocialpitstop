import { Autocomplete, TextField } from "@mui/material"
import { useState } from "react";
import { ONE_MAP_API_URL } from "../../../constants/constants";

export const AddressAutocomplete = (props) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = (searchTerm) => {
        setLoading(true);
        fetch(`${ONE_MAP_API_URL}/search?searchVal=${searchTerm}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setOptions(data.results);
            })
            .catch((error) => {
                console.log("ONE MAP DOWN")
            });      
    }

    const onInputChange = (event, value, reason) => {
        if (value.length > 2) {
            getData(value);
        } else {
            setOptions([]);
        }
      };
    
    return (
        <Autocomplete 
            id="dashboard-address-autocomplete"
            autoComplete
            fullWidth
            forcePopupIcon={false}
            options={options}
            defaultValue={props.defaultValue}
            getOptionLabel={(option) => option.ADDRESS || ""}
            isOptionEqualToValue={(option, value) => option.ADDRESS === value.ADDRESS}
            onInputChange={onInputChange}
            onChange={(event, value) => {
                console.log(value?.ADDRESS);
                props.setFieldValue("address", value?.ADDRESS)
            }} // prints the selected value
            loading={loading}
            renderInput={(params) => {
                return (<TextField 
                    {...params} 
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}                    
                    label="Address" 
                    variant="outlined" />)
            }}
            noOptionsText={"Please enter a longer search term"}
            loadingText={""}
        />
    );
}