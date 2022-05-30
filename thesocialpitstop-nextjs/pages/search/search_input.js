import { useState } from "react";
import styled from "styled-components";
import { router } from 'next/router'
import Link  from 'next/Link';
import { Button, TextField } from "@mui/material";

export const SearchInput = ({onStateChange}) => {

    const SearchInputDiv = styled.div`
        display: flex;
        position: relative;
        padding: 15px 0 0;
        margin-top: 10px;
    `;

    const SearchInputField = styled.input`
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid $gray;
        outline: 0;
        font-size: 1.3rem;
        color: #000000;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;

        &:focus {
            padding-bottom: 6px;  
            font-weight: 700;
            border-width: 3px;
            border-image: linear-gradient(to right, #11998e,#38ef7d);
            border-image-slice: 1;
        }

    `;

    const SearchInputLabel = styled.label`
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: $gray;

    `;

    const SearchInputButton = styled.button`

    `;

    const onChange = (e) => {
        console.log(e.target.value);
        onStateChange(e.target.value);
    }
    
    return(<>
    <SearchInputDiv>
    <TextField id="outlined-basic" 
        onChange={onChange}
        fullWidth label="Search" 
        variant="outlined" />
{/* 
        <SearchInputField 
            type="text" 
            placeholder="Search for organizations" 
            value={textValue}
            onChange={onChange}
            required />
        <SearchInputLabel>Search</SearchInputLabel> */}
        <Link href="search?hello">
            {/* <SearchInputButton>Search</SearchInputButton> */}
            <Button variant="contained">🔎</Button>
        </Link>
    </SearchInputDiv>      
    </>);
}