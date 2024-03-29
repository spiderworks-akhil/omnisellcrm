import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
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
                <Grid item lg={3} sm={6} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <FollowUpListing key={activeType} type={props.type} labelId={props.labelId} activeType={activeType} onLeadChange={handleFollowUpChange} />
                </Grid>
                <Grid item lg={9} sm={6} xs={12} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedFollowUpId}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default FollowUpContent;
