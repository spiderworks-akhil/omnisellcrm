import React from 'react';
import {Chip} from "@mui/material";
import {Check} from "../icons/check";

const DynamicChip = (props) => {
    const handleClick = () => {
        props.onChipCLick(props.id)
    }
    return <Chip onClick={handleClick} clickable={true} label={props.name} sx={{m:0.3}} icon={parseInt(props.active)===parseInt(props.id)? <Check /> : null} />
};

export default DynamicChip;
