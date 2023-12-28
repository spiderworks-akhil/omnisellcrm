import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { LoadingScreen } from "../loading-screen";
import TabPanel from "../../utils/TabPanel";
import { LeadWorkorder } from "./lead-details/lead-workorder";
import AddIcCallTwoToneIcon from '@mui/icons-material/AddIcCallTwoTone';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LeadAddModal from "./lead-modals/lead-add-modal";
import LeadAddCall from "./lead-modals/lead-add-call";
import LeadEditModal from "./lead-modals/lead-edit-modal";
import LeadAddRequirement from "./lead-modals/lead-add-requirement";
import { User } from "../../icons/user";
import AssignUserToLeadModal from "./lead-details/lead-basic/assign-user-to-lead-modal";
import LeadAddTeamMember from "./lead-modals/lead-add-team-member";
import { LeadTeam } from "./lead-details/lead-team";
import LeadAddEditDemo from "./lead-details/lead-demo/add-edit-demo";
import { LeadDemo } from "./lead-details/lead-demo";
import LeadAddEditNote from "./lead-details/lead-notes/add-edit-note";
import { LeadNote } from "./lead-details/lead-note";
import { Archive, ContactPhone, WorkOutlined } from "@mui/icons-material";
import LeadAddEditWorkorder from "./lead-details/lead-workorder/add-edit-workorder";
import AddEditPaymentProfile from "./lead-details/lead-payment-profiles/add-edit-payment-profile";
import { Leads } from '../../api/Endpoints/Leads';
import { Note } from '../../api/Endpoints/Notes';
import { Team } from '../../api/Endpoints/Team';
import ArchieveLead from './lead-details/lead-archive';
import { deepOrange } from '@mui/material/colors';
import { LeadDetails } from '../../api/Lists/LeadDetails';
import { format, parseISO } from 'date-fns';
import LeadSaveContactModal from './lead-details/lead-basic/lead-save-contact-modal';
import LeadAddQuatation from './lead-modals/lead-add-quotation';

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
    const [afterEditRefres, setafterEditRefres] = useState(Math.random)

    const [leadData, setLeadData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    //edit modal popup control
    const [openCallModal, setOpenCallModal] = useState(false);
    const handleCallClickOpen = () => { setRefresh(Math.random); setCallID(false); setOpenCallModal(true); };
    const handleCallClose = () => { setOpenCallModal(false); setRefresh(Math.random) };
    //ends

    //edit modal popup control
    const [openPaymentProfileModal, setOpenPaymentProfileModal] = useState(false);
    const handlePaymentProfileClickOpen = () => { setRefresh(Math.random); setOpenPaymentProfileModal(false); setOpenPaymentProfileModal(true); };
    const handlePaymentProfileClose = () => { setOpenPaymentProfileModal(false); setRefresh(Math.random) };
    //ends

    //edit modal popup control
    const [openDemoModal, setOpenDemoModal] = useState(false);
    const handleDemoClickOpen = () => { setRefresh(Math.random); setDemoId(false); setOpenDemoModal(true); };
    const handleDemoClose = () => { setOpenDemoModal(false); setRefresh(Math.random) };
    //ends

    //edit modal popup control
    const [openWorkOrderModal, setOpenWorkOrderModal] = useState(false);
    const handleWorkOrderClickOpen = () => { setRefresh(Math.random); setWorkOrderId(false); setOpenWorkOrderModal(true); };
    const handleWorkOrderClose = () => { setOpenWorkOrderModal(false); setRefresh(Math.random) };
    //ends

    //edit modal popup control
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const handleNoteClickOpen = () => { setRefresh(Math.random); setNoteId(false); setOpenNoteModal(true); };
    const handleNoteClose = () => { setOpenNoteModal(false); setRefresh(Math.random) };
    //ends

    //edit modal popup control
    const [openRequirementModal, setOpenRequirementModal] = useState(false);
    const handleRequirementClickOpen = () => { setRefresh(Math.random); setRequirementId(false); setOpenRequirementModal(true); };
    const handleRequirementClose = () => { setOpenRequirementModal(false); setRefresh(Math.random) };
    //ends

    //AddToUser modal popup control
    const [openAddToUserModal, setOpenAddToUserModal] = useState(false);
    const handleAddToUserClickOpen = () => { setRefresh(Math.random); setOpenAddToUserModal(true); };
    const handleAddToUserClose = () => { setOpenAddToUserModal(false); setRefresh(Math.random) };
    //ends

    //Team member modal popup control
    const [openAddTeamMemberModal, setOpenAddTeamMemberModal] = useState(false);
    const handleAddTeamMemberClickOpen = () => { setRefresh(Math.random); setOpenAddTeamMemberModal(true); };
    const handleAddTeamMemberClickClose = () => { setOpenAddTeamMemberModal(false); setRefresh(Math.random) };
    //ends

    //Archieve modal popup control
    const [openArchieveModal, setOpenArchieveModal] = useState(false);
    const handleArchieveClickOpen = () => { setRefresh(Math.random); setOpenArchieveModal(true); };
    const handleArchieveClickClose = () => { setOpenArchieveModal(false); setRefresh(Math.random) };
    //ends

    // Lead edit modal popup control
    const [openLeadEditModal, setopenLeadEditModal] = useState(false)
    const handleLeadEditOpen = () => { setRefresh(Math.random); setopenLeadEditModal(true); };
    const handleLeadEditClose = () => { setopenLeadEditModal(false); setRefresh(Math.random) };
    //ends

    //Contact modal popup control
    const [openContactModalOpen, setopenContactModalOpen] = useState(false)
    const handleContactClickOpen = () => { setRefresh(Math.random); setopenContactModalOpen(true); };
    const handleContactClickClose = () => { setopenContactModalOpen(false); setRefresh(Math.random) };
    //ends

    //Quotation modal popup control
    const [openQuatationModal, setopenQuatationModal] = useState(false)
    const handleQuotationClickOpen = () => { setRefresh(Math.random); setopenQuatationModal(true); };
    const handleQuotationClickClose = () => { setopenQuatationModal(false); setRefresh(Math.random) };
    //ends

    const [callId, setCallID] = useState(false);
    const [demoId, setDemoId] = useState(false);
    const [noteId, setNoteId] = useState(false);
    const [workOrderId, setWorkOrderId] = useState(false);
    const [requirementId, setRequirementId] = useState(false);
    const [paymentProfileID, setPaymentProfileID] = useState(false);

    const [activityCount, setactivityCount] = useState(0)
    const [notesCount, setnotesCount] = useState(0)
    const [followCount, setfollowCount] = useState(0)
    const [teamCount, setteamCount] = useState(0)
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

    const getActivityCount = () => {
        Leads.getActivitiesOfLeads({ leads_id: leadId }).then(response => {
            setactivityCount(response?.data?.data?.activities?.length);
        })
    }

    const getNoteCount = () => {
        Note.get({ leads_id: leadId }).then(response => {
            setnotesCount(response.data.data.data.length);
        })
    }

    const getFollowCount = () => {
        Leads.getFollowUpOFLeads({ leads_id: leadId }).then(response => {
            setfollowCount(response.data.data.data.length);
        })
    }

    const getTeamCount = async () => {
        await Team.get({ leads_id: props.leadId }).then(response => {
            setteamCount(response.data.data.data.length);
        })
    }

    useEffect(() => {
        if (leadId) {
            getActivityCount()
            getNoteCount()
            getFollowCount()
            getTeamCount()
        }
    }, [leadId])




    const tabs = [
        {
            component: <LeadBasic leadId={leadId} refresh={afterEditRefres} />,
            label: 'Overview'
        },
        {
            component: <LeadActivity leadId={leadId} getCount={getActivityCount} />,
            label: `Activity (${activityCount})`
        },
        // {
        //     component: <LeadCalls leadId={leadId} onCallEdit={handleCallEdit}/>,
        //     label: 'Calls'
        // },
        {
            component: <LeadNote leadId={leadId} onNoteEdit={handleNoteEdit} getCount={getNoteCount} />,
            label: `Notes (${notesCount})`
        },
        {
            component: <LeadDemo leadId={leadId} onDemoEdit={handleDemoEdit} getCount={getFollowCount} />,
            label: `Follow Up (${followCount})`
        },
        {
            component: <LeadTeam leadId={leadId} onCallEdit={handleTeamEdit} getCount={getTeamCount} />,
            label: `Team (${teamCount})`
        },
        // {
        //     component: <LeadRequirement leadId={leadId} onRequirementEdit={handleRequirementEdit} />,
        //     label: 'Requirement'
        // },
        // {
        //     component: <LeadPaymentProfiles  leadId={leadId} onEdit={handlePaymentProfileEdit}/>,
        //     label: 'Payment Profiles'
        // },
        // {
        //     component: <LeadWorkorder  leadId={leadId} />,
        //     label: 'Work order'
        // },
        // {
        //     component: <LeadInvoices  leadId={leadId} />,
        //     label: 'Invoice'
        // },
        // {
        //     component: <LeadMeeting  leadId={leadId} />,
        //     label: 'Meeting'
        // },
        {
            component: <LeadQuotation leadId={leadId} />,
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


    // const callUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Calls'))) }
    const demoUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel(`Follow Up (${followCount})`))) }
    const noteUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel(`Notes (${notesCount})`))) }
    // const requirementUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Requirement'))) }
    const AddToUserUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Overview'))) }
    const TeamMemberUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel(`Team (${teamCount})`))) }
    // const ArchieveUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Archieve'))) }
    // const workOrderUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Work order'))) }
    // const paymentProfileUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Payment Profiles'))) }
    const quotationUpdateHandler = () => { setActiveTab(0); setActiveTab(parseInt(getTabIdByLabel('Quotation'))) }


    const fetchLeadDetails = async () => {
        setIsLoading(true)
        await LeadDetails.details(props.leadId).then(response => {
            setLeadData(response)
            setIsLoading(false)
        });
    }

    const leadUpdateHandler = () => {
        setafterEditRefres(Math.random)
        fetchLeadDetails();
        setTimeout(() => {
            handleLeadEditClose()
        }, 1000);
    }

    const contactUpdate = () => {
        setafterEditRefres(Math.random)
        setTimeout(() => {
            handleContactClickClose()
        }, 1000);
    }

    useEffect(() => {
        setLeadId(props.leadId);
        fetchLeadDetails();
    }, [props.leadId])

    return (
        <>{parseInt(leadId) > 0 ?
            <Card variant="outlined">

                {/* <AddEditPaymentProfile
                    key={refresh * 8}
                    editId={paymentProfileID}
                    isShow={openPaymentProfileModal}
                    onUpdate={paymentProfileUpdateHandler}
                    onHandleClose={handlePaymentProfileClose}
                    leadId={props.leadId} /> */}

                {/* <LeadAddEditWorkorder
                    key={refresh * 7}
                    editId={workOrderId}
                    isShow={openWorkOrderModal}
                    onUpdate={workOrderUpdateHandler}
                    onHandleClose={handleWorkOrderClose}
                    leadId={props.leadId} /> */}


                {/* <LeadAddCall key={refresh} callId={callId} isShow={openCallModal} onCallUpdate={callUpdateHandler} onHandleClose={handleCallClose} leadId={props.leadId} /> */}
                <LeadAddEditDemo
                    key={refresh * 5}
                    editId={demoId}
                    getCount={getFollowCount}
                    isShow={openDemoModal}
                    onDemoUpdate={demoUpdateHandler}
                    onHandleClose={handleDemoClose}
                    leadId={props.leadId} />

                <LeadAddEditNote
                    key={refresh * 6}
                    editId={noteId}
                    getCount={getNoteCount}
                    isShow={openNoteModal}
                    onDemoUpdate={noteUpdateHandler}
                    onHandleClose={handleNoteClose}
                    leadId={props.leadId}
                />

                {/* <LeadAddRequirement key={refresh * 2} requirementId={requirementId} isShow={openRequirementModal} onCallUpdate={requirementUpdateHandler} onHandleClose={handleRequirementClose} leadId={props.leadId} /> */}
                <AssignUserToLeadModal
                    key={refresh * 3}
                    isShow={openAddToUserModal}
                    onHandleClose={handleAddToUserClose}
                    onUserAssigned={AddToUserUpdateHandler}
                    leadId={props.leadId} />


                <LeadAddTeamMember
                    key={refresh * 4}
                    getCount={getTeamCount}
                    isShow={openAddTeamMemberModal}
                    onHandleClose={handleAddTeamMemberClickClose}
                    onTeamUpdate={TeamMemberUpdateHandler}
                    leadId={props.leadId} />

                <ArchieveLead
                    key={refresh * 4}
                    getCount={getTeamCount}
                    isShow={openArchieveModal}
                    onHandleClose={handleArchieveClickClose}
                    // onTeamUpdate={TeamMemberUpdateHandler}
                    leadId={props.leadId} />

                <LeadEditModal
                    isShow={openLeadEditModal}
                    onLeadUpdate={leadUpdateHandler}
                    onHandleClose={handleLeadEditClose}
                    leadId={props.leadId} />

                <LeadSaveContactModal
                    contactId={null}
                    isShow={openContactModalOpen}
                    onLeadUpdate={contactUpdate}
                    onHandleClose={handleContactClickClose}
                    leadId={props.leadId} />

                <LeadAddQuatation
                    key={refresh * 4}
                    isShow={openQuatationModal}
                    onHandleClose={handleQuotationClickClose}
                    onQuotationUpdate={TeamMemberUpdateHandler}
                    leadId={props.leadId} />



                <Card sx={{ mt: 1, ml: 1, pt: 1, pl: 1 }}>
                    <Grid sx={{ width: "100%" }} container justifyContent="space-between">
                        {isLoading ?
                            <Skeleton variant="rectangular" width={'30%'} height={64} animation="wave" />
                            :
                            <Grid>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        // px: 3,
                                        // py: 1
                                    }}
                                >
                                    <Avatar sx={{
                                        height: 64,
                                        mr: 1,
                                        width: 64,
                                        bgcolor: deepOrange[500]
                                    }} variant="rounded">
                                        {leadData?.name?.slice(0, 1)?.toUpperCase()}
                                    </Avatar>
                                    <Grid display={'flex'}>
                                        <Grid>
                                            <IconButton style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} color="inherit">
                                                <span style={{}}>{leadData?.name}</span>
                                                <Typography style={{ color: 'grey', fontSize: '13px', alignSelf: 'center' }} variant="body2" color="inherit" component="span">
                                                    <span style={{ color: 'blue', marginRight: '7px' }}>#{leadData?.id}</span>
                                                    {format(parseISO(leadData?.created_at), 'do MMM yyyy')}
                                                </Typography>
                                            </IconButton>
                                        </Grid>
                                        <Grid display={'flex'} alignItems={'end'}>
                                            <Button onClick={handleLeadEditOpen} style={{ marginLeft: '7px' }}>Edit</Button>
                                        </Grid>

                                    </Grid>


                                    {leadData?.source_type && <><Divider /><Typography variant={"subtitle2"}>{leadData?.source_type?.source_type_name}</Typography></>}
                                    {leadData?.referral &&
                                        <>
                                            <Typography variant={"subtitle2"}> ({leadData.referral?.name})</Typography>

                                        </>
                                    }
                                </Box>
                            </Grid>
                        }

                        <Grid>
                            {/* <Button onClick={handleCallClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add call</Button> */}
                            <Button onClick={handleDemoClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Follow Up</Button>
                            <Button onClick={handleNoteClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<StickyNote2TwoToneIcon />}>Notes</Button>
                            {/* <Button onClick={handleRequirementClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<AddIcCallTwoToneIcon />}>Add Requirement</Button> */}
                            <Button onClick={handleAddToUserClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<User />}>Assign</Button>
                            <Button onClick={handleQuotationClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<User />}>Quotation</Button>
                            <Button disabled={leadData?.contact ? true : false} onClick={handleContactClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<ContactPhone />}>Save Contact</Button>
                            <Button onClick={handleArchieveClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<Archive />}>Archive</Button>

                            {/* <Button onClick={handleAddTeamMemberClickOpen} size="small" sx={{ mr: 1 }} variant="outlined" startIcon={<User />}>Add team member</Button> */}
                            {/* <Button size="small" sx={{mr:1}} variant="outlined" startIcon={<CalendarMonthTwoToneIcon />}>Create a Meeting</Button> */}
                            {/* <Button  onClick={handleWorkOrderClickOpen} size="small" sx={{mr:1,mt:1}} variant="outlined" startIcon={<WorkOutlined />}>Create a Work Order</Button>
                                    <Button onClick={handlePaymentProfileClickOpen} size="small" sx={{mr:1,mt:1}} variant="outlined" startIcon={<User />}>
                                        Add a payment profile
                                    </Button> */}
                        </Grid>
                    </Grid>
                </Card>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }} >
                    <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" >
                        {tabs.map((obj, index) => {
                            return <Tab label={obj.label} key={index} {...a11yProps(index)} />
                        })}
                    </Tabs>
                </Box>

                {tabs.map((obj, index) => {
                    return <TabPanel value={activeTab} index={index} key={index}>
                        {obj.component}
                    </TabPanel>
                })}
            </Card>
            : <Card variant="outlined">
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

