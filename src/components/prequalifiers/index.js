import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from "@mui/material";
import PageHeader from "./page-header";
import LeadListing from "../leads/lead-listing";
import LeadDetail from "../leads/lead-details";
import PrequalifierListing from "./prequalifier-listing";
import PrequalifierDetails from "./prequalifier-details";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from "@mui/x-date-pickers";
import { PreQualifiers } from '../../api/Endpoints/PreQualifiers';
import { useAppSettings } from '../../hooks/use-app-settings';
import moment from 'moment';

const PreQualifierIndex = () => {

    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState(null);
    const [refresh, setRefresh] = useState(1);
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());
    const [noLoadRefresh, setnoLoadRefresh] = useState(1)

    const handlePreQualifierIdChange = (id) => {
        setSelectedPreQualifierId(id)
    }

    const handleReject = () => {
        setRefresh(Math.random);
    }

    const handleNoLoadReject = () => {
        setnoLoadRefresh(Math.random);
    }

    const beforeRefresh = async () => {

        console.log('before refresh');
        try {
            if (leadType) {
                let deleteApi = await PreQualifiers.delete({ lead_type_id: leadType })
                console.log(deleteApi);
                console.log('finish');
            }
        } catch (error) {
            console.log(error);
        }
        // PreQualifiers.delete({ lead_type_id: props.id })
    }

    const handleFromChange = (e) => { setFrom(e) }
    const handleToChange = (e) => { setTo(e) }
    const downloadReport = async () => {
        let resposne = await PreQualifiers.report({ from: moment(from).format('DD-MM-yyyy 00:00:00'), to: moment(to).format('DD-MM-yyyy 23:59:59') })

        if (resposne.data.status === "success") {
            const link = document.createElement('a');
            link.href = resposne.data.data.export;
            link.setAttribute(
                'download',
                `report.xslx`,
            );
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }



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

                <Grid item lg={3} sm={6} xs={12} sx={{ pl: 2, pr: 2, pb: 2 }}>
                    <Card sx={{ mt: 5 }}>
                        <CardContent>
                            <Typography variant={"h5"}>Download report</Typography>
                            <Divider sx={{ mb: 1 }} />
                            <DatePicker
                                label="Follow up date"
                                value={from}
                                onChange={handleFromChange}
                                views={['year', 'month', 'day']}
                                renderInput={(params) => <TextField {...params} variant={"standard"} />}
                            />
                            <DatePicker
                                label="Follow up date"
                                value={to}
                                onChange={handleToChange}
                                renderInput={(params) => <TextField {...params} variant={"standard"} sx={{ mt: 1 }} />}
                            />
                            <Button sx={{ mt: 1 }} variant="contained" onClick={downloadReport}>Download report</Button>
                        </CardContent>
                    </Card>
                    <PrequalifierListing key={refresh} noLoadRefreshKey={noLoadRefresh} onPreQualifierIdChange={handlePreQualifierIdChange} />
                </Grid>
                <Grid item lg={9} sm={6} xs={12} sx={{ pr: 2, pb: 2 }}>
                    <PrequalifierDetails onDelete={handleNoLoadReject} id={selectedPreQualifierId} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default PreQualifierIndex;
