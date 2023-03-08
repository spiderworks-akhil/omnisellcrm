import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    ListItem,
    ListItemAvatar, TextField,
    Typography
} from "@mui/material";
import {format, formatDistanceToNow, formatDistanceToNowStrict, parseISO} from "date-fns";
import toast from "react-hot-toast";
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import DynamicChip from "../../../utils/DynamicChip";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {Alert} from "@mui/lab";

const possibleStatus = [
    {id:1, label: "No response"},
    {id:2, label: "Callback requested"},
]

const SingleFollowUp = (props) => {

    const [status, setStatus] = useState();
    const [remarks, setRemarks] = useState();
    const [newDate, setNewDate] = useState();

    const handleStatus = (e) => {setStatus(e.target.value)}
    const handleRemarks = (e) => {setRemarks(e.target.value)}
    const handleNewDate = (e) => {setNewDate(e.target.value)}

    const [open, setOpen] = useState(false);
    const handleCloseCLick = () => {setOpen(true)}
    const handleCloseClose = () => {setOpen(false)}

    const handleStatusSelect = (e) => { let status = possibleStatus.find(obj => obj.id === e); setStatus(status.label)}

    const [openR, setOpenR] = useState(false);
    const handleRescheduleCLick = () => {setOpenR(true)}
    const handleRescheduleClose = () => {setOpenR(false)}

    const [dataSet, setDataSet] = useState();

    const [isDeleted, setIsDeleted] = useState(false)

    const handleCloseSave = async () =>{
        let data = {
            id: props.dataSet.id,
            follow_up_status: status,
            remarks: remarks
        }
        let response = await FollowUp.update(data);

        if(response.data.status === "success"){
            toast.success(response.data.message)
            handleCloseClose();
            props.onUpdate();
        }else{
            toast.error(response.data.message)
        }

    }
    const handleRescheduleSave = async () =>{
        let data = {
            pre_follow_up_id: props.dataSet.id,
            new_date: moment(newDate).format("DD-MM-YYYY HH:mm:SS"),
        }
        let response = await FollowUp.reschedule(data);

        if(response.data.status === "success"){
            toast.success(response.data.message)
            handleCloseClose();

            let data = {
                id: props.dataSet.id,
                remarks: remarks
            }
            let res = await FollowUp.update(data);

            if(res.data.status === "success"){
                toast.success(res.data.message)
                props.onUpdate();
            }else{
                toast.error(res.data.message)
            }


            props.onUpdate();
        }else{
            toast.error(response.data.message)
        }

    }

    const handleOpenLeadCLick = () => {
        props.onLeadId(props.dataSet.leads_id);
    }

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


            <Dialog open={open} onClose={handleCloseClose}>
                <DialogTitle>Close the follow up</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        {possibleStatus.map(obj=>{
                            return <DynamicChip onChipCLick={handleStatusSelect} name={obj.label} id={obj.id}></DynamicChip>
                        })}

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Status of the follow up"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={handleStatus}
                        value={status}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Remarks"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={handleRemarks}
                        value={remarks}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClose}>Cancel</Button>
                    <Button onClick={handleCloseSave}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openR} onClose={handleRescheduleClose}>
                <DialogTitle>Reschedule the follow up</DialogTitle>
                <DialogContent>
              <br/>

                    <MobileDateTimePicker
                        value={newDate}
                        onChange={(newValue) => {
                            setNewDate(newValue);
                        }}
                        label="Please choose the new date"
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Remarks"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={handleRemarks}
                        value={remarks}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRescheduleClose}>Cancel</Button>
                    <Button onClick={handleRescheduleSave}>Save</Button>
                </DialogActions>
            </Dialog>


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

                            {props.dataSet.close === 1 && <Alert severity="info">This follow up is closed</Alert>}
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                component="span"
                            >

                                {props.dataSet.demo_type && <Chip label={props.dataSet.demo_type} variant="outlined" /> } Follow up is scheduled on {format(parseISO(props.dataSet.datetime),'yyyy MMM do iiii, h:ma')}


                            </Typography>

                            <Card
                                variant="outlined"
                                sx={{width:"100%", p:1}}
                            >
                                {props.dataSet.title} <br/>
                                Assigned to : {props.dataSet?.assigned_to?.name? props.dataSet?.assigned_to?.name : <Button onClick={handleEditShow}>assign to a user</Button>}
                                <br/>
                                {props.dataSet?.follow_up_status && "Status : "+props.dataSet?.follow_up_status} <br/>
                                {props.dataSet?.remarks && "Remarks : "+props.dataSet?.remarks}
                                <br/>


                            </Card>

                        </Typography>

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >

                            <Box sx={{flexGrow: 1}}/>

                            <Button
                                color="success"
                                size="small"
                                variant="text"
                                onClick={handleOpenLeadCLick}
                            >
                                Open lead
                            </Button>

                            <Button
                                color="error"
                                size="small"
                                variant="text"
                                onClick={handleRescheduleCLick}
                            >
                                Reschedule
                            </Button>

                            <Button
                                color="warning"
                                size="small"
                                variant="text"
                                onClick={handleCloseCLick}
                            >
                                Close
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

export default SingleFollowUp;
