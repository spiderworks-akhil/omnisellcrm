import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
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

const SingleNote = (props) => {
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
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <ListItemText
                                primary={props.dataSet?.title}
                                secondary={
                                    <React.Fragment>
                                        {props.dataSet?.description}
                                        <Typography color="textSecondary" variant="caption" > <br/>Created by {props.dataSet.created_user?.name} {formatDistanceToNow(new Date(), {addSuffix: true})}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />


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

export default SingleNote;
