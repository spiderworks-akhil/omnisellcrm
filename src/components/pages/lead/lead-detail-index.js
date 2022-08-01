import React from 'react';
import {useParams} from "react-router-dom";
import LeadDetail from "../../leads/lead-details";
import {Grid} from "@mui/material";

const LeadDetailIndex = () => {
    let { leadId } = useParams();
    return (
        <Grid item sx={{p:1}}>
            <LeadDetail leadId={leadId}/>
        </Grid>
    );
};

export default LeadDetailIndex;
