import React from 'react';
import { List, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import ColoredAvatar from "../../../utils/ColoredAvatar";
import {formatDistance, parseISO, subDays} from "date-fns";

const LeadListingItem = (props) => {
    const handleOnClick = () => {props.onLeadChange(props.id)}

    return (
        <List dense={false} sx={{borderBottom:'1px solid #f0f0f0'}}  disablePadding>
            <ListItemButton onClick={handleOnClick} selected={(props.active === props.id)? true : false}>
                <ListItemAvatar>
                    <ColoredAvatar letter={props.name.slice(0,1).toString().toUpperCase()}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={<React.Fragment>
                        <Typography variant={"caption"}>{props.title}</Typography>
                    </React.Fragment>}
                />
                <Typography variant={"caption"}>{props?.created_at && formatDistance(parseISO(props?.created_at), new Date(), { addSuffix: true })}</Typography>

            </ListItemButton>
        </List>
    );
};

export default LeadListingItem;
