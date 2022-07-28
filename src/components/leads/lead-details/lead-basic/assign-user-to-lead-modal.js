import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress, MenuItem,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import TextInput from "../../../Form/TextInput";
import {Leads} from "../../../../api/Endpoints/Leads";
import {Contacts as Contact} from "../../../../api/Endpoints/Contact";
import SelectInput from "../../../Form/SelectInput";
import {Users} from "../../../../api/Endpoints/Users";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadSaveContactModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};

    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogId, setDialogId] = useState(1);

    const [leadData, setLeadData] = useState([]);
    const [usersList, setUsersList] = useState([]);

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
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })
        let dataToSubmit = {
            leads_id: props.leadId,
            user_id: data.user_id,
        };
        let action;
        action = Users.assignLead(dataToSubmit);
        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
            if(response.data.status === "error"){
                toast.error(response.data.message)
            }else{
                toast.success(response.data.message)
                props.onUserAssigned();
                handleClose();
            }

        }).catch(errors => {
            console.log("errors : ",errors)
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
        })
    }

    const fetchUsers = () => {
        Users.get().then(response => {
            setUsersList(response.data.data.data);
        })
    }


    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
        fetchLeadDetails();
        fetchUsers();
        setValue('user_id', null);
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
                        <DialogTitle>{"Assign this lead to"}</DialogTitle>
                        <DialogContent>
                                <Grid container>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Please select a user from below list</Typography>
                                        <SelectInput
                                            name="user_id"
                                            control={control}
                                            ismultiple={"false"}
                                            defaultValue={watch('user_id')}
                                            variant={"outlined"}
                                        >
                                            {usersList.map((obj, index) => <MenuItem value={obj.id}>{obj.name}</MenuItem>)}
                                        </SelectInput>
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
