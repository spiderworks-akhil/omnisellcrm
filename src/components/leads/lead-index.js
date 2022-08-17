import React, {useState} from 'react';
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import LeadDetail from "./lead-details";
import LeadListing from "./lead-listing";
import {Plus} from "../../icons/plus";
import LeadPageHeader from "./lead-page-header";

const LeadIndex = () => {
    const [selectedLeadId, setSelectedLeadId] = useState();
    const [activeLeadId, setActiveLeadId] = useState(null);

    const handleLeadChange = (leadId) => {setSelectedLeadId(leadId)}
    const handleNewLead = (leadId) => {setSelectedLeadId(leadId);setActiveLeadId(leadId)}

    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <LeadPageHeader onLeadCreate={handleNewLead} />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <LeadListing onLeadChange={handleLeadChange} activeLeadId={activeLeadId}/>
                </Grid>
                <Grid item lg={9} sm={6} xs={12} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </Card>
    );
};

export default LeadIndex;
