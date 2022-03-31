import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    Slide
} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import TextInput from "../../../Form/TextInput";
import {Leads} from "../../../../api/Endpoints/Leads";
import {Contacts as Contact} from "../../../../api/Endpoints/Contact";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const phoneRegExp = /^[\d ()+-]+$/
const LeadSaveContactModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};

    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogId, setDialogId] = useState(1);

    const [leadData, setLeadData] = useState([]);

    //component variables
    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
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
        phone_number1: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })
        let dataToSubmit = {
            id: props.contactId,
            name: data.name,
            email1: data.email1,
            email2: data.email2,
            phone_number1: data.phone_number1,
            phone_number2: data.phone_number2,
            address: data.address,
            designation: data.designation,
            remarks: data.remarks,
            lead_id: props.leadId
        };
        let action;
        if(props.contactId){
            action =Contact.update(dataToSubmit);
        }else{
            action =Contact.add(dataToSubmit);
        }
        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
            if(response.data.status === "error"){
                toast.error(response.data.message)
            }else{
                toast.success(response.data.message)
                props.onLeadUpdate();
            }

        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
        })

    };

    const fetchLeadDetails = () => {
        setIsLoading(true);
        Leads.getLeadDetails({lead_id: props.leadId}).then(response => {
            setLeadData(response.data.data)
            setIsLoading(false);

            setValue('name', leadData.name);
            setValue('email1', leadData.email);
            setValue('phone_number1', leadData.phone_number);
        })
    }

    const fetchContactDetails = () => {
        setIsLoading(true);
        Contact.getDetails({contact_id: props.contactId}).then(response => {
            let data = response.data.data;
            setIsLoading(false);
            setValue('name', data.name);
            setValue('email1', data.email1);
            setValue('phone_number1', data.phone_number1);
            setValue('email2', data.email2);
            setValue('phone_number2', data.phone_number2);
            setValue('address', data.address);
            setValue('remarks', data.remarks);
        })
    }

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);

        if( (props.contactId) === null){
            fetchLeadDetails();
        }else{
            fetchContactDetails();
        }

    },[props.isShow,props.contactId])




    return (
        <div>
            <Dialog
                key={dialogId}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right : 0,top:0,bottom:0, m: 0 ,p:0, borderRadius: 0, maxHeight : '100%'} }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {isLoading ?
                    <LinearProgress color="inherit"/>
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>{isEdit ? "Edit Call" : "Save contact details from this lead"}</DialogTitle>
                        <DialogContent>
                                <Grid container>

                                    <Grid sx={{p:1}} item xs={12}>
                                        <TextInput control={control} name="name" label="Name of the contact person" value={watch('name')}  />
                                    </Grid>

                                    <Grid sx={{p:1}} item xs={6}>
                                        <TextInput control={control} name="email1" label="Email address" value={watch('email1')}  />
                                    </Grid>
                                    <Grid sx={{p:1}} item xs={6}>
                                        <TextInput control={control} name="email2" label="Secondary email address" value={watch('email2')}  />
                                    </Grid>

                                    <Grid sx={{p:1}} item xs={6}>
                                        <TextInput control={control} name="phone_number1" label="Phone number" value={watch('phone_number1')}  />
                                    </Grid>
                                    <Grid sx={{p:1}} item xs={6}>
                                        <TextInput control={control} name="phone_number2" label="Secondary phone number" value={watch('phone_number2')}  />
                                    </Grid>
                                    <Grid sx={{p:1}} item xs={12}>
                                        <TextInput isMultiline={true} control={control} name="address" label="Address" value={watch('address')}  />
                                    </Grid>
                                    <Grid sx={{p:1}} item xs={12}>
                                        <TextInput control={control} name="designation" label="Designation" value={watch('designation')}  />
                                    </Grid>
                                    <Grid sx={{p:1}} item xs={12}>
                                        <TextInput control={control} name="remarks" label="Remarks" value={watch('remarks')}  />
                                    </Grid>

                                </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Grid sx={{width: '100%', px: 2}}>
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

export default LeadSaveContactModal;
