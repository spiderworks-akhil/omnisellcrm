import React, {useEffect, useState} from 'react';
import {Button, Card, Grid, TextField} from "@mui/material";
import PageHeader from "./page-header";
import LeadListing from "../leads/lead-listing";
import LeadDetail from "../leads/lead-details";
import PrequalifierListing from "./prequalifier-listing";
import PrequalifierDetails from "./prequalifier-details";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DateTimePicker} from "@mui/x-date-pickers";
import { PreQualifiers } from '../../api/Endpoints/PreQualifiers';
import { useAppSettings } from '../../hooks/use-app-settings';

const PreQualifierIndex = () => {

    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState(null);
    const [refresh, setRefresh] = useState(1);
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());

    const handlePreQualifierIdChange = (id) => {
        setSelectedPreQualifierId(id)
    }

    const handleReject = () => {
        setRefresh(Math.random);
    }

    const beforeRefresh = async () => {
        
        console.log('before refresh');
        try {
            if(leadType){
                let deleteApi=await PreQualifiers.delete({ lead_type_id: leadType }) 
                console.log(deleteApi);
                console.log('finish');
            }
        } catch (error) {
            console.log(error);
        }
        // PreQualifiers.delete({ lead_type_id: props.id })
    }

    useEffect(() => {
        beforeRefresh()
    }, [])

    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader />
                </Grid>

                <Grid item lg={3} sm={6} xs={12}  sx={{pl:2,pr:2,pb:2}}>
                    <DatePicker
                        label="Follow up date"
                        onChange={e => alert(e)}
                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                    />
                    <DatePicker
                        label="Follow up date"
                        onChange={e => alert(e)}
                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                    />
                    <Button variant={""}/>
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
