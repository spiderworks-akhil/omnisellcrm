import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Tab, Tabs, Typography} from "@mui/material";
import {Link as RouterLink, Outlet, useLocation} from "react-router-dom";
import {LoadingScreen} from "../loading-screen";
import TabPanel from "../../utils/TabPanel";
import {LeadWorkorder} from "./lead-details/lead-workorder";
import AddIcCallTwoToneIcon from '@mui/icons-material/AddIcCallTwoTone';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LeadAddModal from "./lead-modals/lead-add-modal";
import LeadAddCall from "./lead-modals/lead-add-call";
import LeadEditModal from "./lead-modals/lead-edit-modal";
import LeadAddRequirement from "./lead-modals/lead-add-requirement";


const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

// Leads page
const LeadBasic = Loadable(lazy(() => import('./lead-details/lead-basic').then((module) => ({ default: module.LeadBasic }))));
const LeadActivity = Loadable(lazy(() => import('./lead-details/lead-activity').then((module) => ({ default: module.LeadActivity }))));
const LeadCalls = Loadable(lazy(() => import('./lead-details/lead-calls').then((module) => ({ default: module.LeadCalls }))));
const LeadMeeting = Loadable(lazy(() => import('./lead-details/lead-meeting').then((module) => ({ default: module.LeadMeeting }))));
const LeadPayments = Loadable(lazy(() => import('./lead-details/lead-payments').then((module) => ({ default: module.LeadPayments }))));
const LeadQuotation = Loadable(lazy(() => import('./lead-details/lead-quotation').then((module) => ({ default: module.LeadQuotation }))));
const LeadRequirement = Loadable(lazy(() => import('./lead-details/lead-requirement').then((module) => ({ default: module.LeadRequirement }))));

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const LeadDetail = (props) => {
    const [leadId, setLeadId] = useState();
    const [refresh, setRefresh] = useState(Math.random);

    //edit modal popup control
        const [openCallModal, setOpenCallModal] = useState(false);
        const handleCallClickOpen = () => { setRefresh(Math.random); setCallID(false);setOpenCallModal(true); };
        const handleCallClose = () => { setOpenCallModal(false);setRefresh(Math.random)};
    //ends

    //edit modal popup control
    const [openRequirementModal, setOpenRequirementModal] = useState(false);
    const handleRequirementClickOpen = () => { setRefresh(Math.random); setRequirementId(false);setOpenRequirementModal(true); };
    const handleRequirementClose = () => { setOpenRequirementModal(false);setRefresh(Math.random)};
    //ends

    const [callId, setCallID] = useState(false);
    const [requirementId, setRequirementId] = useState(false);

    const handleCallEdit = (callId_) => {
        setCallID(callId_);
        setOpenCallModal(true);
    }
    const handleRequirementEdit = (requirementId_) => {
        setRefresh(Math.random)
        setRequirementId(requirementId_);
        setOpenRequirementModal(true);
    }

    const tabs = [
        {
            component: <LeadBasic leadId={leadId}/>,
            label: 'Overview'
        },
        {
            component: <LeadActivity  leadId={leadId} />,
            label: 'Activity'
        },
        {
            component: <LeadCalls leadId={leadId} onCallEdit={handleCallEdit}/>,
            label: 'Calls'
        },
        {
            component: <LeadRequirement leadId={leadId} onRequirementEdit={handleRequirementEdit} />,
            label: 'Requirement'
        },
        {
            component: <LeadWorkorder  leadId={leadId} />,
            label: 'Work order'
        },
        {
            component: <LeadMeeting  leadId={leadId} />,
            label: 'Meeting'
        },
        {
            component: <LeadQuotation  leadId={leadId} />,
            label: 'Quotation'
        },
        {
            component: <LeadPayments  leadId={leadId} />,
            label: 'Payments'
        }
    ];

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getTabIdByLabel = (label) => {
        return Object.keys(tabs).find(key => tabs[key].label === label)
    }


    const callUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Calls'))) }
    const requirementUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Requirement'))) }

    useEffect(()=>{
        setLeadId(props.leadId);
    },[props.leadId])

    return (
        <>{parseInt(leadId) > 0 ?
                <Card variant="outlined">
                    <LeadAddCall key={refresh} callId={callId} isShow={openCallModal} onCallUpdate={callUpdateHandler} onHandleClose={handleCallClose} leadId={props.leadId}/>
                    <LeadAddRequirement key={refresh*2} requirementId={requirementId} isShow={openRequirementModal} onCallUpdate={requirementUpdateHandler} onHandleClose={handleRequirementClose} leadId={props.leadId}/>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider',px:2 }} >
                        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" >
                            {tabs.map((obj,index)=>{
                                return <Tab label={obj.label} key={index} {...a11yProps(index)} />
                            })}
                        </Tabs>
                    </Box>

                    <Card sx={{m:1,p:1}}>
                        <Grid sx={{width:"100%"}} container justifyContent="flex-end">
                            <Button onClick={handleCallClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add call</Button>
                            <Button onClick={handleRequirementClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add Requirement</Button>
                            <Button size="small" sx={{mr:1}} variant="outlined" startIcon={<StickyNote2TwoToneIcon  />}>Add Notes</Button>
                            <Button size="small" sx={{mr:1}} variant="outlined" startIcon={<CalendarMonthTwoToneIcon />}>Create a Meeting</Button>
                        </Grid>
                    </Card>

                    {tabs.map((obj,index)=>{
                        return <TabPanel value={activeTab} index={index} key={index}>
                            {obj.component}
                        </TabPanel>
                    })}
                </Card>
            :  <Card variant="outlined">
                <CardContent >
                    <Typography variant="h5" component="div">
                        No lead Selected
                    </Typography>
                </CardContent></Card>
            }
            </>
    );
};

export default LeadDetail;

