import React, {useEffect, useState} from 'react';
import {SketchPicker} from "react-color";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide} from "@mui/material";
import {Scrollbar} from "../components/scrollbar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ColorPicker = (props) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };

    const [color, setColor] = useState("#FFF");

    const handleColorChange = (color) => {
        setColor(color.hex)
    }

    const handleSubmit = () => {
        props.onColorPick(color)
        handleClose();
    }

    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
    },[props.isShow])

    return (
        <div>
            <Dialog
                PaperProps={{ sx: { width: "auto", position: "fixed", top:0, borderRadius: 0, p:0} }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{p:0}} >
                    <SketchPicker color={color} onChangeComplete={handleColorChange} />
                    <Divider />
                </DialogContent>
                <DialogActions sx={{p:0}} >
                    <Divider />
                    <Button variant={"warning"} onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ColorPicker;
