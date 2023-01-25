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

const SingleWorkOrder = (props) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    //Covert to  work order
    const [openCovert, setOpenCovert] = useState(false);
    const handleCovertShow = () => {setOpenCovert(true)}
    const handleCovertClose = () => {setOpenCovert(false)}

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            Leads.removeRequirement({id: props.data.id}).then(response => {
                setIsDeleted(true);
                props.data.onDelete()
                toast.success(response.data.message)
            })
        }
    }
    const handleEditShow = () => {
        props.data.onEdit(props.data.id);
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

                    {parseInt(props.data.status) === 2 ?
                        <Avatar
                            sx={{bgcolor: grey[500], color: grey["A100"]}}
                            alt="Closed"
                            src="/broken-image.jpg"
                        >
                            C
                        </Avatar>
                        :
                        <Avatar
                            sx={{bgcolor: green[500], color: green["A100"]}}
                            alt="Closed"
                            src="/broken-image.jpg"
                        >
                            O
                        </Avatar>
                    }
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
                                {props.data.title} X  {props.data.quantity}
                            </Typography>

                        </Typography>
                        <Typography
                            color="textPrimary"
                            sx={{my: 1}}
                            variant="body2"
                        >
                            Payment profile : {props.data.payment_profile?.title} <br/>
                            Total : {props.data.total} (Inclusive of tax)<br/>

                            {props.data.taxes?.map(obj => {
                                return <>{obj.tax_field?.label} {obj.tax_percentage} ({obj.total_amount})<br/></>
                            })
                            }
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
                            Created by {props.data.created_user.name} {formatDistanceToNow(new Date(props.data.created_at), {addSuffix: true})}
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

export default SingleWorkOrder;
