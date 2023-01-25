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
import {User} from "../../icons/user";
import AssignUserToLeadModal from "./lead-details/lead-basic/assign-user-to-lead-modal";
import LeadAddTeamMember from "./lead-modals/lead-add-team-member";
import {LeadTeam} from "./lead-details/lead-team";
import LeadAddEditDemo from "./lead-details/lead-demo/add-edit-demo";
import {LeadDemo} from "./lead-details/lead-demo";
import LeadAddEditNote from "./lead-details/lead-notes/add-edit-note";
import {LeadNote} from "./lead-details/lead-note";
import {WorkOutlined} from "@mui/icons-material";
import LeadAddEditWorkorder from "./lead-details/lead-workorder/add-edit-workorder";
import AddEditPaymentProfile from "./lead-details/lead-payment-profiles/add-edit-payment-profile";

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
const LeadPaymentProfiles = Loadable(lazy(() => import('./lead-details/lead-payment-profiles').then((module) => ({ default: module.LeadPaymentProfiles }))));

const LeadInvoices = Loadable(lazy(() => import('./lead-details/lead-invoices').then((module) => ({ default: module.LeadInvoices }))));

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
    const [openPaymentProfileModal, setOpenPaymentProfileModal] = useState(false);
    const handlePaymentProfileClickOpen = () => { setRefresh(Math.random); setOpenPaymentProfileModal(false);setOpenPaymentProfileModal(true); };
    const handlePaymentProfileClose = () => { setOpenPaymentProfileModal(false);setRefresh(Math.random)};
    //ends




    //edit modal popup control
    const [openDemoModal, setOpenDemoModal] = useState(false);
    const handleDemoClickOpen = () => { setRefresh(Math.random); setDemoId(false);setOpenDemoModal(true); };
    const handleDemoClose = () => { setOpenDemoModal(false);setRefresh(Math.random)};
    //ends

    //edit modal popup control
    const [openWorkOrderModal, setOpenWorkOrderModal] = useState(false);
    const handleWorkOrderClickOpen = () => { setRefresh(Math.random); setWorkOrderId(false);setOpenWorkOrderModal(true); };
    const handleWorkOrderClose = () => { setOpenWorkOrderModal(false);setRefresh(Math.random)};
    //ends

    //edit modal popup control
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const handleNoteClickOpen = () => { setRefresh(Math.random); setNoteId(false);setOpenNoteModal(true); };
    const handleNoteClose = () => { setOpenNoteModal(false);setRefresh(Math.random)};
    //ends

    //edit modal popup control
    const [openRequirementModal, setOpenRequirementModal] = useState(false);
    const handleRequirementClickOpen = () => { setRefresh(Math.random); setRequirementId(false);setOpenRequirementModal(true); };
    const handleRequirementClose = () => { setOpenRequirementModal(false);setRefresh(Math.random)};
    //ends

    //AddToUser modal popup control
    const [openAddToUserModal, setOpenAddToUserModal] = useState(false);
    const handleAddToUserClickOpen = () => { setRefresh(Math.random);setOpenAddToUserModal(true); };
    const handleAddToUserClose = () => { setOpenAddToUserModal(false);setRefresh(Math.random)};
    //ends

    //Team member modal popup control
    const [openAddTeamMemberModal, setOpenAddTeamMemberModal] = useState(false);
    const handleAddTeamMemberClickOpen = () => { setRefresh(Math.random);setOpenAddTeamMemberModal(true); };
    const handleAddTeamMemberClickClose = () => { setOpenAddTeamMemberModal(false);setRefresh(Math.random)};
    //ends

    const [callId, setCallID] = useState(false);
    const [demoId, setDemoId] = useState(false);
    const [noteId, setNoteId] = useState(false);
    const [workOrderId, setWorkOrderId] = useState(false);
    const [requirementId, setRequirementId] = useState(false);
    const [paymentProfileID, setPaymentProfileID] = useState(false);

    const handleCallEdit = (callId_) => {
        setCallID(callId_);
        setOpenCallModal(true);
    }

    const handlePaymentProfileEdit = (_paymentProfileID) => {
        setPaymentProfileID(_paymentProfileID);
        setOpenPaymentProfileModal(true);
    }


    const handleRequirementEdit = (requirementId_) => {
        setRefresh(Math.random)
        setRequirementId(requirementId_);
        setOpenRequirementModal(true);
    }

    const handleTeamEdit = (requirementId_) => {
        setRefresh(Math.random)
        setRequirementId(requirementId_);
        setOpenRequirementModal(true);
    }

    const handleDemoEdit = (id) => {
        setRefresh(Math.random)
        setDemoId(id);
        setOpenDemoModal(true);
    }

    const handleNoteEdit = (id) => {
        setRefresh(Math.random)
        setNoteId(id);
        setOpenNoteModal(true);
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
            component: <LeadNote leadId={leadId} onNoteEdit={handleNoteEdit}/>,
            label: 'Notes'
        },
        {
            component: <LeadDemo leadId={leadId} onDemoEdit={handleDemoEdit}/>,
            label: 'Follow Up'
        },
        {
            component: <LeadTeam leadId={leadId} onCallEdit={handleTeamEdit}/>,
            label: 'Team'
        },
        {
            component: <LeadRequirement leadId={leadId} onRequirementEdit={handleRequirementEdit} />,
            label: 'Requirement'
        },
        {
            component: <LeadPaymentProfiles  leadId={leadId} onEdit={handlePaymentProfileEdit}/>,
            label: 'Payment Profiles'
        },
        {
            component: <LeadWorkorder  leadId={leadId} />,
            label: 'Work order'
        },
        {
            component: <LeadInvoices  leadId={leadId} />,
            label: 'Invoice'
        },
        {
            component: <LeadMeeting  leadId={leadId} />,
            label: 'Meeting'
        },
        {
            component: <LeadQuotation  leadId={leadId} />,
            label: 'Quotation'
        },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getTabIdByLabel = (label) => {
        return Object.keys(tabs).find(key => tabs[key].label === label)
    }


    const callUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Calls'))) }
    const demoUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Follow Up'))) }
    const noteUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Notes'))) }
    const requirementUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Requirement'))) }
    const AddToUserUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Overview'))) }
    const TeamMemberUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Team'))) }
    const workOrderUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Work order'))) }
    const paymentProfileUpdateHandler = () => {   setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Payment Profiles'))) }

    useEffect(()=>{
        setLeadId(props.leadId);
    },[props.leadId])

    return (
        <>{parseInt(leadId) > 0 ?
                <Card variant="outlined">

                    <AddEditPaymentProfile
                        key={refresh*8}
                        editId={paymentProfileID}
                        isShow={openPaymentProfileModal}
                        onUpdate={paymentProfileUpdateHandler}
                        onHandleClose={handlePaymentProfileClose}
                        leadId={props.leadId}/>

                    <LeadAddEditWorkorder
                        key={refresh*7}
                        editId={workOrderId}
                        isShow={openWorkOrderModal}
                        onUpdate={workOrderUpdateHandler}
                        onHandleClose={handleWorkOrderClose}
                        leadId={props.leadId}/>


                    <LeadAddCall key={refresh} callId={callId} isShow={openCallModal} onCallUpdate={callUpdateHandler} onHandleClose={handleCallClose} leadId={props.leadId}/>
                    <LeadAddEditDemo
                        key={refresh*5}
                        editId={demoId}
                        isShow={openDemoModal}
                        onDemoUpdate={demoUpdateHandler}
                        onHandleClose={handleDemoClose}
                        leadId={props.leadId}/>

                    <LeadAddEditNote
                        key={refresh*6}
                        editId={noteId}
                        isShow={openNoteModal}
                        onDemoUpdate={noteUpdateHandler}
                        onHandleClose={handleNoteClose}
                        leadId={props.leadId}
                    />

                    <LeadAddRequirement key={refresh*2} requirementId={requirementId} isShow={openRequirementModal} onCallUpdate={requirementUpdateHandler} onHandleClose={handleRequirementClose} leadId={props.leadId}/>
                    <AssignUserToLeadModal
                        key={refresh*3}
                        isShow={openAddToUserModal}
                        onHandleClose={handleAddToUserClose}
                        onUserAssigned={AddToUserUpdateHandler}
                        leadId={props.leadId}/>
                    <LeadAddTeamMember
                        key={refresh*4}
                        isShow={openAddTeamMemberModal}
                        onHandleClose={handleAddTeamMemberClickClose}
                        onTeamUpdate={TeamMemberUpdateHandler}
                        leadId={props.leadId}/>



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
                            <Button onClick={handleDemoClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add Follow Up</Button>
                            <Button onClick={handleNoteClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<StickyNote2TwoToneIcon  />}>Add Notes</Button>
                            <Button onClick={handleRequirementClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add Requirement</Button>
                            <Button onClick={handleAddToUserClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<User />}>Assign to a User</Button>
                            <Button onClick={handleAddTeamMemberClickOpen} size="small" sx={{mr:1}} variant="outlined" startIcon={<User />}>Add team member</Button>
                            <Button size="small" sx={{mr:1}} variant="outlined" startIcon={<CalendarMonthTwoToneIcon />}>Create a Meeting</Button>
                            <Button  onClick={handleWorkOrderClickOpen} size="small" sx={{mr:1,mt:1}} variant="outlined" startIcon={<WorkOutlined />}>Create a Work Order</Button>
                            <Button onClick={handlePaymentProfileClickOpen} size="small" sx={{mr:1,mt:1}} variant="outlined" startIcon={<User />}>
                                Add a payment profile
                            </Button>
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

