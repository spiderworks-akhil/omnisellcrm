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
import {Users} from "../../../api/Endpoints/Users";
import {Team} from "../../../api/Endpoints/Team";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddTeamMember = (props) => {
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
        email: yup.string().email().required(),
    })


    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = async(data) => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            name: data.name,
            email: data.email,
            user_type: "User",
            role: 4
        }

        await Users.add(dataToSubmit).then(async(response) => {
            let addedUser = response.data.data;
            if(response.data.status === "success"){
                let dataToSubmit = {
                    leads_id: props.leadId,
                    client_users_id: addedUser.id,
                    role: data.role,
                    status: 1
                };
                await Team.add(dataToSubmit).then(response => {
                    if(response.data.status === "success"){
                        setAlerts({ active: true, message: response.data.message , type: response.data.status })
                    }
                })
                reset();
            }else{
                await Users.searchUserByEmail({email:data.email}).then(async response => {
                    let user = response.data.data;
                    let dataToSubmit = {
                        leads_id: props.leadId,
                        client_users_id: user.id,
                        role: data.role,
                        status: 1
                    }
                    await Team.add(dataToSubmit).then(response => {
                        if(response.data.status === "success"){
                            setAlerts({ active: true, message: response.data.message , type: response.data.status })
                            reset();
                        }
                    })
                })
            }
            props.onTeamUpdate();
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        }).catch(errors => {

            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };


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
                    <DialogTitle>{isEdit? "Edit team member" : "Add a team member"}</DialogTitle>
                    <DialogContent >
                        <Scrollbar>
                            <Grid container>

                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="name" label="Name of the contact person" value={watch('name')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="email" label="Email address" value={watch('email')}  />
                                </Grid>

                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="role" label="Role of the user" value={watch('role')}  />
                                </Grid>

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

            </Dialog>
        </div>
    );
};

export default LeadAddTeamMember;
