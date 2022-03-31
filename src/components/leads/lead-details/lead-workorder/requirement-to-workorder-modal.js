import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress, MenuItem, Select, Slide,
    Typography
} from "@mui/material";
import {Scrollbar} from "../../../scrollbar";
import TextInput from "../../../Form/TextInput";
import DynamicChip from "../../../../utils/DynamicChip";
import {LoadingButton} from "@mui/lab";
import {Lists} from "../../../../api/Lists/Lists";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Requirement} from "../../../../api/Endpoints/Requirement";
import toast from "react-hot-toast";
import SelectInput from "../../../Form/SelectInput";
import DynamicChipInput from "../../../Form/DynamicChipInput";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const constTypes = [
    {label: "Fixed Rate",value : 1},
    {label: "Hourly Rate",value : 2},
    {label: "Daily Rate",value : 3},
    {label: "Monthly rate",value : 4},
    {label: "Quarterly rate",value : 5},
    {label: "Yearly rate",value: 6}
];

const clientApprovalStatus = [
    {label: "Approved",value : 1},
    {label: "Rejected",value : 2}
];


const workOrderStatus = [
    {label: "Open",value : 1},
    {label: "Closed",value : 2}
];


const RequirementToWorkorderModal = (props) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);

    const [durationLabel, setDurationLabel] = useState("Work Duration");
    const [rateLabel, setRateLabel] = useState("Rate");

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
        status: yup.number().required(),
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});


    const onSubmit = data => {

        console.log("onSubmit", data)
        //
        // setFormButtonStatus({...formButtonStatus, loading : true});
        // setAlerts({ active: false, message: "Internal server error", type: "error" })
        //
        // let dataToSubmit =  {
        //     id: props.requirementId,
        //     leads_id: props.leadId,
        //     title: data.title,
        //     description: data.description,
        //     priority: data.priority,
        //     status: data.status,
        // }
        //
        // let action;
        // if(props.requirementId){
        //     action =Requirement.update(dataToSubmit);
        // }else{
        //     action =Requirement.add(dataToSubmit);
        // }
        //
        //  action.then(response => {
        //     console.log(dataToSubmit)
        //     setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
        //     setAlerts({ active: true, message: response.data.message , type: response.data.status })
        //     props.onCallUpdate();
        //     if(props.requirementId){fetchRequirementDetails();}else{ reset();}
        //     setFormButtonStatus({label: "Create", loading : false,disabled: false});
        //     setTimeout(()=>{setAlerts({})},2000)
        // }).catch(errors => {
        //     toast.error("Internal server error");
        //     setAlerts({ active: true, message: "Internal server error", type: "error" })
        //     setFormButtonStatus({label: "Create", loading : false,disabled: false});
        // })

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
        setValue('status',1)
        setValue('client_approval_status',1)
    },[props.isShow,props.requirementId])

    useEffect(()=> {
        setValue('total_cost', (parseFloat(watch('rate'))*parseFloat(watch('duration'))));
        switch (watch('cost_type')) {
            case 2 : {setRateLabel("Hourly rate"); setDurationLabel("No of hours")}; break;
            case 3 : {setRateLabel("Daily rate"); setDurationLabel("No of Days")} ;break;
            case 4 : {setRateLabel("Monthly rate"); setDurationLabel("No of Months")} ;break;
            case 5 : {setRateLabel("Quarterly rate"); setDurationLabel("No of Quarters")} ;break;
            case 6 : {setRateLabel("Yearly rate"); setDurationLabel("No of Years")} ;break;
            default: setDurationLabel("Duration");break;
        }
    },[watch('cost_type'),watch('rate'),watch('duration')])


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
                                                   label="Work order title"
                                                   value={watch('title')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput control={control} name="description"
                                                   label="Details of work order"
                                                   isMultiline={true}
                                                   value={watch('description')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Cost Type</Typography>
                                        <DynamicChipInput
                                            name="cost_type"
                                            label="Approved by,"
                                            control={control}
                                            options={constTypes}
                                            defaultValue={watch('cost_type')}
                                        />
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="rate"
                                                   label={rateLabel}
                                                   value={watch('rate')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="duration"
                                                   label={durationLabel}
                                                   value={watch('duration')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput control={control} name="total_cost"
                                                   label="Total cost"
                                                   value={watch('total_cost')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Approved By</Typography>
                                        <SelectInput
                                            name="approved_by_client_id"
                                            control={control}
                                            ismultiple={"false"}
                                            defaultValue={watch('approved_by_client_id')}
                                            variant={"outlined"}
                                        >
                                            <MenuItem value={1}>Escolha uma opção</MenuItem>
                                            <MenuItem value={2}>03 parcelas</MenuItem>
                                        </SelectInput>
                                    </Grid>


                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Client approval status</Typography>
                                        <DynamicChipInput
                                            name="client_approval_status"
                                            control={control}
                                            options={clientApprovalStatus}
                                            defaultValue={watch('client_approval_status')}
                                        />
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography sx={{fontSize:'14px', fontWeight : '500'}}>Client approval status</Typography>
                                        <DynamicChipInput
                                            name="status"
                                            control={control}
                                            options={workOrderStatus}
                                            defaultValue={watch('status')}
                                        />
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

export default RequirementToWorkorderModal;
