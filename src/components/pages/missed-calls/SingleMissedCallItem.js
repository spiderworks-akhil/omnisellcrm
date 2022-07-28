import React, {useEffect, useState} from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import ColoredAvatar from "../../../utils/ColoredAvatar";
import MissedCallSingleItemPopup from "./missed-call-single-item-popup";
import {MissedCalls} from "../../../api/Endpoints/MissedCalls";


const SingleMissedCallItem = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {setModalOpen(false)};

    const handleOnClick = () => {setModalOpen(true); props.onItemClick(props.dataSet.id)}
    let carrier =  JSON.parse(props.dataSet.data);

    const handleStatusChange = () => {
        props.onStatusChange();
    }


    useEffect(()=>{
        console.log("data", JSON.parse(props.dataSet.data))
    },[])

    return (
        <List dense={false} sx={{borderBottom:'1px solid #f0f0f0'}}  disablePadding>

            <MissedCallSingleItemPopup onStatusChange={handleStatusChange} mobile={props.dataSet.mobile_number} id={props.dataSet.id} onModalClose={handleModalClose} dataSet={carrier} isOpen={modalOpen} />

            <ListItemButton onClick={handleOnClick} selected={(props.active === props.dataSet.id)? true : false}>
                <ListItemAvatar>
                    <ColoredAvatar letter={props.dataSet.mobile_number.slice(0,1).toString().toUpperCase()}/>
                </ListItemAvatar>
                <ListItemText primary={props.dataSet.mobile_number}/>
                {carrier.origin !== "{origin}" && <Typography variant={"subtitle2"}>{carrier.origin}</Typography>}

            </ListItemButton>
        </List>
    );
};

export default SingleMissedCallItem;
