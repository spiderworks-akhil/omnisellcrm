import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide, TextField,
    Typography
} from "@mui/material";
import {Referral} from "../../../api/Endpoints/Referral";
import toast from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AddReferral = (props) => {

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleAddClick = () => {
        if(name.length !==0){
            Referral.add({name:name}).then(response => {

                if(response.data?.status === "error"){
                    toast.error('Please enter a unique name');
                    return;
                }

                if(response.data?.status === "success"){
                    toast.success(response.data?.message)
                    props.onNewRefferal();
                    handleClose();
                }

            })
        }else{
            toast.error('Please enter a name');
        }

    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>Create new referral</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography variant={"subtitle1"} color={"black"} >Please enter the name of referral</Typography>
                        <TextField onChange={handleNameChange}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleAddClick}>Add</Button>
                </DialogActions>
            </Dialog>

            <Button variant={"text"}  onClick={handleClickOpen}>Add new one</Button>
        </div>
    );
};

export default AddReferral;
