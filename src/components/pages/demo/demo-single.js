import React from 'react';
import {Avatar, Chip, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";

const DemoSingle = (props) => {
    let obj = props.obj;

    const handleClick = () =>{
        props.onFollowUpClick(props.obj.leads_id);
    }

    return <ListItem alignItems="flex-start" key={obj.id} sx={{borderBottom:"1px solid #fafafa",cursor:'pointer'}} onClick={handleClick}>
        <ListItemAvatar>
            <Avatar variant="square">{format(parseISO(obj.datetime),'do')}<br/>{format(parseISO(obj.datetime),'MMM')}</Avatar>
        </ListItemAvatar>

        <ListItemText
            primary={format(parseISO(obj.datetime),'MMM do iiii, h:ma')}
            secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                    >
                        {obj.demo_type && <Chip label={obj.demo_type} variant="outlined" /> } {obj.title}
                    </Typography>
                </React.Fragment>
            }
        />

    </ListItem>;
};

export default DemoSingle;
