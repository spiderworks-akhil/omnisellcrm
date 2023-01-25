import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar} from "@mui/material";
import {format, parseISO} from "date-fns";

function DeleteIcon() {
    return null;
}

const ItemSingle = (props) => {
    let obj = props.obj;

    const handleClick = () =>{
        props.onClick(props.obj.id);
    }

    return <ListItem   secondaryAction={
        <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
        </IconButton>
    } selected={props.active === props.obj.id? true:false} alignItems="flex-start" key={obj.id} sx={{borderBottom:"1px solid #fafafa",cursor:'pointer'}} onClick={handleClick}>
        {obj.name}


    </ListItem>;
};

export default ItemSingle;
