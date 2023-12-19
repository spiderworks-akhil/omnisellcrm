import React, { useEffect, useState } from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    MenuItem,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { FormHelpers } from "../../../../helpers/FormHelpers";
import { Demo } from "../../../../api/Endpoints/Demo";
import { Scrollbar } from "../../../scrollbar";
import DateTime from "../../../Form/DateTime";
import TextInput from "../../../Form/TextInput";
import DynamicChip from "../../../../utils/DynamicChip";
import { FollowUp } from "../../../../api/Endpoints/FollowUp";
import { User } from "../../../../icons/user";
import { Users } from "../../../../api/Endpoints/Users";
import SelectInputWithSearch from '../../../Form/SelectInputWithSearch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddEditDemo = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);
    const [demoType, setDemoType] = useState();
    const [followUpTypes, setFollowUpTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    let demoTypes = [{ id: 1, name: 'Site visit' }, { id: 2, name: 'Client visit' }, { id: 3, name: 'Office visit' }]

    const follow_up_type=[
        {label:'Email'},
        {label:'Phone'},
        {label:'Direct Visit'},
        {label:'WhatsApp'},
        {label:'Online Meeting'},
    ]

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
        datetime: yup.date("Please choose date and time").min(
            new Date(),
            "Demo time should not be less than current time"
        ).required(),
        notes: yup.string(),
    })
    const { register, handleSubmit, watch, formState: { errors }, control, setValue, reset } = useForm({ resolver: yupResolver(scheme) });

    const onSubmit = data => {
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let find = demoTypes.filter(o => o.id === demoType)

        let dataToSubmit = {
            id: props.editId,
            leads_id: props.leadId,
            assign_to_user_id: selectedUser,
            follow_up_sub_type: demoType,
            datetime: FormHelpers.formatTolaravelDateTime(data.datetime),
            duration: data.duration,
            // title : data.title,
            description: data.description,
            demo_type: find[0]?.name,
            notes: data.notes
        };

        let action;
        if (props.editId) {
            console.log("dataToSubmit", dataToSubmit);
            action = FollowUp.update(dataToSubmit);
        } else {
            action = FollowUp.add(dataToSubmit);
        }

        action.then(response => {
            setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
            setAlerts({ active: true, message: response.data.message, type: response.data.status })
            props.onDemoUpdate();
            if (props.editId) { fetchEditDetails(); } else { reset(); }
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
            setTimeout(() => { setAlerts({}) }, 2000)
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
        })

    };

    const handleDemoTypeChange = (obj) => {
        setDemoType(obj)
    }
    const handleUserChange = (obj) => {
        setSelectedUser(obj)
    }

    const fetchFollowUpTypes = () => {
        FollowUp.types().then(response => {
            setFollowUpTypes(response.data.data.data);
        })
    }

    const fetchUsers = async () => {
        Users.me().then(response => {
            Users.getByLeadTypes({ organisations_id: response.data.data.organisations_id }).then(response => {
                setUsers(response.data.data)
            })

        })
    }

    const fetchEditDetails = () => {
        setIsLoading(true)
        FollowUp.getDetails({ follow_up_id: props.editId }).then(response => {
            setValue('datetime', response.data.data.datetime);
            setValue('title', response.data.data.title);
            setValue('description', response.data.data.description);
            setValue('follow_up_sub_type', response.data.data.follow_up_sub_type);
            setValue('assign_to_user_id', response.data.data.assign_to_user_id);
            setDemoType(response.data.data.follow_up_sub_type)
            setSelectedUser(response.data.data.assign_to_user_id)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchUsers();
        fetchFollowUpTypes();
        props.isShow ? setOpen(true) : setOpen(false);
        if (props.editId) { fetchEditDetails(); setIsEdit(true) } else { reset(); setIsLoading(false); }
    }, [props.isShow, props.editId])




    return (
        <div>
            <Dialog
                key={dialogId}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
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
                        <DialogTitle>{isEdit ? "Edit Follow up" : "Add a Follow up entry"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{ p: 1 }} item xs={6}>
                                        <DateTime control={control} name="datetime" label="Schedule Follow up on"
                                            value={watch('datetime')} />
                                    </Grid>

                                    {/* <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput isMultiline control={control} name="title" label="Title of the follow up"
                                                   value={watch('title')}/>
                                    </Grid> */}



                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <TextInput isMultiline control={control} name="description" label="Description of the follow up"
                                            value={watch('description')} />
                                    </Grid>

                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <Typography variant={"subtitle2"}>Follow Up type</Typography>
                                        <SelectInputWithSearch ismultiple={"false"} control={control} name={'lead_option'}
                                            defaultValue={watch('lead_option')}>
                                            {
                                                follow_up_type?.map(obj => {
                                                    return <MenuItem onChange={()=>setValue('leat_option',obj?.label)} value={obj.label}>{obj.label}</MenuItem>
                                                })
                                            }
                                        </SelectInputWithSearch>
                                    </Grid>

                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <Typography variant={"subtitle2"}>Follow up for,</Typography>
                                        {
                                            followUpTypes.map((o, index) => {
                                                return o.sub_types?.map(obj => {
                                                    return <DynamicChip
                                                        key={index}
                                                        onChipCLick={handleDemoTypeChange}
                                                        active={demoType}
                                                        id={obj.id}
                                                        name={obj.name}
                                                        sx={{ m: 0.3 }} />
                                                })
                                            })
                                        }
                                    </Grid>

                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <Typography variant={"subtitle2"}>Assign to a user</Typography>
                                        {
                                            users.map((obj, index) => {
                                                return <DynamicChip
                                                    key={index}
                                                    onChipCLick={handleUserChange}
                                                    active={selectedUser}
                                                    id={obj.id}
                                                    name={obj.name}
                                                    sx={{ m: 0.3 }} />
                                            })
                                        }
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

export default LeadAddEditDemo;
