import React, { useEffect, useState } from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress, MenuItem, Skeleton,
    Slide,
    Typography
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { LoadingButton } from "@mui/lab";
import { useAppSettings } from "../../../hooks/use-app-settings";
import { Leads } from "../../../api/Endpoints/Leads";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Lists } from "../../../api/Lists/Lists";
import DynamicChip from "../../../utils/DynamicChip";
import { LeadDetails } from "../../../api/Lists/LeadDetails";
import { LoadingScreen } from "../../loading-screen";
import { Close } from "@mui/icons-material";
import SelectInputWithSearch from '../../Form/SelectInputWithSearch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadEditModal = (props) => {
    // Lead data fetching
    const [leadData, setLeadData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    //ends

    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());
    const [isEdit, setIsEdit] = useState(true);
    const [lastLeadId, setLastLeadId] = useState(false);
    const [avilableLeadTypes, setAvilableLeadTypes] = useState([]);



    //component variables
    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Update",
        loading: false,
        disabled: false,
    });
    const [alerts, setAlerts] = useState({
        type: '',
        message: '',
        active: false
    })

    const scheme = yup.object().shape({
        name: yup.string().required(),
        company_name: yup.string().nullable(),
        phone_number: yup.string().ensure().when("email", {
            is: "",
            then: yup.string().required("Phone number is required when email is not present.")
        }),
        email: yup.string().ensure().when("phone_number", {
            is: "",
            then: yup.string().required("Email is required when Phone number is not present.")
        }),
    }, ["email", "phone_number"])


    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({ resolver: yupResolver(scheme) });

    const onSubmit = data => {
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            id: props.leadId,
            lead_types_id: leadType,
            name: data.name,
            title: data.title,
            company_name: data.company_name,
            address: data.address,
            email: data.email,
            phone_number: data.phone_number,
            requirement: data.requirement,
            secondary_phone_number: data.secondary_phone_number,
            location: data.location,
            pincode: data.pincode,
            detailed_requirement: data.detailed_requirement,
        };

        Leads.updateLead(dataToSubmit).then(response => {
            setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
            setAlerts({ active: true, message: response.data.message, type: response.data.status })
            setLastLeadId(response.data.data.id)
            props.onLeadUpdate();
            setFormButtonStatus({ label: "Update", loading: false, disabled: false });
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({ label: "Update", loading: false, disabled: false });
        })

    };

    const handleLeadTypeChange = (leadId) => {
        setValue('lead_type',leadType)
        setLeadType(leadId);
    }

    const fetchLeadDetails = async () => {
        setIsLoading(true)
        await LeadDetails.details(props.leadId).then(response => {
            setLeadData(response)
            setIsLoading(false)
        }).then(() => {
            if (leadData) {
                setValue('name', leadData.name)
                setValue('company_name', leadData.company_name)
                setValue('title', leadData.title)
                setValue('address', leadData.address)
                setValue('phone_number', leadData.phone_number)
                setValue('email', leadData.email)
                setValue('requirement', leadData.requirement)
                setValue('secondary_phone_number', leadData.secondary_phone_number)
                setValue('location', leadData.location)
                setValue('pincode', leadData.pincode)
                setValue('detailed_requirement', leadData.detailed_requirement)
                setLeadType(leadData.lead_types_id)
            }

        });
    }



    useEffect(() => {
        props.isShow ? setOpen(true) : setOpen(false);
        Lists.leadTypes().then(response => {
            setAvilableLeadTypes(response)
        });
        setValue('lead_type',leadType)
        fetchLeadDetails();
    }, [props.isShow, props.leadId])

    return (
        <div>
            <Dialog
                fullScreen={true}
                PaperProps={{ sx: { width: "60%", height: "100%", position: "fixed", right: 0 } }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {isLoading ?
                    <LinearProgress color="inherit" />
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>{isEdit ? "Edit lead" : "Create new Lead"}  </DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid sx={{ p: 1 }} item xs={12}>
                                                {/* {avilableLeadTypes.map((obj, index) => {
                                                    return <DynamicChip key={index} onChipCLick={handleLeadTypeChange}
                                                                        active={leadType} id={obj.id} name={obj.name}
                                                                        sx={{m: 0.3}}/>
                                                })} */}
                                                <Typography variant={"subtitle2"}>Lead type</Typography>
                                                <SelectInputWithSearch ismultiple={"false"} control={control} name={'lead_type'}
                                                    defaultValue={watch('lead_type')}>
                                                    {
                                                        avilableLeadTypes.map(obj => {
                                                            return <MenuItem onChange={handleLeadTypeChange} value={obj.id}>{obj.name}</MenuItem>
                                                        })
                                                    }
                                                </SelectInputWithSearch>

                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="name" label="Name of the contact person"
                                                    value={watch('name')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="company_name" label="Organization name"
                                                    value={watch('company_name')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="email" label="Email address"
                                                    value={watch('email')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="phone_number" label="Phone number"
                                                    value={watch('phone_number')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={12}>
                                                <TextInput isMultiline control={control} name="address" label="Address"
                                                    value={watch('address')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={12}>
                                                <TextInput isMultiline control={control} name="requirement" label="Requirement"
                                                    value={watch('requirement')} /></Grid>
                                            <Grid sx={{ p: 1 }} item xs={12}><TextInput control={control} name="title"
                                                label="Create a title for the lead"
                                                value={watch('title')} /></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="secondary_phone_number" label="Alternative Contact number"
                                                    value={watch('secondary_phone_number')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="location" label="Location"
                                                    value={watch('location')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="pincode" label="Pin code"
                                                    value={watch('pincode')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={6}>
                                                <TextInput control={control} name="secondary_email" label="Alternative Email address"
                                                    value={watch('secondary_email')} />
                                            </Grid>
                                            <Grid sx={{ p: 1 }} item xs={12}>
                                                <TextInput isMultiline control={control} name="detailed_requirement" label="Detailed Requirement"
                                                    value={watch('detailed_requirement')} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Scrollbar>
                        </DialogContent>
                        <DialogActions>
                            <Grid sx={{ width: '100%', px: 2 }}>
                                {alerts?.active ? <Alert severity={alerts.type}>{alerts.message}</Alert> : ""}
                            </Grid>

                            <Button variant={"warning"} onClick={handleClose}>Close</Button>

                            <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
                        </DialogActions>
                    </form>
                }

            </Dialog>
        </div>
    );
};

export default LeadEditModal;
