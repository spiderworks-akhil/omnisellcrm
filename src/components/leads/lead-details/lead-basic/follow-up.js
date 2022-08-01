import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Grid, ListItem, TextField, Typography} from "@mui/material";
import {DatePicker} from "@mui/lab";
import {format, parse, parseISO} from "date-fns";
import {FollowUp as FollowUpApi} from "../../../../api/Endpoints/FollowUp";
import toast from "react-hot-toast";

const FollowUp = (props) => {

    const [step, setStep] = useState(1);
    const [followUpDate, setFollowUpDate] = useState(new Date());
    const [remarks, setRemarks] = useState('');
    const [refresh, setRefresh] = useState(1);
    const handleAddFollowUpClick = () => setStep(2);

    const [followUpList,setFollowUpList] = useState([]);

    const handleRemarksChange = (e) => {
        setRemarks(e.target.value);
    }

    const handleSaveFollowUpDate = () => {
        let data = {
            datetime:format(followUpDate, 'yyyy-MM-dd hh:mm:ss'),
            title:remarks,
            leads_id:props.leadId
        };
        FollowUpApi.add(data).then(response => {
            console.log("handleSaveFollowUpDate", response.data)
            if(response.data.status === "success"){
                toast.success('Follow up date has been saved');
            }
            setRefresh(Math.random());
        })
        setStep(3);
    }
    const handleChangeFollowUpClick = () => {
        setStep(2);
    }

    const handleDateChange = (date) => {
        setFollowUpDate(date)
    }

    const fetchLeads = () => {
        FollowUpApi.get({leads_id: props.leadId}).then(resposne => {
            setFollowUpList(resposne.data.data.data)
            if(resposne.data.data.data.length>0){
                setStep(3)
            }
        })
    }

    const renderContent = (param) => {
        switch(param) {
            case 1:
                return <Button variant="outlined" onClick={handleAddFollowUpClick}> Add a follow up date </Button>;
            case 2:
                return <><DatePicker
                    label="Choose the follow up date"
                    value={followUpDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                    <TextField sx={{mt:1}} label="Remarks" onChange={handleRemarksChange} value={remarks} />
                    <Button onClick={handleSaveFollowUpDate} sx={{mt:1,p:1, width:"100%"}} variant="outlined">Save</Button>
                </>;

        }
    }

    useEffect(()=>{
        fetchLeads();
    },[refresh])

    return (
        <Card sx={{mx:2,mb:2,p:2}}>
            {renderContent(step)}
            {followUpList.length > 0 && <Typography variant="h6">Follow Up history</Typography>}
            {followUpList.map(obj => {
                let now = format(new Date(),'yyyy-MM-dd hh:mm:ss');

                return <ListItem key={obj.index} disabled={obj.datetime < now? true: false}>
                    <Grid container>
                        <Grid item><Typography variant="subtitle2">{format(parseISO(obj.datetime),'MMM do iiii, h:ma')}</Typography></Grid>
                        <Grid item><Typography sx={{display:"block", width:"100%"}} variant="caption" >{obj.title}</Typography></Grid>
                    </Grid>
                </ListItem>;
            })}
            {step > 2 &&
                <ListItem>
                    <Grid container>
                        <Grid item><Button variant="outlined" onClick={handleAddFollowUpClick}> Add another follow up
                            date </Button></Grid>
                    </Grid>
                </ListItem>
            }
        </Card>
    );
};

export default FollowUp;
