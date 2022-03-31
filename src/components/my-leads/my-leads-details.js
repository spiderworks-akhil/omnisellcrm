import React, {useState} from 'react';
import {Grid} from "@mui/material";
import LabelwiseLeadListing from "../label/labelwise-lead-listing";
import LeadDetail from "../leads/lead-details";
import LeadListing from "./lead-listing";

const MyLeadsDetails = (props) => {
    const [selectedLeadId, setSelectedLeadId] = useState('');
    const handleLeadChange = (id) => setSelectedLeadId(id);

    return (
        <div>
            <Grid container sx={{mt:2}}>
                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                    <LeadListing type={props.type} labelId={props.labelId} onLeadChange={handleLeadChange} />
                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default MyLeadsDetails;
