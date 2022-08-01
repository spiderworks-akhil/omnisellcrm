import React from 'react';
import {Button} from "@mui/material";
import {MissedCalls} from "../../../api/Endpoints/MissedCalls";
import toast from "react-hot-toast";

const MissedCallActionButtons = (props) => {
    let dataSet = props.dataSet;

    const handleStatusChange = () => {
        MissedCalls.changeStatus({status: dataSet.value,id:props.id,missed_call_id:props.id}).then(response => {
            if(response.data.status === "success"){
                toast.success(response.data.message)
                props.onSuccess();
            }
        })
    }


    return (
        <Button id={dataSet.value} size="small" variant={"outlined"} onClick={handleStatusChange}>{dataSet.label}</Button>
    );
};

export default MissedCallActionButtons;
