import React, { useEffect, useState } from 'react';
import NoDataAvailableYet from "../../utils/NoDataAvailableYet";
import { Avatar, Box, Button, Card, CardHeader, CircularProgress, Divider, Grid, IconButton, MenuItem, Modal, Skeleton, Typography } from "@mui/material";
import { PreQualifiers } from "../../api/Endpoints/PreQualifiers";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { ActionList } from "../action-list";
import { ActionListItem } from "../action-list-item";
import { Eye as EyeIcon } from "../../icons/eye";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { Delete, NetworkCheck, PublishedWithChanges } from "@mui/icons-material";
import { Check } from "../../icons/check";
import ConfirmAlert from "../../utils/ConfirmAlert";
import { Leads } from "../../api/Endpoints/Leads";
import { format, parseISO } from "date-fns";
import axios from 'axios';
import { useAppSettings } from '../../hooks/use-app-settings';
import { useForm } from 'react-hook-form';
import { Lists } from '../../api/Lists/Lists';
import SelectInputWithSearch from '../Form/SelectInputWithSearch';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};




const PrequalifierDetails = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, reset } = useForm();


    let showFields = [
        { key: "title", label: "Title" },
        { key: "name", label: "Name" },
        { key: "email", label: "E-Mail" },
        { key: "phone_number", label: "Phone Number" },
        { key: "requirement", label: "Requirement" },
        { key: "detailed_requirement", label: "Requirements in detail" },
        { key: "location", label: "Location" },
        { key: "address", label: "Address" },
        { key: "company_name", label: "Company name" },
        // { key: "created_at", label: "Created at" },
        { key: "original_source", label: "Orginal Source" },
        { key: "search_keyword", label: "Search keyword" },
        { key: "status", label: "Status" },
        { key: "gclid", label: "GCLID" },
        { key: "ip_address", label: "IP Address" },
        { key: "source_app", label: "Source App" },
        { key: "source_url", label: "Source URL" },
        { key: "source_website", label: "Source Website" },
        { key: "utm_campaign", label: "Utm campaign" },
        { key: "utm_medium", label: "Utm medium" },
        { key: "utm_source", label: "Utm source" },
    ];

    const [state, setState] = useState(false);
    const [leadData, setLeadData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // delete confirm popup data
    const [open, setOpen] = useState(false);
    const handleShow = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }
    const [isDeleted, setIsDeleted] = useState(false)
    const [avilableLeadTypes, setAvilableLeadTypes] = useState([]);
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());
    const [deleteRefresh, setDeleteRefresh] = useState(false)
    const [undoRefresh, setUndoRefresh] = useState(false)
    const [changeLeedModal, setChangeLeedModal] = React.useState(false);
    const handleOpenchangeLeedModal = () => setChangeLeedModal(true);
    const handleClosechangeLeedModal = () => setChangeLeedModal(false);
    const [deleting, setdeleting] = useState(false)


    const fetchPrequalifierDetails = async () => {
        setIsLoading(true);
        await PreQualifiers.details({ lead_id: props.id }).then(response => {
            setLeadData(response.data.data);
        })
        setIsLoading(false);
    }

    const fetchPrequalifierDetailsAfterDelete = async () => {
        try {

            await PreQualifiers.details({ lead_id: props.id }).then(response => {
                setLeadData(response.data.data);
                setDeleteRefresh(false)
                setUndoRefresh(false)
            })
        } catch (error) {
            setDeleteRefresh(false)
            setUndoRefresh(false)
        }
    }

    useEffect(() => {
        setState(true); setIsDeleted(false);
        // beforeRefresh()
        if (props.id !== null) {
            fetchPrequalifierDetails();
            getLeads()
            setValue('lead_type', leadType)
        }
        console.log("Created")
        return () => {
            setState(false);
        };
    }, [props.id])




    const confirmAction = () => {
        // setOpen(true)
        setDeleteRefresh(true)
        PreQualifiers.reject({ lead_id: props.id }).then(response => {
            if (response.data.status !== "error") {
                toast.success(response.data.message)
                fetchPrequalifierDetailsAfterDelete()

                props.onDelete()
            } else {
                toast.error(response.data.message)
                // setDeleteRefresh(false)
            }
        })
    }

    const handleDeleteConfirmation = (confirmed) => {
        if (confirmed) {
            PreQualifiers.reject({ lead_id: props.id }).then(response => {
                if (response.data.status !== "error") {
                    toast.success(response.data.message)
                    // setIsDeleted(true);
                    props.onDelete()
                } else {
                    toast.error(response.data.message)
                }
            })
        }
    }

    const handleUndoDelete = () => {
        setUndoRefresh(true)
        PreQualifiers.undo({ id: props.id }).then(response => {
            console.log(response);
            if (response.data.status !== "error") {
                toast.success('Done')
                // setIsDeleted(true); 
                fetchPrequalifierDetailsAfterDelete()
                props.onDelete()
                // setUndoRefresh(false)
            } else {
                toast.error(response.data.message)
                setUndoRefresh(false)
            }
        })
    }

    const handleAccept = () => {
        PreQualifiers.accept({ lead_id: props.id }).then(response => {
            if (response.data.status !== "error") {
                toast.success(response.data.message)
                setIsDeleted(true);
                props.onDelete()
            } else {
                toast.error(response.data.message)
            }
        })
    }

    const getLeads = () => {
        Lists.leadTypes().then(response => {
            // console.log(response);
            setAvilableLeadTypes(response)
        });
    }

    // console.log(leadData);


    if (props.id === null || isDeleted) {
        return <NoDataAvailableYet message={'Please select a pre qualifier'} />
    } else {
        return (
            <div>
                <ConfirmAlert isShow={open} onClose={handleClose}
                    title="Confirm deletion"
                    message="Are you sure you want to delete this lead?. This action is not reversible"
                    onConfirm={handleDeleteConfirmation} />
                {isLoading ?
                    <Skeleton variant="rectangular" width={'100%'} height={300} animation="wave" />
                    :
                    <>
                        <Grid item xs={12}>
                            <Card
                                variant="outlined"
                            >

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
                                        bgcolor: deepPurple[300],
                                        color: "#fff",
                                        height: 64,
                                        mr: 1,
                                        width: 64
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

                                    <Button onClick={handleOpenchangeLeedModal} variant={"outlined"} size={"small"} color={"success"} sx={{ ml: 5, position: "absolute", right: "275px" }}><PublishedWithChanges /> Change Lead Type</Button>

                                    {leadData?.status == 'Rejected' ?
                                        <Button disabled={undoRefresh} onClick={handleUndoDelete} variant={"outlined"} size={"small"} color={"error"} sx={{ ml: 5, position: "absolute", right: "24px", width: '74px' }}>{undoRefresh ? <CircularProgress size="23px" /> : <Delete />}{undoRefresh ? '' : 'Undo'}</Button>
                                        :
                                        <Button disabled={deleteRefresh} onClick={confirmAction} variant={"outlined"} size={"small"} color={"error"} sx={{ ml: 5, position: "absolute", right: "24px", width: '84px' }}> {deleteRefresh ? <CircularProgress size="23px" /> : <Delete />}{deleteRefresh ? '' : 'Delete'}</Button>
                                    }
                                    <Button onClick={handleAccept} variant={"outlined"} size={"small"} color={"success"} sx={{ ml: 5, position: "absolute", right: "120px" }}><Check /> Convert to Lead</Button>

                                </Box>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {/*<ActionList>*/}
                                        {/*    <ActionListItem*/}
                                        {/*        onClick={confirmAction}*/}
                                        {/*        icon={Delete}*/}
                                        {/*        label="Delete"*/}
                                        {/*    />*/}
                                        {/*    <ActionListItem*/}
                                        {/*        onClick={handleAccept}*/}
                                        {/*        icon={Check}*/}
                                        {/*        label="Convert to Lead"*/}
                                        {/*    />*/}
                                        {/*</ActionList>*/}
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
                                    {/* <divider /> */}
                                    <Grid item xs={12}>
                                        <PropertyList>
                                            <Grid container display={'flex'}>
                                                <Grid md={3}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'Name'}
                                                        value={leadData?.name}
                                                        style={{ flex: 1 }} // Adjust flex properties as needed
                                                    />

                                                </Grid>
                                                <Grid md={4}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'Email'}
                                                        value={leadData?.email}
                                                        style={{ flex: 1, marginLeft: 'auto' }} // Adjust flex properties as needed
                                                    />
                                                </Grid>
                                                <Grid md={5}>
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


                                    {
                                        leadData?.company_name &&
                                        <Grid item xs={12}>
                                            <PropertyList>
                                                <Grid container display={'flex'}>
                                                    <Grid md={12}>
                                                        <PropertyListItem
                                                            // divider
                                                            label={'Company'}
                                                            value={leadData?.company_name}
                                                            style={{ flex: 1 }} // Adjust flex properties as needed
                                                        />
                                                        <Divider sx={{}} />

                                                    </Grid>
                                                </Grid>
                                            </PropertyList>
                                        </Grid>
                                    }

                                    <Grid item xs={12}>
                                        <PropertyList>
                                            <Grid container display={'flex'}>
                                                <Grid md={3}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'Source App'}
                                                        value={leadData?.source_app}
                                                        style={{ flex: 1 }} // Adjust flex properties as needed
                                                    />

                                                </Grid>
                                                <Grid md={4}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'Source Website'}
                                                        value={leadData?.source_website}
                                                        style={{ flex: 1 }} // Adjust flex properties as needed
                                                    />
                                                </Grid>
                                                <Grid md={5}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'Source URL'}
                                                        value={leadData?.source_url}
                                                        style={{ flex: 1 }} // Adjust flex properties as needed
                                                    />

                                                </Grid>

                                                {/* <Divider sx={{ }} /> */}
                                            </Grid>
                                        </PropertyList>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <PropertyList>
                                            <Grid container display={'flex'}>
                                                <Grid md={12}>
                                                    <PropertyListItem
                                                        divider
                                                        label={'IP Address'}
                                                        value={leadData?.ip_address}
                                                        style={{ flex: 1 }} // Adjust flex properties as needed
                                                    />

                                                </Grid>
                                            </Grid>
                                        </PropertyList>
                                    </Grid>

                                    {/* mapping items in each column */}
                                    {/* <Grid item xs={6}>
                                        <PropertyList>
                                            {showFields.map((key, index) => {
                                                let total = Object.keys(showFields).length;
                                                if (index < total / 2) {
                                                    let value = leadData[key.key];
                                                    if (value) {
                                                        return <PropertyListItem
                                                            key={index}
                                                            divider
                                                            label={key.label}
                                                            value={value}
                                                        />
                                                    }
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
                                                    if (value) {
                                                        return <PropertyListItem
                                                            key={index}
                                                            divider
                                                            label={key.label}
                                                            value={value}
                                                        />
                                                    }
                                                }
                                            })}
                                        </PropertyList>
                                    </Grid> */}
                                </Grid>

                                <Divider />


                            </Card>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                    </>
                }

                <div>
                    <Modal
                        open={changeLeedModal}
                        onClose={handleClosechangeLeedModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change Leed Type
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <SelectInputWithSearch ismultiple={"false"} control={control} name={'lead_type'}
                                    defaultValue={watch('lead_type')}>
                                    {
                                        avilableLeadTypes.map(obj => {
                                            return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                        })
                                    }
                                </SelectInputWithSearch>
                            </Typography>

                            <Grid mt={2} display={'flex'} justifyContent={'space-between'}>
                                <Button onClick={handleClosechangeLeedModal}>
                                    Cancel
                                </Button>
                                <Button>
                                    Confirm
                                </Button>

                            </Grid>
                        </Box>
                    </Modal>
                </div>
            </div>
        );
    }

};

export default PrequalifierDetails;
