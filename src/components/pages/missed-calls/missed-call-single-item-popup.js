import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography
} from "@mui/material";
import {Alert} from "@mui/lab";
import MissedCallActionButtons from "./missed-call-action-buttons";
import {Trash} from "../../../icons/trash";
import {MissedCalls} from "../../../api/Endpoints/MissedCalls";
import toast from "react-hot-toast";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const status = [
    {value: "NP",label:"Not Processed"},
    {value: "A",label:"Accepted"},
    {value: "R",label:"Rejected"},
    {value: "NA",label:"Not Answered"},
];
const MissedCallSingleItemPopup = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true);};
    const handleClose = () => { props.onModalClose(); setOpen(false); };

    const handleStatusChange = () => {
        props.onStatusChange();
        setOpen(false);
        props.onModalClose();
    }

    const handleTrashClick = () => {
        MissedCalls.remove({id:props.id}).then(response =>{
            if(response.data.status === "success"){
                toast.success(response.data.message)
                props.onStatusChange();
                setOpen(false);
                props.onModalClose();
            }
        })
    }

    useEffect(()=> {
        setOpen(props.isOpen);
    },[props.isOpen])


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Call actions for "+props.mobile}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Typography variant={"subtitle2"}>You can change the status of the right below</Typography>
                    <Alert severity="info">Note : When you change the status to <b>Accepted</b>, A new lead will be created.</Alert>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {status.map(obj=> {
                    return <MissedCallActionButtons onSuccess={handleStatusChange} dataSet={obj} id={props.id}/>
                })}
            </DialogActions>

                <Button variant={"text"} color={"error"} onClick={handleTrashClick}><Trash/>Trash this number permanently</Button>
        </Dialog>
    );
};

export default MissedCallSingleItemPopup;
