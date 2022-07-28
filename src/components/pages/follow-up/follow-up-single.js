import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";

const FollowUpSingle = (props) => {
    let obj = props.obj;

    const handleClick = () =>{
        props.onFollowUpClick(props.obj.leads_id);
    }

    return <ListItem alignItems="flex-start" key={obj.id} sx={{borderBottom:"1px solid #fafafa",cursor:'pointer'}} onClick={handleClick}>
        <ListItemAvatar>
            <Avatar variant="square">{format(parseISO(obj.datetime),'do')}<br/>{format(parseISO(obj.datetime),'MMM')}</Avatar>
        </ListItemAvatar>
        {obj.title}


    </ListItem>;
};

export default FollowUpSingle;
