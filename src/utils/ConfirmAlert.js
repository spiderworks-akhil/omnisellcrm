import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmAlert = (props) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleAgree = () => { props.onConfirm(true);handleClose(); }
    const handleDisAgree = () => { props.onConfirm(false);handleClose();}

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
    },[props.isShow])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisAgree}>Cancel</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmAlert;
