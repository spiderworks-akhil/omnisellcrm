import React from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

const LeadListingItem = (props) => {
    const handleOnClick = () => {props.onLeadChange(props.id)}
    return (
        <List dense={false} sx={{borderBottom:'1px solid #f0f0f0'}}  disablePadding>
            <ListItemButton onClick={handleOnClick} selected={(props.active === props.id)? true : false}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} >{props.name.slice(0,1)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name}/>
            </ListItemButton>
        </List>
    );
};

export default LeadListingItem;
