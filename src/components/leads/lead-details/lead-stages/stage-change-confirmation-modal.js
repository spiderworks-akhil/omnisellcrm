import React, {useEffect, useState} from 'react';
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
    TextField, Divider
} from "@mui/material";
import Actions from "./actions";
import {Stages} from "../../../../api/Endpoints/Stages";
import toast from "react-hot-toast";
import TextInput from "../../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const StageChangeConfirmationModal = (props) => {
    const [open, setOpen] = useState();
    const handleClose = () => {props.close()}

    const [description, setDescription] = useState('');


    const scheme = yup.object().shape({
        description: yup.string().nullable(),
    })

    const {register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({ resolver : yupResolver(scheme)});


    const handleStageChange = () => {
      Stages.changeLeadStage({leads_id: props.leadId, stages_id:props.item.id, description:watch('description')}).then(response => {
          if(response.data.status === "success"){
              toast.success(response.data.message)
              props.onStageChange();
              handleClose();
          }else{
              toast.error(response.data.message)
              setTimeout(()=> {  handleClose(); }, 1500)
          }

      })
    }

    useEffect(() => {
        props.isShow? setOpen(true):setOpen(false);
        console.log("Itewm", props.item)
    },[props.isShow])
    return (
        <div>
            <Dialog
                fullScreen={true}
                PaperProps={{ sx: { width: "40%", position: "fixed", right : 0 } }}
                TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Stage change"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        You are going to change the current stage of this lead to <Chip label={props.item.name} variant="outlined" />. Are you sure?
                    </Typography>

                    <Divider sx={{my:1}} />
                    <TextInput  isMultiline={true} control={control} name="description" label="Notes (optional)"
                               value={watch('description')}/>


                    {props.item.actions.length > 0 ? <Actions list={props.item.actions} /> : "" }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleStageChange} autoFocus>
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StageChangeConfirmationModal;
