import React, {useEffect, useState} from 'react';
import {
    Alert, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, MenuItem, Select,
    Slide, TextField, Typography
} from "@mui/material";
import {Scrollbar} from "../../scrollbar";
import TextInput from "../../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoadingButton} from "@mui/lab";
import {useAppSettings} from "../../../hooks/use-app-settings";
import {Leads} from "../../../api/Endpoints/Leads";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {Lists} from "../../../api/Lists/Lists";
import DynamicChip from "../../../utils/DynamicChip";
import {Labels as LabelsApi, Labels} from "../../../api/Endpoints/Labels";
import DynamicChipMultiple from "../../../utils/DynamicChipMultiple";
import DateInput from "../../Form/DateInput";
import {node} from "prop-types";
import {format, isValid, parseISO} from "date-fns";
import {FollowUp as FollowUpApi, FollowUp} from "../../../api/Endpoints/FollowUp";
import {Referral} from "../../../api/Endpoints/Referral";
import {SourceType} from "../../../api/Endpoints/SourceType";
import SelectInput from "../../Form/SelectInput";
import SelectInputWithSearch from "../../Form/SelectInputWithSearch";
import AddReferral from "../components/add-referral";
import {DateTimePicker} from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LeadAddModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };
    const appSettings = useAppSettings();
    const [leadType, setLeadType] = useState(appSettings.get_lead_type());
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [lastLeadId, setLastLeadId] = useState(false);
    const [avilableLeadTypes , setAvilableLeadTypes] = useState([]);
    const [availableLabels , setAvailableLabels] = useState([]);

    const [loadingLabels , setLoadingLabels] = useState([]);

    const [sourceTypes, setSourceTypes] = useState([]);
    const [referralList, setReferralList] = useState([]);



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
        company_name: yup.string().required(),
        // follow_up_date: yup.string(),
        phone_number: yup.string().ensure().when("email",{
            is: "",
            then:  yup.string().required("Phone number is required when email is not present.")
        }),
        email: yup.string().ensure().when("phone_number",{
            is: "",
            then:  yup.string().required("Email is required when Phone number is not present.")
        }),
    },["email","phone_number"])



    const {register, handleSubmit, watch, formState: { errors }, control, setValue ,reset } = useForm({ resolver : yupResolver(scheme)});




    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let dataToSubmit = {
            lead_types_id : leadType,
            name : data.name,
            title : data.title,
            company_name : data.company_name,
            address : data.address,
            email : data.email,
            labels : selectedLabels,
            phone_number : data.phone_number,
            requirement : data.requirement,
            referral_id : data.referral,
            source_type_id : data.source_type,
        };
        let follow_up_date = data.follow_up_date;
        Leads.storeLead(dataToSubmit).then(response => {
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
            setAlerts({ active: true, message: response.data.message , type: response.data.status })
            setLastLeadId(response.data.data.id)

            if(selectedLabels.length > 0){
                selectedLabels.map(obj=>{
                    Labels.addToLead({leads_id: response.data.data.id, labels_id: obj}).then(response => {
                        if(response.data.status === "success"){
                            // toast.success(response.data.message)
                        }else{
                            toast.error(response.data.message)
                        }
                    })
                })
            }


            if(isValid(follow_up_date)){
                let post_data = {
                    datetime:format(follow_up_date, 'yyyy-MM-dd hh:mm:ss'),
                    title:data.title,
                    leads_id:response.data.data.id
                };

                FollowUp.add(post_data).then(response => {
                    console.log("handleSaveFollowUpDate", response.data)
                    if(response.data.status === "success"){
                        toast.success('Follow up date has been saved');
                    }

                })
            }
            props.onLeadUpdate(response.data.data.id);
            reset();
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        }).catch(errors => {
            toast.error("Internal server error");
            console.log("Errors", errors)
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({label: "Create", loading : false,disabled: false});
        })

    };

    const handleLeadTypeChange = (leadId) => {
        setLeadType(leadId);
        setSelectedLabels([]);
        fetchLabels(leadId);
    }

    const handleLabelsChange = (labelId) => {
        const arr = selectedLabels;
        const newId= labelId;

        if(!arr.includes(newId)){
            arr.push(newId);
        }else{
            arr.splice(arr.indexOf(newId), 1);
        }
        setSelectedLabels(arr);
        fetchLabels(leadType);
    }

    const fetchLabels = (_leadType) => {
        setLoadingLabels(true);
        Labels.getLabelsByLeadType({lt_id:_leadType}).then(response => {
            setAvailableLabels(response.data.data.data);
            setLoadingLabels(false);
        })
    }

    const fetchSourceTypes = () => {
       SourceType.get().then(response => {
           if(response.data?.data?.data){
               setSourceTypes(response.data.data.data)
           }

       })
    }

    const fetchReferral = () => {
        Referral.get().then(response => {
            if(response.data?.data?.data) {
                setReferralList(response.data.data.data)
            }
        })
    }

    const handlereferralUpdate = () => {
        fetchReferral();
    }

    const handleFollowUpChange = (value) => {
        setValue('follow_up_date',value)
        console.log(watch('follow_up_date'))
    }



    useEffect(()=> {
        props.isShow? setOpen(true) : setOpen(false);
        fetchLabels(leadType);
        fetchSourceTypes();
        fetchReferral();
        Lists.leadTypes().then(response => {
            setAvilableLeadTypes(response)
        });
        setValue('follow_up_date',null)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>{isEdit? "Edit lead" : "Create new Lead"}</DialogTitle>
                <DialogContent >
                    <Scrollbar>
                            <Grid container>
                                <Grid sx={{p:1}} item xs={12}>
                                    <Typography variant={"subtitle2"}>Lead type</Typography>
                                        {avilableLeadTypes.map((obj,index) => {
                                            return <DynamicChip key={index} onChipCLick={handleLeadTypeChange} active={leadType}  id={obj.id} name={obj.name} sx={{m:0.3}}  />
                                        })}

                                </Grid>

                                <Grid sx={{p:1}} item xs={12}>
                                    <Typography variant={"subtitle2"}>Labels</Typography>
                                    {loadingLabels? <Typography variant={"caption"}>...</Typography>:
                                        <>
                                            {
                                                availableLabels.length === 0 ? <Typography variant={"caption"}>No labels added for this lead type...</Typography> :
                                                    <>
                                                        {
                                                            availableLabels.map((obj, index) => {
                                                                return <DynamicChipMultiple
                                                                    key={index}
                                                                    onChipCLick={handleLabelsChange}
                                                                    active={selectedLabels}
                                                                    length={selectedLabels.length}
                                                                    id={obj.id} name={obj.name} sx={{m: 0.3}}/>
                                                            })
                                                        }
                                                    </>
                                            }
                                        </>
                                   }

                                </Grid>


                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="name" label="Name of the contact person" value={watch('name')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    {/*<DateInput control={control} name="follow_up_date" label="Follow up date"*/}

                                    {/*           value={watch('follow_up_date')}  />*/}
                                    <DateTimePicker
                                        label="Follow up date"
                                        value={watch('follow_up_date')}
                                        onChange={handleFollowUpChange}
                                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                                    />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="company_name" label="Organization name" value={watch('company_name')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="email" label="Email address" value={watch('email')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={6}>
                                    <TextInput control={control} name="phone_number" label="Phone number" value={watch('phone_number')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={12}>
                                    <TextInput isMultiline control={control} name="address" label="Address" value={watch('address')}  />
                                </Grid>
                                <Grid sx={{p:1}} item xs={12}>
                                    <TextInput isMultiline control={control} name="requirement" label="Requirement" value={watch('requirement')}  />
                                </Grid>

                                <Grid sx={{p:1}} item xs={12}>
                                    <TextInput control={control} name="title" label="Create a title for the lead" value={watch('title')}  />
                                </Grid>

                                <Grid sx={{p:1}} item xs={6}>
                                    <Typography variant={"subtitle2"}>Please choose a source of lead</Typography>
                                    <SelectInputWithSearch ismultiple={"false"} control={control} name={'source_type'} label="Please choose a source of lead" defaultValue={watch('source_type')}>
                                        {
                                            sourceTypes.map(obj => {
                                                return <MenuItem value={obj.id}>{obj.source_type_name}</MenuItem>
                                            })
                                        }
                                    </SelectInputWithSearch>



                                </Grid>

                                {watch('source_type') === 48 &&
                                    <Grid sx={{p: 1}} item xs={6}>
                                        <Typography variant={"subtitle2"}>Please choose a referral of lead </Typography>
                                        <SelectInputWithSearch ismultiple={"false"} control={control} name={'referral'}
                                                      defaultValue={watch('referral')}>
                                            {
                                                referralList.map(obj => {
                                                    return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                                })
                                            }
                                        </SelectInputWithSearch>
                                        <AddReferral onNewRefferal={handlereferralUpdate} />
                                    </Grid>
                                }


                            </Grid>
                    </Scrollbar>
                </DialogContent>
                <DialogActions>
                    <Grid sx={{width:'100%',px:2}}>
                        {alerts?.active? <Alert severity={alerts.type}>{alerts.message}</Alert> : ""}
                    </Grid>
                    <Button variant={"warning"} onClick={handleClose}>Close</Button>
                    <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}  variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton >
                </DialogActions>
                </form>
                {lastLeadId? <DialogActions>
                <Link to={'/dashboard/lead/'+lastLeadId}>Visit last created lead</Link>
                </DialogActions> : ""}
            </Dialog>
        </div>
    );
};

export default LeadAddModal;
