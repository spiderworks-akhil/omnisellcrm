import React, {useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";

const LeadListingSearch = (props) => {

    let leadList = [];

    const handleSearch = (event) => {
        props.onKeywordChange(event.target.value);
    }

    return (
        <Autocomplete
            onKeyUp={handleSearch}
            freeSolo
            options={leadList.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="Search leads" />}
        />
    );
};

export default LeadListingSearch;
