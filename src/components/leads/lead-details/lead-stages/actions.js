import React from 'react';
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import ActionSingle from "./action-single";

const Actions = (props) => {
    const {list, ...other} = props;
    console.log( typeof (list) , list)
    return (
        <div>
                <Divider sx={{my:2}} />
                <Typography variant="subtitle2" gutterBottom component="div">
                    Following actions will trigger when you change to this stage,
                </Typography>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {list.map((obj, index) => {
                        return <ActionSingle key={index} item={obj}/>
                    })}
                </List>
        </div>
    );
};

export default Actions;
