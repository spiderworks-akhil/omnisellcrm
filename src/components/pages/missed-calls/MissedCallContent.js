import React, {useState} from 'react';
import {Grid, Typography} from "@mui/material";
import LeadListing from "../../my-leads/lead-listing";
import LeadDetail from "../../leads/lead-details";
import MissedCallLisiting from "./missed-call-lisiting";

const MissedCallContent = (props) => {
    const tabs = props.tabs;
    const [refresh, setRefresh] = useState(1);

    const handleStatusChange = () => {
        setRefresh(Math.random)
    }

    return (
        <div>
            <Grid container sx={{mt:2}}>
                {tabs.map(obj => {
                    return <Grid key={obj.value} item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                        <Typography variant={"subtitle1"}>{obj.label}</Typography>
                        <MissedCallLisiting key={refresh} onStatusChange={handleStatusChange}  type={obj.value} labelId={props.labelId}  />
                    </Grid>;
                })}
            </Grid>
        </div>
    );
};

export default MissedCallContent;
