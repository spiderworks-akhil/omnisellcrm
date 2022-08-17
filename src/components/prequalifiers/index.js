import React, {useState} from 'react';
import {Card, Grid} from "@mui/material";
import PageHeader from "./page-header";
import LeadListing from "../leads/lead-listing";
import LeadDetail from "../leads/lead-details";
import PrequalifierListing from "./prequalifier-listing";
import PrequalifierDetails from "./prequalifier-details";

const PreQualifierIndex = () => {

    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState(null);
    const [refresh, setRefresh] = useState(1);

    const handlePreQualifierIdChange = (id) => {
        setSelectedPreQualifierId(id)
    }

    const handleReject = () => {
        setRefresh(Math.random);
    }

    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader />
                </Grid>

                <Grid item lg={3} sm={6} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <PrequalifierListing key={refresh} onPreQualifierIdChange={handlePreQualifierIdChange} />
                </Grid>
                <Grid item lg={9} sm={6} xs={12} sx={{pr:2,pb:2}}>
                    <PrequalifierDetails onDelete={handleReject}  id={selectedPreQualifierId} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default PreQualifierIndex;
