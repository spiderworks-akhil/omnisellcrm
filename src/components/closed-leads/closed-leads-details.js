import React, {useState} from 'react';
import {Grid} from "@mui/material";
import LabelwiseLeadListing from "../label/labelwise-lead-listing";
import LeadDetail from "../leads/lead-details";
import LeadListing from "./lead-listing";

const ClosedLeadsDetails = (props) => {
    const [selectedLeadId, setSelectedLeadId] = useState('');
    const handleLeadChange = (id) => setSelectedLeadId(id);

    return (
        <div>
            <Grid container sx={{mt:2}}>
                <Grid item  lg={3} sm={6} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <LeadListing type={props.type} labelId={props.labelId} onLeadChange={handleLeadChange} />
                </Grid>
                <Grid item  lg={9} sm={6} xs={12} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default ClosedLeadsDetails;
