import React from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {MailOutline} from "@mui/icons-material";

const ActionSingle = (props) => {
    const {item, ...other} = props;
    return (
        <>
            <ListItem alignItems="flex-start">

                <ListItemAvatar>
                    <Avatar><MailOutline /></Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={item.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {item.remarks}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider  component="li" />
        </>
    );
};

export default ActionSingle;
