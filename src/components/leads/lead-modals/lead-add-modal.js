import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    Slide
} from "@mui/material";
import {Scrollbar} from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import {useAppSettings} from "../../../hooks/use-app-settings";
import {Leads} from "../../../api/Endpoints/Leads";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {Lists} from "../../../api/Lists/Lists";
import DynamicChip from "../../../utils/DynamicChip";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());
    const [isEdit, setIsEdit] = useState(false);
    const [lastLeadId, setLastLeadId] = useState(false);
    const [avilableLeadTypes , setAvilableLeadTypes] = useState([]);



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
        company_name: yup.string().required(),
        phone_number: yup.string().ensure().when("email",{
            is: "",
            then:  yup.string().required("Phone number is required when email is not present.")
        }),
        email: yup.string().ensure().when("phone_number",{
            is: "",
            then:  yup.string().required("Email is required when Phone number is not present.")
        }),
    },["email","phone_number"])


    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            lead_types_id : leadType,
            name : data.name,
            title : data.title,
            company_name : data.company_name,
            address : data.address,
            email : data.email,
            phone_number : data.phone_number,
            requirement : data.requirement,
        };

        Leads.storeLead(dataToSubmit).then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            setLastLeadId(response.data.data.id)
            reset();
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const handleLeadTypeChange = (leadId) => {
        setLeadType(leadId);
    }

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
        Lists.leadTypes().then(response => {
            setAvilableLeadTypes(response)
        });
    },[props.isShow])

    return (
        <div>
            <Dialog
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right : 0,top:0,bottom:0, m: 0 ,p:0, borderRadius: 0, maxHeight : '100%'} }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>{isEdit? "Edit lead" : "Create new Lead"}</DialogTitle>
                <DialogContent >
                    <Scrollbar>
                            <Grid container>
                                <Grid sx={{p:1}} item xs={12}>
                                        {avilableLeadTypes.map((obj,index) => {
                                            return <DynamicChip key={index} onChipCLick={handleLeadTypeChange} active={leadType}  id={obj.id} name={obj.name} sx={{m:0.3}}  />
                                        })}

                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="name" label="Name of the contact person" value={watch('name')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="company_name" label="Organization name" value={watch('company_name')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="email" label="Email address" value={watch('email')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="phone_number" label="Phone number" value={watch('phone_number')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={12}>
                                    <TextInput isMultiline control={control} name="address" label="Address" value={watch('address')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={12}>
                                    <TextInput isMultiline control={control} name="requirement" label="Requirement" value={watch('requirement')}  /></Grid>
                                <Grid sx={{p:1}} item xs={12}><TextInput control={control} name="title" label="Create a title for the lead" value={watch('title')}  /></Grid>
                            </Grid>
                    </Scrollbar>
                </DialogContent>
                <DialogActions>
                    <Grid sx={{width:'100%',px:2}}>
                        {alerts?.active? <Alert severity={alerts.type}>{alerts.message}</Alert> : ""}
                    </Grid>
                    <Button variant={"warning"} onClick={handleClose}>Close</Button>
                    <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}  variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton >
                </DialogActions>
                </form>
                {lastLeadId? <DialogActions>
                <Link to={'/dashboard/leads/'+lastLeadId}>Visit last created lead</Link>
                </DialogActions> : ""}
            </Dialog>
        </div>
    );
};

export default LeadAddModal;
