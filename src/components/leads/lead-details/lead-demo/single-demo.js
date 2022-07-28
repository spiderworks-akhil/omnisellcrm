import React, {useState} from 'react';
import {Avatar, Box, Button, Card, Chip, ListItem, ListItemAvatar, Typography} from "@mui/material";
import {format, formatDistanceToNow, formatDistanceToNowStrict, parseISO} from "date-fns";
import ConfirmAlert from "../../../../utils/ConfirmAlert";
import toast from "react-hot-toast";
import {Leads} from "../../../../api/Endpoints/Leads";
import LeadAddCall from "../../lead-modals/lead-add-call";
import {green, grey} from "@mui/material/colors";
import RequirementToWorkorderModal from "../lead-workorder/requirement-to-workorder-modal";
import LeadAddRequirement from "../../lead-modals/lead-add-requirement";
import {Demo} from "../../../../api/Endpoints/Demo";
import {FollowUp} from "../../../../api/Endpoints/FollowUp";

const SingleDemo = (props) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const [dataSet, setDataSet] = useState();

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            FollowUp.remove({id: props.dataSet.id}).then(response => {
                setIsDeleted(true);
                props.onDelete()
                toast.success(response.data.message)
            })
        }
    }
    const handleEditShow = () => {
        props.onEdit(props.dataSet.id);
    }

    useState(()=>{
        setDataSet(props.dataSet);
    },[props.dataSet])

    return (
        <>


            {!isDeleted ?
                <ListItem
                    sx={{
                        px: 3,
                        borderBottom: '1px solid #f0f0f0'
                    }}
                >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "grey" }} variant="square">
                            {format(parseISO(props.dataSet.datetime),'do')} <br/>
                            {format(parseISO(props.dataSet.datetime),'MMM')} <br/>
                        </Avatar>
                        {props.dataSet?.sub_type?.name && <Typography variant={"caption"}>{props.dataSet?.sub_type?.name}</Typography>}
                    </ListItemAvatar>
                    <ConfirmAlert isShow={open} onClose={handleClose}
                                  title="Confirm deletion"
                                  message="Are you sure you want to delete this log?. This action is not reversible"
                                  onConfirm={handleDeleteConfirmation}/>


                    <Box
                        sx={{
                            flex: 1,
                            ml: 2
                        }}
                    >



                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >

                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                component="span"
                            >

                                {props.dataSet.demo_type && <Chip label={props.dataSet.demo_type} variant="outlined" /> } Demo is scheduled on {format(parseISO(props.dataSet.datetime),'yyyy MMM do iiii, h:ma')}


                            </Typography>

                            <Card
                                variant="outlined"
                                sx={{width:"50%", p:1}}
                            >
                                {props.dataSet.title} <br/>
                                Assigned to : {props.dataSet?.assigned_to?.name? props.dataSet?.assigned_to?.name : <Button onClick={handleEditShow}>assign to a user</Button>}
                            </Card>

                        </Typography>

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                color="textSecondary"
                                variant="caption"
                            >
                            Created by {props.dataSet.created_user?.name} {formatDistanceToNow(new Date(), {addSuffix: true})}
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>

                            <Button
                                color="primary"
                                size="small"
                                variant="text"
                                onClick={handleEditShow}
                            >
                                Edit
                            </Button>
                            <Button
                                color="error"
                                size="small"
                                variant="text"
                                onClick={handleShow}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>


                </ListItem>
            :
            ""
            }
        </>
    );
};

export default SingleDemo;
