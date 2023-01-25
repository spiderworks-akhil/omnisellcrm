import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import {FormHelpers} from "../../../../helpers/FormHelpers";
import {Scrollbar} from "../../../scrollbar";
import DateTime from "../../../Form/DateTime";
import TextInput from "../../../Form/TextInput";
import DynamicChip from "../../../../utils/DynamicChip";
import {FollowUp} from "../../../../api/Endpoints/FollowUp";
import {Users} from "../../../../api/Endpoints/Users";
import {PaymentProfile} from "../../../../api/Endpoints/PaymentProfile";
import SelectX from "../../../Form/SelectX";
import {Country} from "../../../../api/Endpoints/Country";
import {Item} from "../../../../api/Endpoints/Item";
import {Tax} from "../../../../api/Endpoints/Tax";
import {WorkOrder} from "../../../../api/Endpoints/WorkOrder";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddEditWorkorder = (props) => {

    //variables
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false);};
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogId, setDialogId] = useState(1);
    const [paymentProfile, setPaymentProfile] = useState();
    const [followUpTypes, setFollowUpTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [listPaymentProfiles, setListPaymentProfiles] = useState([]);
    const [paymentProfileDetails, setPaymentProfileDetails] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [total, setTotal] = useState(0);
    const [taxGroup, setTaxGroup] = useState();
    const [taxGroupFields, setTaxGroupFields] = useState();

    let demoTypes = [{id:1,name:'Site visit'},{id:2,name:'Client visit'},{id:3,name:'Office visit'}]

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
        payment_profile: yup.number().required("Please select a payment profile"),
        tax_type: yup.number().required("Please select a tax group"),
        title: yup.string().required(),
        notes: yup.string(),
    })
    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset,getValues,trigger } = useForm({ resolver : yupResolver(scheme)});
    const fetchProducts = (e) => {
        return Item.get({keyword : e}).then(response => {
            return response.data.data.data;
        })
    }
    const onSubmit = data => {
        //setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        // let find = demoTypes.filter(o=> o.id === demoType)

        // let dataToSubmit = {
        //     id: props.editId,
        //     leads_id : props.leadId,
        //     assign_to_user_id : selectedUser,
        //     follow_up_sub_type : demoType,
        //     datetime : FormHelpers.formatTolaravelDateTime(data.datetime),
        //     duration : data.duration,
        //     title : data.title,
        //     description : data.description,
        //     demo_type : find[0]?.name,
        //     notes : data.notes
        // };


        let taxFields = taxGroupFields.map(obj=> {
            return {
                id: obj.id,
                tax_percentage: getValues('field-'+obj.id),
                amount: ((watch('price') * watch('quantity'))) * (watch('field-'+obj.id)/100)
            }
        })


        let dataToSubmit = {
            leads_id: props.leadId,
            title: data.title,
            items_id: 2,
            quantity: data.quantity,
            payment_profile_id: data.payment_profile,
            status:"placed",
            tax_fields: taxFields,
            total_amount: total,
            total:total
        };



        console.log("dataToSubmit",dataToSubmit);


        let action;
        if(props.editId){
            console.log("dataToSubmit",dataToSubmit);
            action =WorkOrder.update(dataToSubmit);
        }else{
            action =WorkOrder.add(dataToSubmit);
        }

        action.then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            props.onUpdate();
            if(props.editId){fetchEditDetails();}else{ reset();}
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
            handleClose();
            setTimeout(()=>{setAlerts({})},2000)
        }).catch(errors => {
            toast.error("Internal server error");
            console.log("Error : ", errors)
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const handlePaymentProfileChange = (obj) => {
        setPaymentProfile (obj)
        setValue('payment_profile',obj)
        trigger('payment_profile');
        fetchPaymentProfileDetails(obj);
    }
    const handleTaxGroupChange = (obj) => {
        setTaxGroup (obj)
        setValue('tax_type',obj)
        trigger('tax_type');
        fetchTaxGroupDetails(obj);
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
        Users.me().then(response=> {
            Users.getByLeadTypes({organisations_id: response.data.data.organisations_id}).then(response=> {
                setUsers(response.data.data)
            })

        })
    }
    const fetchPaymentProfiles = async () => {
        const response = await PaymentProfile.getByLead({leads_id: props.leadId});
        if(response.data.data !== null){
            setListPaymentProfiles(response.data.data.data);
        }
    }

    const fetchTaxGroupDetails = async (obj) => {
        const response = await Tax.getFields({tax_group_id: obj});

        if(response.data.data !== null){
            setTaxGroupFields(response.data.data);
            console.log("setTaxGroupFields",response.data.data)
        }
    }

    const openPaymentProfileModal = () => {setOpenModal(true);}
    const closePaymentProfileModal = () => {setOpenModal(false);}

    const fetchEditDetails = () => {
        setIsLoading(true)
        WorkOrder.getDetails({follow_up_id: props.editId}).then(response => {
            setValue('datetime',response.data.data.datetime);
            setValue('title',response.data.data.title);
            setValue('description',response.data.data.description);
            setValue('follow_up_sub_type',response.data.data.follow_up_sub_type);
            setValue('assign_to_user_id',response.data.data.assign_to_user_id);
            setPaymentProfile (response.data.data.follow_up_sub_type)
            setSelectedUser(response.data.data.assign_to_user_id)
            setIsLoading(false);
        })
    }

    const fetchPaymentProfileDetails = async (id) => {
        const response = await PaymentProfile.getDetails({id:id});
        setPaymentProfileDetails(response.data.data);
    }

    useEffect(()=>{
        if(typeof watch('quantity') !== undefined){
            setTotal(watch('price') * watch('quantity'))
        }else{
            setValue('quantity',0)
            setTotal(0)
        }

    },[watch('quantity'),watch('price')])

    useEffect(()=>{  setValue('price',watch('items_id')?.price)
    },[watch('items_id')])


    useEffect(()=> {
        fetchUsers();
        fetchFollowUpTypes();
        fetchPaymentProfiles();
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
                {listPaymentProfiles.length === 0 ?
                    <>
                        <DialogTitle sx={{fontSize:15}}>Please create a payment profile in order to create a work order</DialogTitle>
                        <DialogContent>
                            <Scrollbar>
                                <Grid container>

                                    <Grid sx={{p: 1}} item xs={6}>
                                        <Button variant="outlined" size="small" onClick={openPaymentProfileModal}>Create a payment profile</Button>
                                    </Grid>

                                </Grid>
                            </Scrollbar>
                        </DialogContent>

                    </>
                    :
                    <>
                        {isLoading ?
                            <LinearProgress color="inherit"/>
                            :
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DialogTitle>{isEdit ? "Edit Work Order" : "Add a  Work Order entry"}</DialogTitle>
                                <DialogContent>
                                    <Scrollbar>
                                        <Grid container>



                                            <Grid sx={{p: 1}} item xs={12}>
                                                <Typography variant={"subtitle2"}>Create under payment profile of</Typography>
                                                {
                                                    listPaymentProfiles.map((o, index) => {
                                                        return <DynamicChip
                                                            key={index}
                                                            onChipCLick={handlePaymentProfileChange}
                                                            active={watch('payment_profile')}
                                                            id={o.payment_profile?.id}
                                                            name={o.payment_profile?.title}
                                                            sx={{m: 0.3}}/>
                                                    })
                                                }
                                                {errors?.payment_profile? <Typography variant="overline" display="block" sx={{color:"red"}} gutterBottom>
                                                    {errors?.payment_profile?.message}
                                                </Typography> : false}
                                            </Grid>

                                            <Grid sx={{p: 1}} item xs={12}>
                                                <Typography variant={"subtitle2"}>Tax type</Typography>
                                                {   paymentProfileDetails && <>
                                                    {paymentProfileDetails?.tax_groups.map((o, index) => {
                                                        console.log("paymentProfileDetails", paymentProfileDetails)
                                                        return <DynamicChip
                                                            key={index}
                                                            onChipCLick={handleTaxGroupChange}
                                                            active={watch('tax_type')}
                                                            id={o.tax_group?.id}
                                                            name={o.tax_group?.name}
                                                            sx={{m: 0.3}}/>
                                                    })
                                                    }</>
                                                }
                                                {errors?.tax_type? <Typography variant="overline" display="block" sx={{color:"red"}} gutterBottom>
                                                    {errors?.tax_type?.message}
                                                </Typography> : false}
                                            </Grid>


                                            <Grid sx={{p: 1}} item xs={12}>
                                                <TextInput isMultiline control={control} name="title"
                                                           label="Title of the work order"
                                                           value={watch('title')}/>
                                            </Grid>





                                            <Grid sx={{p: 1}} item xs={6}>
                                                <SelectX
                                                    key={0.12}
                                                    ismultiple={"false"}
                                                    label={"Choose product/service"}
                                                    options={fetchProducts}
                                                    control={control}
                                                    error={errors?.items_id?.id? errors?.items_id?.id?.message : false}
                                                    error2={errors?.items_id?.message? errors?.items_id?.message : false}
                                                    name={'items_id'}
                                                    defaultValue={watch('items_id')}
                                                />
                                            </Grid>

                                            <Grid sx={{p: 1}} item xs={12}>
                                                <TextInput  control={control} name="price"
                                                            label="Price"
                                                            value={watch('price')}/>
                                            </Grid>

                                            <Grid sx={{p: 1}} item xs={12}>
                                                <TextInput  control={control} name="quantity"
                                                            label="Quantity"
                                                            value={watch('quantity')}/>
                                            </Grid>


                                            <Grid sx={{p: 1}} item xs={12}>

                                                {   taxGroupFields && <>
                                                    {taxGroupFields?.map((o, index) => {
                                                        return  <>
                                                            Tax : {
                                                                ((watch('price') * watch('quantity'))) * (watch('field-'+o.id)/100)
                                                            }

                                                            <TextInput  control={control} name={"field-"+o.id}
                                                                            label={o.label}
                                                                            value={watch("filed-"+o.id)?  watch("filed-"+o.id) : parseInt(o.default_value)}/>
                                                        </>
                                                    })
                                                    }</>
                                                }
                                            </Grid>



                                            <Grid sx={{p: 1}} item xs={12}>
                                                <Typography sx={{display:"block"}}>Total</Typography>
                                                {total}
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
                        </>
                }
            </Dialog>
        </div>
    );
};

export default LeadAddEditWorkorder;
