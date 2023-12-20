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
import { Note } from "../../../../api/Endpoints/Notes";
import SelectInputWithSearch from '../../../Form/SelectInputWithSearch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddEditNote = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);

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
        description: yup.string(),
    })
    const { register, handleSubmit, watch, formState: { errors }, control, setValue, reset } = useForm({ resolver: yupResolver(scheme) });

    const onSubmit = data => {
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            id: props.editId,
            leads_id: props.leadId,
            title: data.title,
            description: data.description,
        };

        let action;
        if (props.editId) {
            console.log("dataToSubmit", dataToSubmit);
            action = Note.update(dataToSubmit);
        } else {
            action = Note.add(dataToSubmit);
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


    const fetchEditDetails = () => {
        setIsLoading(true)
        Note.getDetails({ note_id: props.editId }).then(response => {
            setValue('title', response.data.data.title);
            setValue('description', response.data.data.description);
            setIsLoading(false);
        })
    }

    const types = [
        { label: 'Note' },
        { label: 'Requirement' },
        { label: 'Phone Call' },
        { label: 'Email' },
        { label: 'WhatsApp' },
        { label: 'Meeting' },
    ]

    useEffect(() => {
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
                        <DialogTitle>{isEdit ? "Edit note" : "Add a note entry"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <Typography variant={"subtitle2"}>Type</Typography>
                                        <SelectInputWithSearch ismultiple={"false"} control={control} name={'type'}
                                            defaultValue={watch('type')}>
                                            {
                                                types.map(obj => {
                                                    return <MenuItem onChange={() => setValue('type', obj?.label)} value={obj.label}>{obj.label}</MenuItem>
                                                })
                                            }
                                        </SelectInputWithSearch>
                                    </Grid>

                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <TextInput control={control} name="title" label="Title of the note"
                                            value={watch('title')} />
                                    </Grid>



                                    <Grid sx={{ p: 1 }} item xs={12}>
                                        <TextInput isMultiline control={control} name="description" label="Description of the note"
                                            value={watch('description')} />
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

export default LeadAddEditNote;
