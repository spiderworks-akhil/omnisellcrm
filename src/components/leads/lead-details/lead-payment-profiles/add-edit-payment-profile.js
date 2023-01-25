import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress, MenuItem,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import {FormHelpers} from "../../../../helpers/FormHelpers";
import {Scrollbar} from "../../../scrollbar";
import TextInput from "../../../Form/TextInput";
import DynamicChip from "../../../../utils/DynamicChip";
import {FollowUp} from "../../../../api/Endpoints/FollowUp";
import {PaymentProfile} from "../../../../api/Endpoints/PaymentProfile";
import {array, number} from "yup";
import SelectInputWithSearch from "../../../Form/SelectInputWithSearch";
import {Country} from "../../../../api/Endpoints/Country";
import SelectX from "../../../Form/SelectX";
import DynamicChipMultiple from "../../../../utils/DynamicChipMultiple";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddEditPaymentProfile = (props) => {

    const [key, setKey] = useState(Math.random);

    //variables
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);
    const [demoType, setDemoType] = useState();
    const [followUpTypes, setFollowUpTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [listCountries, setListCountries] = useState([]);


    const [taxGroups, setTaxGroups] = useState();



    //form helper variables
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
        registered_company_name: yup.string(),
        billing_address: yup.string(),
        contact_email: yup.string(),
        contact_persopn_name: yup.string(),
        contact_phobne_number: yup.string(),
        tax_group: yup.array().ensure(),
        country_id:
            yup.object().shape({
                id: yup.string().required("Please choose a country").typeError("Please choose a country")
            }).required().typeError("Please choose a country")
        ,
    })




    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});

    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })



        let dataToSubmit = {
            id: props.editId,
            leads_id : [props.leadId],
            title: data.title,
            registered_company_name: data.registered_company_name,
            billing_address: data.billing_address,
            contact_email:data.contact_email,
            contact_persopn_name: data.contact_persopn_name,
            contact_phobne_number:data.contact_phobne_number,
            country_id: data.country_id.id,
            tax_groups: data.tax_group
        };


        let action;
        if(props.editId){
            console.log("dataToSubmit",dataToSubmit);
            action =PaymentProfile.update(dataToSubmit);
        }else{
            action =PaymentProfile.add(dataToSubmit);
        }

        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            props.onUpdate();
            if(props.editId){fetchEditDetails();}else{ reset();}
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            setTimeout(()=>{setAlerts({})},2000)
        }).catch(errors => {
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const handleTaxGroupChange = (obj) => {
        console.log(" watch('tax_group')", obj)

        let data = watch('tax_group');
        if(!Array.isArray(data)){
            data = [];
        }
        var index = data.indexOf(obj);
        if (index !== -1) {
            data.splice(index, 1);
        }else{
            data.push(obj);
        }
        setValue('tax_group',data)
        console.log(" watch('tax_group')", data)
    }

    const handleUserChange = (obj) => {
        setSelectedUser(obj)
    }

    const fetchCountries = (e) => {
        return Country.get({keyword : e}).then(response => {
            return response.data.data;
        })
    }

    const fetchTaxGroups = async (country_id) => {

        if(country_id){
            const groups = await Country.getTaxGroups({country_id: country_id});
            setTaxGroups(groups.data.data);
        }else{
            setTaxGroups([]);
        }
    }

    const fetchEditDetails = () => {
        setIsLoading(true)
        PaymentProfile.getDetails({id: props.editId}).then(response => {

            setValue('leads_id',props.leadId);
            setValue('title',response.data.data.title);
            setValue('registered_company_name',response.data.data.account?.account_name);
            setValue('billing_address',response.data.data.account?.address);
            setValue('contact_email',response.data.data.contact?.email1);
            setValue('contact_persopn_name',response.data.data.contact?.name);
            setValue('contact_phobne_number',response.data.data.contact?.phone_number1);
            setValue('country_id',response.data.data.country);


            response.data.data.tax_groups.forEach(obj => {
                console.log("logning tax_groups: " , obj.id)
                handleTaxGroupChange(obj.id);
            })


            setIsLoading(false);
        })
    }



    useEffect(()=> {
        if(typeof (watch('country_id')) !== undefined){
            fetchTaxGroups(watch('country_id')?.id)
        }
    },[watch('country_id')])

    useEffect(()=> {

        fetchCountries();
        props.isShow? setOpen(true) : setOpen(false);
        if(props.editId){    fetchEditDetails(); setIsEdit(true) }else{reset(); setIsLoading(false);}
    },[props.isShow,props.editId])




    return (
        <div>
            <Dialog
                key={dialogId}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right : 0,top:0,bottom:0, m: 0 ,p:0, borderRadius: 0, maxHeight : '100%'} }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {isLoading ?
                    <LinearProgress color="inherit"/>
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>{isEdit ? "Edit Payment profile" : "Add a Payment profile"}</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>


                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput control={control} name="title"
                                                  label="Title of the profile"
                                                  value={watch('title')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput  control={control} name="registered_company_name"
                                                   label="Registered company name"
                                                   value={watch('registered_company_name')}/>
                                    </Grid>


                                    <Grid sx={{p: 1}} item xs={12}>
                                        <TextInput isMultiline control={control} name="billing_address"
                                                   label="Billing address"
                                                   value={watch('billing_address')}/>
                                    </Grid>



                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput  control={control} name="contact_persopn_name"
                                                   label="Contact person's name"
                                                   value={watch('contact_persopn_name')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput  control={control} name="contact_phobne_number"
                                                   label="Contact person's phone number"
                                                   value={watch('contact_phobne_number')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <TextInput  control={control} name="contact_email"
                                                   label="Contact person's email address"
                                                   value={watch('contact_email')}/>
                                    </Grid>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <SelectX
                                            key={0.12*key}
                                            ismultiple={"false"}
                                                 label={"Choose country"}
                                                 options={fetchCountries}
                                                 control={control}
                                                 error={errors?.country_id?.id? errors?.country_id?.id?.message : false}
                                                 error2={errors?.country_id?.message? errors?.country_id?.message : false}
                                                 name={'country_id'} label="Choose country"
                                                 defaultValue={watch('country_id')}
                                        />
                                    </Grid>



                                    <Grid sx={{p: 1}} item xs={12}>
                                        <Typography variant={"subtitle2"}>Please choose a tax group,</Typography>
                                        {
                                            taxGroups.length === 0? <Alert severity="info">Please select a country/ add tax group for the country"</Alert> : <>{
                                            taxGroups?.map((obj,index) => {
                                                    return <DynamicChipMultiple
                                                        key={index}
                                                        onChipCLick={handleTaxGroupChange}
                                                        active={watch('tax_group')}
                                                        id={obj.id}
                                                        name={obj.name}
                                                        sx={{m: 0.3}}/>
                                            })
                                            }</>
                                        }
                                        {errors?.tax_group && <Typography sx={{display:'block'}} variant={"string"} sx={{color:"#ec4c47",fontSize: '0.75rem'}}>{errors?.tax_group?.message}</Typography>}
                                    </Grid>


                                </Grid>
                            </Scrollbar>
                        </DialogContent>
                        <DialogActions>
                            <Grid sx={{width: '100%', px: 2}}>
                                {alerts?.active ? <Alert severity={alerts.type}>{alerts.message}</Alert> : ""}
                            </Grid>
                            <Button variant={"warning"} onClick={handleClose}>Close</Button>
                            <LoadingButton loading={formButtonStatus.loading}
                                           disabled={formButtonStatus.disabled}
                                           variant="outlined"
                                           type="submit">{formButtonStatus.label}</LoadingButton>
                        </DialogActions>
                    </form>
                }
            </Dialog>
        </div>
    );
};

export default AddEditPaymentProfile;
