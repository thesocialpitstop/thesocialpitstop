import { Autocomplete, TextField } from "@mui/material"
import { useState } from "react";
import { ONE_MAP_API_URL } from "../../../constants/constants";
import { useEffect } from "react";

export const AddressAutocomplete = (props) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        address: ''
    })

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

    const handleChange = (event, value) => {
        setState({
            ...state,
            address: value
        });
    };

    const handleInputChange = (event, value, reason) => {
        if (value?.length > 2) {
            getData(value);
        } else {
            setOptions([]);
        }
    };

    const handleBlur = async (event) => {
        setState({
            ...state,
            address: { ADDRESS: event.target.value }
        });
        await props.setFieldValue('address', event.target.value);
        await props.setFieldTouched("address", true);
        setState({
            ...state,
            address: { ADDRESS: event.target.value }
        });
    }

    useEffect(() => {
        setState({
            ...state,
            address: props.defaultValue
        });
    }, [props.defaultValue]);

    return (
        <Autocomplete
            id="dashboard-address-autocomplete"
            autoComplete
            fullWidth
            forcePopupIcon={false}
            options={options}
            value={state.address}
            getOptionLabel={(option) => option.ADDRESS || ""}
            isOptionEqualToValue={(option, value) => option.ADDRESS === value?.ADDRESS}
            onInputChange={handleInputChange}
            onChange={handleChange} // prints the selected value
            onBlur={handleBlur}
            loading={loading}
            renderInput={(params) => {
                return (<TextField
                    {...params}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                    name="address"
                    label="Address"
                    variant="outlined" />)
            }}
            noOptionsText={"Please enter a longer search term"}
            loadingText={""}
        />
    );
}