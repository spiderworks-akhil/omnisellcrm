import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    Slide
} from "@mui/material";
import {Scrollbar} from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import {useAppSettings} from "../../../hooks/use-app-settings";
import toast from "react-hot-toast";
import {Item} from "../../../api/Endpoints/Item";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ItemCreate = (props) => {
    const [loading, setLoading] = useState({status:true, progress:0});
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };

    const [isEdit, setIsEdit] = useState(false);


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
        type: yup.string().required(),
        price: yup.string().required(),
        qunatity: yup.string().required(),
        description: yup.string().required(),
        priority: yup.string().required(),
        status: yup.string().required(),
    })

    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let action;
        let dataToSubmit = {
            id : props.toEdit,
            name : data.name,
            type : data.type,
            price : data.price,
            qunatity : data.qunatity,
            description : data.description,
            priority : data.priority,
            status : data.status,
        };

        if(parseInt(props.toEdit) > 0){
            action = Item.update(dataToSubmit);
        }else{
            action = Item.add(dataToSubmit);
        }

        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            props.onUpdate(response.data.data.id);
            let label = "Create";
            if(!props.toEdit) {
                reset_form();label = "Update";
            }
            setFormButtonStatus({label:label, loading : false,disabled: false});
        }).catch(errors => {

            toast.error("Internal server error");
            console.log("Errors", errors)
            setAlerts({ active: true, message: "Internal server error", type: "error" })

            let label = "Create";
            if(props.toEdit){label = "Update";}
            setFormButtonStatus({label:label, loading : false,disabled: false});
        })

    };

    const reset_form = async () => {
        await reset();
        setValue('status',1);
        setValue('priority',1);
        setValue('type','Product');
        setAlerts({ active: false, message: "Internal server error", type: "error" })
    }

    const fetchDetails = async () => {
        setLoading({status:true, progress:10})
        const response = await Item.getDetails({id:props.toEdit});
        setLoading({status:true, progress:70})

        if(response.data.status !== "success"){
            setLoading({status:false, progress:100});
            toast.error("API Error, Please try again later")
        }else{
            setValue('name', response.data.data.name);
            setValue('type', response.data.data.type);
            setValue('price', response.data.data.price);
            setValue('qunatity', response.data.data.qunatity);
            setValue('description', response.data.data.description);
            setValue('priority', response.data.data.priority);
            setValue('status', response.data.data.status);
            setFormButtonStatus({label: "Update", loading : false,disabled: false});
        }
        setLoading({status:false, progress:100});
    }

    useEffect(()=> {
        reset_form();
        Number(props.toEdit) ? fetchDetails():  setLoading({status:false, progress:100});
        props.isShow? setOpen(true) : setOpen(false);
    },[props.isShow,props.toEdit])

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
                {loading.status ?
                    <LinearProgress  value={loading.progress}/>
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>{isEdit ? "Edit Product" : "Create new product"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="name" label="Name of the product"
                                                   value={watch('name')}/>
                                    </Grid>
                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="price" label="Price of the product"
                                                   value={watch('price')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="qunatity" label="Available quantity"
                                                   value={watch('qunatity')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput isMultiline control={control} name="description" label="Description"
                                                   value={watch('description')}/>
                                    </Grid>


                                </Grid>
                            </Scrollbar>
                        </DialogContent>
                        <DialogActions>
                            <Grid sx={{width: '100%', px: 2}}>
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

export default ItemCreate;
