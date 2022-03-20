import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const LeadListingType = (props) => {
    const [leadListType , setLeadListType] = useState("unassigned-leads");

    let leadCollectionList = [
        {name : "Unassigned Leads",value:"unassigned-leads"},
        {name : "Leads assigned to me",value:"my-leads"},
        {name : "Bookmarked leads",value:"my-favourite-leads"}
    ];

    const handleLeadTypeChange = (event) => {
        props.onTypeChange(event.target.value);
        setLeadListType(event.target.value)
    }

    return (
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label" >Lead Collection</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Lead Collection"
                onChange={handleLeadTypeChange}
                value={leadListType}
            >
                {leadCollectionList.map((obj,index)=>{
                    return <MenuItem value={obj.value} key={index}>{obj.name}</MenuItem>;
                })}
            </Select>
        </FormControl>
    );
};

export default LeadListingType;
