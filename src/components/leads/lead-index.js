import React, {useState} from 'react';
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import LeadDetail from "./lead-details";
import LeadListing from "./lead-listing";
import {Plus} from "../../icons/plus";
import LeadPageHeader from "./lead-page-header";

const LeadIndex = () => {
    const [selectedLeadId, setSelectedLeadId] = useState();

    const handleLeadChange = (leadId) => {setSelectedLeadId(leadId)}

    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <LeadPageHeader />
                </Grid>
                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                    <LeadListing onLeadChange={handleLeadChange} />
                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </Card>
    );
};

export default LeadIndex;
