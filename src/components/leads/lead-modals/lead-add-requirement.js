import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    Slide, Typography
} from "@mui/material";
import {Scrollbar} from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import DynamicChip from "../../../utils/DynamicChip";
import {Lists} from "../../../api/Lists/Lists";
import {Requirement} from "../../../api/Endpoints/Requirement";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddRequirement = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);

    let suggestedPriorities = Lists.priorities();
    let suggestedStatus = Lists.status();

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
        title: yup.string().required(),
        description: yup.string().required(),
        priority: yup.string().required(),
        status: yup.string().required(),
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit =  {
            id: props.requirementId,
            leads_id: props.leadId,
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
        }

        let action;
        if(props.requirementId){
            action =Requirement.update(dataToSubmit);
        }else{
            action =Requirement.add(dataToSubmit);
        }

        action.then(response => {
            console.log(dataToSubmit)
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            props.onCallUpdate();
            if(props.requirementId){fetchRequirementDetails();}else{ reset();}
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const fetchRequirementDetails = () => {
        setIsLoading(true)
        Requirement.getDetails({requirement_id: props.requirementId}).then(response => {
            setValue('title',response.data.data.title);
            setValue('description',response.data.data.description);
            setValue('priority',parseInt(response.data.data.priority));
            setValue('status',parseInt(response.data.data.status));
            setIsLoading(false);
        })
    }
    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
        if(props.requirementId){ fetchRequirementDetails(); setIsEdit(true) }else{reset(); setIsLoading(false); setValue('priority', 2); setValue('status', 1)}
    },[props.isShow,props.requirementId])


    const handlePriorityChange = (priority) => { setValue('priority', priority)};
    const handleStatusChange = (status) => { setValue('status', status)};

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
                        <DialogTitle>{isEdit ? "Edit Requirement" : "Add a Requirement"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput control={control} name="title"
                                                   label="Title of the Requirement"
                                                   value={watch('title')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput isMultiline control={control} name="description"
                                                   label="Description"
                                                   value={watch('description')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Priority</Typography>
                                        {suggestedPriorities.map((obj, index) => {
                                            return <DynamicChip
                                                key={index} onChipCLick={handlePriorityChange}
                                                name={obj.label} active={watch('priority')} id={obj.id} />
                                        })}
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Status</Typography>
                                        {suggestedStatus.map((obj, index) => {
                                            return <DynamicChip
                                                key={index} onChipCLick={handleStatusChange}
                                                name={obj.label} active={watch('status')} id={obj.id}  />
                                        })}
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

export default LeadAddRequirement;
