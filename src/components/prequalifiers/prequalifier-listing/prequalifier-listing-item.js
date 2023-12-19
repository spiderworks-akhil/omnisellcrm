import React, { useEffect } from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {deepPurple} from "@mui/material/colors";

const PrequalifierListingItem = (props) => {
    const handleOnClick = () => {props.onLeadChange(props.id)}

    // console.log(props.data);

    return (
        <List dense={false} sx={{borderBottom:'1px solid #f0f0f0',backgroundColor:props?.data?.status=='Rejected'?'red':''}}  disablePadding>
            <ListItemButton onClick={handleOnClick} selected={(props.active === props.id)? true : false}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[400], color: "#FFF" }} >{props.name.slice(0,1).toString().toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name} />
            </ListItemButton>
        </List>
    );
};

export default PrequalifierListingItem;
