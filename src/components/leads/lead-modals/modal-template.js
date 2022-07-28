import React, {useEffect, useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide} from "@mui/material";
import {Scrollbar} from "../../scrollbar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalTemplate = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
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

                <DialogTitle>Title</DialogTitle>
                <DialogContent >
                    <Scrollbar>
                        <Grid container>

                            <Grid sx={{p:1}} item xs={6}>
                                Content
                            </Grid>

                        </Grid>
                    </Scrollbar>
                </DialogContent>
                <DialogActions>
                    <Button variant={"warning"} >Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LeadAddTeamMember;
