import React, {useState} from 'react';
import {Grid} from "@mui/material";
import LeadPageHeader from "../leads/lead-page-header";
import LeadListing from "../leads/lead-listing";
import LeadDetail from "../leads/lead-details";
import LabelwiseLeadListing from "./labelwise-lead-listing";

const LabelDetails = (props) => {
    const [selectedLeadId, setSelectedLeadId] = useState('');
    const handleLeadChange = (id) => selectedLeadId(id);

    return (
        <div>
            <Grid container sx={{mt:2}}>
                <Grid item  lg={3} sm={4} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <LabelwiseLeadListing labelId={props.labelId} onLeadChange={handleLeadChange} />
                </Grid>
                <Grid item  lg={9} sm={8} xs={12} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default LabelDetails;
