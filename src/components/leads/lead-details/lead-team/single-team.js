
import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Box, Button, Chip, ListItem, Skeleton, Typography} from "@mui/material";
import {formatDistanceToNow} from "date-fns";
import ConfirmAlert from "../../../../utils/ConfirmAlert";
import toast from "react-hot-toast";
import {Leads} from "../../../../api/Endpoints/Leads";
import {green, grey} from "@mui/material/colors";
import RequirementToWorkorderModal from "../lead-workorder/requirement-to-workorder-modal";
import {Team} from "../../../../api/Endpoints/Team";
import ColoredAvatar from "../../../../utils/ColoredAvatar";

const SingleCall = (props) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [userType, setUserType] = useState('');

    //Covert to  work order
    const [openCovert, setOpenCovert] = useState(false);
    const handleCovertShow = () => {setOpenCovert(true)}
    const handleCovertClose = () => {setOpenCovert(false)}

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
            console.log("handleDeleteConfirmation", props.user.id)
            Team.remove({id: props.user.id}).then(response => {
                setIsDeleted(true);
                props.onDelete()
                toast.success(response.data.message)
            })
        }
    }
    const handleEditShow = () => {
        props.onEdit(props.id);
    }


    useEffect(()=>{

        if(props.user.employee_user === null){
            setUser(props.user.client_user);
            setUserType('Client');
        }else{
            setUser(props.user.employee_user);
            setUserType('Internal Team');
        }
        setLoading(false)
    },[props.user])

    return (
        <>{loading ?
            <Skeleton variant="rectangular" width={"100%"} height={118}/>
            :
            <>

                {!isDeleted ?
                    <ListItem
                        sx={{
                            px: 3,
                            borderBottom: '1px solid #f0f0f0',
                            width:"50%",
                            display:"inline-flex",
                        }}
                        classes={'team-list'}
                    >

                        <ConfirmAlert isShow={open} onClose={handleClose}
                                      title="Confirm deletion"
                                      message="Are you sure you want to delete this log?. This action is not reversible"
                                      onConfirm={handleDeleteConfirmation}/>





                            <Chip
                                avatar={<Avatar>{user?.name.slice(0,1)}</Avatar>}
                                label={props.user?.role}
                                variant="outlined"
                            />


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
                                    {user?.name}
                                </Typography>


                            </Typography>
                            <Typography
                                color="textPrimary"
                                sx={{my: 1}}
                                variant="body2"
                            >
                                {user?.email}
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
                                    Added
                                    by {props.user?.created_user?.name} {formatDistanceToNow(new Date(props.user?.created_at), {addSuffix: true})}
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
        }
        </>
    );
};

export default SingleCall;
