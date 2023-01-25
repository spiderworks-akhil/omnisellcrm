import React, {useState} from 'react';
import {Avatar, Box, Button, Card, Chip, ListItem, Typography} from "@mui/material";
import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";
import ConfirmAlert from "../../../../utils/ConfirmAlert";
import toast from "react-hot-toast";
import {Leads} from "../../../../api/Endpoints/Leads";
import LeadAddCall from "../../lead-modals/lead-add-call";
import {green, grey} from "@mui/material/colors";
import RequirementToWorkorderModal from "../lead-workorder/requirement-to-workorder-modal";
import LeadAddRequirement from "../../lead-modals/lead-add-requirement";
import {PaymentProfile} from "../../../../api/Endpoints/PaymentProfile";

const SinglePaymentProfile = (props) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    //Covert to  work order


    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            PaymentProfile.remove({id: props.id}).then(response => {
                setIsDeleted(true);
                props.onDelete()
                toast.success(response.data.message)
            })
        }
    }
    const handleEditShow = () => {
        props.onEdit(props.id);
    }


    return (
        <>


            {!isDeleted ?
                <ListItem
                    sx={{
                        px: 3,
                        borderBottom: '1px solid #f0f0f0'
                    }}
                >
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
                                {props.title}
                            </Typography>

                        </Typography>
                        <Typography
                            color="textPrimary"
                            sx={{my: 1}}
                            variant="body2"
                        >
                            {props.description}
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
                            Created by {props.user} {formatDistanceToNow(new Date(props.time), {addSuffix: true})}
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

export default SinglePaymentProfile;
