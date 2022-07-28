import React, {useEffect, useState} from 'react';
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import {Grid} from "@mui/material";
import LeadListing from "../../closed-leads/lead-listing";
import LeadDetail from "../../leads/lead-details";
import FollowUpListing from "./follow-up-listing";

const FollowUpContent = (props) => {

    const [selectedFollowUpId, setSelectedFollowUpId] = useState();
    const [activeType, setActiveType] = useState();



    const handleFollowUpChange = (lead_id) => {
        setSelectedFollowUpId(lead_id)
    }

    useEffect(()=>{
        setActiveType(props.activeType)
    },[props.activeType])

    return (
        <div>
            <Grid container sx={{mt:2}}>
                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                    <FollowUpListing key={activeType} type={props.type} labelId={props.labelId} activeType={activeType} onLeadChange={handleFollowUpChange} />
                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedFollowUpId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default FollowUpContent;
