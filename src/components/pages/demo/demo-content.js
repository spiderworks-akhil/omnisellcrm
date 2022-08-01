import React, {useState} from 'react';
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import {Grid} from "@mui/material";
import LeadListing from "../../closed-leads/lead-listing";
import LeadDetail from "../../leads/lead-details";
import DemoListing from "./demo-listing";
import {Demo} from "../../../api/Endpoints/Demo";

const DemoContent = (props) => {

    const [selectedFollowUpId, setSelectedFollowUpId] = useState();

    const handleFollowUpChange = (lead_id) => {
        setSelectedFollowUpId(lead_id)
    }

    return (
        <div>
            <Grid container sx={{mt:2}}>
                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                    <DemoListing type={props.type} demoId={props.labelId} onLeadChange={handleFollowUpChange} />
                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedFollowUpId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default DemoContent;
