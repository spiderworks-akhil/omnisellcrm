import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    Slide
} from "@mui/material";
import {Scrollbar} from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import {Leads} from "../../../api/Endpoints/Leads";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import DynamicChip from "../../../utils/DynamicChip";
import DateTime from "../../Form/DateTime";
import {FormHelpers} from "../../../helpers/FormHelpers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddCall = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);

    let suggestedMinutes = [1,2,3,4,5,10,15,20,30,60]

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
        call_time: yup.date("Please choose date and time").max(
            new Date(),
            "Call initiated time should not be greater than current date"
        ).required(),
        duration: yup.number().required().typeError('Duration is a mandatory field. Valid input type is number'),
        note: yup.string().required(),
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            id: props.callId,
            leads_id : props.leadId,
            call_time : FormHelpers.formatTolaravelDateTime(data.call_time),
            duration : data.duration,
            note : data.note
        };

        let action;
        if(props.callId){
            action =Leads.updateCallLogDetails(dataToSubmit);
        }else{
            action =Leads.addCallLogToLead(dataToSubmit);
        }

        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            props.onCallUpdate();
            if(props.callId){fetchCallLogDetails();}else{ reset();}
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const fetchCallLogDetails = () => {
        setIsLoading(true)
        Leads.getCallLogDetails({call_log_id: props.callId}).then(response => {
            setValue('call_time',response.data.data.call_time);
            setValue('duration',response.data.data.duration);
            setValue('note',response.data.data.note);
            setIsLoading(false);
        })
    }

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
        if(props.callId){    fetchCallLogDetails(); setIsEdit(true) }else{reset(); setIsLoading(false);}
    },[props.isShow,props.callId])


    const handleMinuteChange = (minute) => { setValue('duration', minute)};

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
                        <DialogTitle>{isEdit ? "Edit Call" : "Add a call entry"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <DateTime control={control} name="call_time" label="Call initiated time"
                                                  value={watch('call_time')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput control={control} name="duration"
                                                   label="Duration of the call ( In minutes )"
                                                   value={watch('duration')}/>
                                        <i><small>Quick pick</small></i><br/>
                                        {suggestedMinutes.map((obj, index) => {
                                            return <DynamicChip key={index} onChipCLick={handleMinuteChange}
                                                                active={watch('duration')} id={obj} name={obj + "m"}
                                                                sx={{m: 0.3}}/>
                                        })}
                                    </Grid>
                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput isMultiline control={control} name="note" label="Remarks on the call"
                                                   value={watch('note')}/>
                                    </Grid>

                                </Grid>
                            </Scrollbar>
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

export default LeadAddCall;
