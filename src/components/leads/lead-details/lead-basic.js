import React, { useEffect, useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Skeleton,
    Typography
} from "@mui/material";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-item";
import { ActionList } from "../../action-list";
import { ActionListItem } from "../../action-list-item";
import { Eye as EyeIcon } from '../../../icons/eye';
import { LeadDetails } from "../../../api/Lists/LeadDetails";
import { deepOrange } from "@mui/material/colors";
import LeadEditModal from "../lead-modals/lead-edit-modal";
import LeadSaveContactModal from "./lead-basic/lead-save-contact-modal";
import ContactCard from "./lead-basic/contact-card";
import { LeadStages } from "./lead-stages";
import Labels from "./lead-basic/labels";
import FollowUp from "./lead-basic/follow-up";
import AddReferral from "../components/add-referral";
import { format, parse, parseISO } from "date-fns";
import ArchieveLead from './lead-archive';



export const LeadBasic = (props) => {
    //edit modal popup control
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    //ends

    //edit modal save contact control
    const [openContcatModal, setOpenContcatModal] = useState(false);
    const handleClickOpenContcatModal = () => { setOpenContcatModal(true); };
    const handleContcatModalClose = (id) => { setOpenContcatModal(false); };
    //ends
    const handleContactEdit = (id) => { setContactId(id); handleClickOpenContcatModal(); };

    const [state, setState] = useState(false);
    const [leadData, setLeadData] = useState();
    const [contactID, setContactId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let showFields = [
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "phone_number", label: "Phone Number" },
        { key: "requirement", label: "Requirement" },
        { key: "detailed_requirement", label: "Requirements in detail" },
        { key: "location", label: "Location" },
        { key: "address", label: "address" },
        { key: "pincode", label: "Pincode" }
    ];

    const fetchLeadDetails = async () => {
        setIsLoading(true)
        await LeadDetails.details(props.leadId).then(response => {
            setLeadData(response)
            setIsLoading(false)
        });
    }

    const leadUpdateHandler = () => {
        fetchLeadDetails();
    }

    const notfications = () => {
        let alerts = '';
        if (leadData.assigned_user !== null) {
            alerts = <Alert severity="info">This lead is handling by {leadData.assigned_user.name}</Alert>;
        }
        return alerts;
    }



    useEffect(() => {
        setState(true);
        fetchLeadDetails();
        return () => {
            setState(false);
        };
    }, [props.leadId])

    return (
        <Grid container sx={{ p: 1, m: 0 }}>
            <LeadSaveContactModal contactId={contactID} isShow={openContcatModal} onLeadUpdate={leadUpdateHandler} onHandleClose={handleContcatModalClose} leadId={props.leadId} />
            <LeadEditModal isShow={open} onLeadUpdate={leadUpdateHandler} onHandleClose={handleClose} leadId={props.leadId} />
            {isLoading ?
                <Skeleton variant="rectangular" width={'100%'} height={300} animation="wave" />
                :
                <>
                    <Grid item xs={12} sx={{ my: 1 }}>

                        {notfications()}
                    </Grid>
                    <Grid item xs={9}>
                        <Card
                            variant="outlined"
                        >
                            <CardHeader
                                action={(
                                    <Button
                                        color="primary"
                                        variant="text"
                                        onClick={handleClickOpen}
                                    >
                                        Edit lead no #{props.leadId}
                                    </Button>
                                )}
                                title={leadData.title ? leadData.title : "Lead info"}
                            />
                            <Divider />
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    px: 3,
                                    py: 1.5
                                }}
                            >
                                <Avatar sx={{
                                    height: 64,
                                    mr: 1,
                                    width: 64,
                                    bgcolor: deepOrange[500]
                                }} variant="rounded">
                                    {leadData.name.slice(0, 1).toUpperCase()}
                                </Avatar>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} color="inherit">
                                    {leadData.name}
                                    <br />
                                    <Typography style={{ marginRight: 'auto', color: 'grey', fontSize: '13px' }} variant="body2" color="inherit" component="span">
                                        {format(parseISO(leadData?.created_at), 'do MMM yyyy')}
                                    </Typography>
                                </IconButton>

                                {leadData.source_type && <><Divider /><Typography variant={"subtitle2"}>{leadData.source_type?.source_type_name}</Typography></>}
                                {leadData.referral &&
                                    <>
                                        <Typography variant={"subtitle2"}> ({leadData.referral?.name})</Typography>

                                    </>
                                }
                            </Box>
                            <Grid container>
                                <Grid item xs={12}>
                                    <PropertyList>
                                        <Grid container display={'flex'}>
                                            <Grid md={8.5}>
                                                <PropertyListItem
                                                    divider
                                                    label={leadData?.title}
                                                    value={leadData?.requirement}
                                                    style={{ flex: 1 }} // Adjust flex properties as needed
                                                />

                                            </Grid>
                                            <Grid md={3.5}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Status'}
                                                    value={leadData?.status}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>
                                        </Grid>
                                    </PropertyList>
                                </Grid>

                                <Grid item xs={12}>
                                    <PropertyList>
                                        <Grid container display={'flex'}>
                                            {/* <Grid md={4}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Name'}
                                                    value={leadData?.name}
                                                    style={{ flex: 1 }} // Adjust flex properties as needed
                                                />

                                            </Grid> */}
                                            <Grid md={6}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Email'}
                                                    value={leadData?.email}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>
                                            <Grid md={6}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Phone Number'}
                                                    value={leadData?.phone_number}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>
                                        </Grid>
                                    </PropertyList>
                                </Grid>

                                <Grid item xs={12}>
                                    <PropertyList>
                                        <Grid container display={'flex'}>
                                            <Grid md={6}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Location'}
                                                    value={leadData?.location}
                                                    style={{ flex: 1 }} // Adjust flex properties as needed
                                                />

                                            </Grid>
                                            {/* <Grid md={4}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Address'}
                                                    value={leadData?.address}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid> */}
                                            <Grid md={6}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Pincode'}
                                                    value={leadData?.pincode}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>
                                        </Grid>
                                    </PropertyList>
                                </Grid>

                                <Grid item xs={12}>
                                    <PropertyList>
                                        <Grid container display={'flex'}>

                                            <Grid md={12}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Address'}
                                                    value={leadData?.address}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>

                                        </Grid>
                                    </PropertyList>
                                </Grid>

                                <Grid item xs={12}>
                                    <PropertyList>
                                        <Grid container display={'flex'}>

                                            <Grid md={12}>
                                                <PropertyListItem
                                                    divider
                                                    label={'Requirments in detail'}
                                                    value={leadData?.detailed_requirement}
                                                    style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                />
                                            </Grid>

                                        </Grid>
                                    </PropertyList>
                                </Grid>

                                {/* <Grid item xs={6}>
                                    <PropertyList>
                                        {showFields.map((key, index) => {
                                            let total = Object.keys(showFields).length;
                                            if (index < total / 2) {
                                                let value = leadData[key.key];
                                                return <PropertyListItem
                                                    key={index}
                                                    divider
                                                    label={key.label}
                                                    value={value}
                                                />
                                            }
                                        })}
                                    </PropertyList>
                                </Grid>
                                <Grid item xs={6}>
                                    <PropertyList>
                                        {showFields.map((key, index) => {
                                            let total = Object.keys(showFields).length;
                                            if (index >= total / 2) {
                                                let value = leadData[key.key];
                                                return <PropertyListItem
                                                    key={index}
                                                    divider
                                                    label={key.label}
                                                    value={value}
                                                />
                                            }
                                        })}
                                    </PropertyList>
                                </Grid> */}
                            </Grid>

                            <Divider />
                            <ActionList>
                                {leadData.contact ? <></> :
                                    <ActionListItem
                                        onClick={handleClickOpenContcatModal}
                                        icon={EyeIcon}
                                        label="Save Contact"
                                    />
                                }
                            </ActionList>
                        </Card>
                        {leadData.contact ?
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <ContactCard contactDetails={leadData.contact} onEdit={handleContactEdit} />
                            </Grid>
                            :
                            <></>
                        }


                    </Grid>

                    <Grid item xs={3}>
                        <ArchieveLead />
                        {/*<FollowUp leadId={leadData.id}/>*/}
                        <Labels leadId={leadData.id} />
                        <LeadStages leadId={leadData.id} />
                    </Grid>
                </>
            }


        </Grid>
    );
};


