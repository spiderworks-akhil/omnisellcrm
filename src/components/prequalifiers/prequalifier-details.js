import React, {useEffect, useState} from 'react';
import NoDataAvailableYet from "../../utils/NoDataAvailableYet";
import {Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, Skeleton} from "@mui/material";
import {PreQualifiers} from "../../api/Endpoints/PreQualifiers";
import {deepOrange, deepPurple} from "@mui/material/colors";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";
import {ActionList} from "../action-list";
import {ActionListItem} from "../action-list-item";
import {Eye as EyeIcon} from "../../icons/eye";
import toast, {CheckmarkIcon} from "react-hot-toast";
import {Delete, NetworkCheck} from "@mui/icons-material";
import {Check} from "../../icons/check";
import ConfirmAlert from "../../utils/ConfirmAlert";
import {Leads} from "../../api/Endpoints/Leads";
import {format, parseISO} from "date-fns";

const PrequalifierDetails = (props) => {

    let showFields = [
        {key: "title", label : "Title"},
        {key: "name", label : "Name"},
        {key: "email", label : "E-Mail"},
        {key: "phone_number", label : "Phone Number"},
        {key: "requirement", label : "Requirement"},
        {key: "detailed_requirement", label : "Requirements in detail"},
        {key: "location", label : "Location"},
        {key: "address", label : "Address"},
        {key: "company_name", label : "Company name"},
        {key: "created_at", label : "Created at"},
        {key: "original_source", label : "Orginal Source"},
        {key: "search_keyword", label : "Search keyword"},
        {key: "status", label : "Status"},
        {key: "gclid", label : "GCLID"},
        {key: "ip_address", label : "IP Address"},
        {key: "source_app", label : "Source App"},
        {key: "source_url", label : "Source URL"},
        {key: "source_website", label : "Source Website"},
        {key: "utm_campaign", label : "Utm campaign"},
        {key: "utm_medium", label : "Utm medium"},
        {key: "utm_source", label : "Utm source"},
    ];

    const [state, setState] = useState(false);
    const [leadData , setLeadData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // delete confirm popup data
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const [isDeleted, setIsDeleted] = useState(false)

    const fetchPrequalifierDetails =async () =>{
        setIsLoading(true);
        await PreQualifiers.details({lead_id:props.id}).then(response => {
            setLeadData(response.data.data);
        })
        setIsLoading(false);
    }

    useEffect(()=>{
        setState(true);setIsDeleted(false);
        if(props.id !== null){ fetchPrequalifierDetails(); }
        console.log("Created")
        return () => {
            setState(false);
        };
    },[props.id])

    const confirmAction = () => {
        setOpen(true)
    }

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            PreQualifiers.reject({lead_id: props.id}).then(response => {
                if(response.data.status !== "error"){
                    toast.success(response.data.message)
                    setIsDeleted(true);
                    props.onDelete()
                }else{
                    toast.error(response.data.message)
                }
            })
        }
    }

    const handleAccept = () => {
        PreQualifiers.accept({lead_id: props.id}).then(response => {
            if(response.data.status !== "error"){
                toast.success(response.data.message)
                setIsDeleted(true);
                props.onDelete()
            }else{
                toast.error(response.data.message)
            }
        })
    }


    if(props.id === null || isDeleted){
        return <NoDataAvailableYet message={'Please select a pre qualifier'}/>
    }else{
        return (
            <div>
                <ConfirmAlert isShow={open} onClose={handleClose}
                              title="Confirm deletion"
                              message="Are you sure you want to delete this lead?. This action is not reversible"
                              onConfirm={handleDeleteConfirmation}/>
                {isLoading?
                    <Skeleton variant="rectangular" width={'100%'} height={300} animation="wave"/>
                    :
                    <>
                        <Grid item xs={12}>
                            <Card
                                variant="outlined"
                            >

                                <Divider />
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        px: 3,
                                        py: 1.5
                                    }}
                                >
                                    <Avatar sx={{
                                        bgcolor: deepPurple[300],
                                        color: "#fff",
                                        height: 64,
                                        mr: 1,
                                        width: 64
                                    }} variant="rounded">
                                        {leadData.name.slice(0,1).toUpperCase()}
                                    </Avatar>
                                    <IconButton color="inherit">
                                        {leadData.name}
                                    </IconButton>

                                    <Button onClick={confirmAction} variant={"outlined"} size={"small"} color={"error"} sx={{ml: 5,position: "absolute",right: "24px"}}><Delete />Delete</Button>
                                    <Button onClick={handleAccept} variant={"outlined"} size={"small"} color={"success"} sx={{ml: 5,position: "absolute",right: "120px"}}><Check /> Convert to Lead</Button>

                                </Box>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {/*<ActionList>*/}
                                        {/*    <ActionListItem*/}
                                        {/*        onClick={confirmAction}*/}
                                        {/*        icon={Delete}*/}
                                        {/*        label="Delete"*/}
                                        {/*    />*/}
                                        {/*    <ActionListItem*/}
                                        {/*        onClick={handleAccept}*/}
                                        {/*        icon={Check}*/}
                                        {/*        label="Convert to Lead"*/}
                                        {/*    />*/}
                                        {/*</ActionList>*/}
                                        <PropertyList>
                                            <PropertyListItem
                                                divider
                                                label={"Pre qualifier created date"}
                                                value={format(parseISO(leadData?.created_at), 'do MMM yyyy')}
                                            />
                                        </PropertyList>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <PropertyList>
                                            {showFields.map((key,index) => {
                                                let total = Object.keys(showFields).length;
                                                if(index < total/2){
                                                    let value = leadData[key.key];
                                                    if(value){
                                                        return <PropertyListItem
                                                            key={index}
                                                            divider
                                                            label={key.label}
                                                            value={value}
                                                        />
                                                    }
                                                }
                                            })}
                                        </PropertyList>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <PropertyList>
                                            {showFields.map((key,index) => {
                                                let total = Object.keys(showFields).length;
                                                if(index >= total/2){
                                                    let value = leadData[key.key];
                                                    if(value){
                                                        return <PropertyListItem
                                                            key={index}
                                                            divider
                                                            label={key.label}
                                                            value={value}
                                                        />
                                                    }
                                                }
                                            })}
                                        </PropertyList>
                                    </Grid>
                                </Grid>

                                <Divider />


                            </Card>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                    </>
                }
            </div>
        );
    }

};

export default PrequalifierDetails;
