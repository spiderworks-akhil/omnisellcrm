import React, {useState} from 'react';
import {Avatar, Box, Button, Card, Chip, ListItem, Typography} from "@mui/material";
import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";
import ConfirmAlert from "../../../../utils/ConfirmAlert";
import toast from "react-hot-toast";
import {Leads} from "../../../../api/Endpoints/Leads";
import LeadAddCall from "../../lead-modals/lead-add-call";

const SingleCall = (props) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            Leads.removeCallLog({id: props.id}).then(response => {
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


                    <Avatar sx={{mr: 2}}>{props.user.slice(0, 1)}</Avatar>
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
                                {props.user}
                            </Typography>

                        </Typography>
                        <Typography
                            color="textPrimary"
                            sx={{my: 1}}
                            variant="body2"
                        >
                            {props.message}
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
                                Last updated : {formatDistanceToNow(new Date(props.time), {addSuffix: true})} |
                                Created on : {formatDistanceToNow(new Date(props.time), {addSuffix: true})}
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

export default SingleCall;
