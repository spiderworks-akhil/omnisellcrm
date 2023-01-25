import React, {useEffect} from 'react';
import {Chip} from "@mui/material";
import {Check} from "../icons/check";
import {lightBlue} from "@mui/material/colors";
import CheckIcon from '@mui/icons-material/Check';

const DynamicChip = (props) => {
    const handleClick = () => {
        props.onChipCLick(props.id)
    }
    useEffect(()=>{

    },[props.active])

    return <Chip onClick={handleClick} clickable={true} label={props.name} sx={{m:0.3, background:props.background, color: props.color,}}
                 icon={props.active?.includes(props.id)? <CheckIcon style={{ color: props.color }} /> : null}
    />
};

export default DynamicChip;
