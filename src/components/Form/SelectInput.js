import React, {useEffect} from 'react';
import {Controller} from "react-hook-form";
import {FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, Select} from "@mui/material";

const SelectInput = ({
                         name,
                         label,
                         control,
                         defaultValue,
                         children,
                         ...props
                     }) => {
    const labelId = `${name}-label`;
    return (
        <FormControl {...props} sx={{width: '100%'}}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                render= { ({
                               field: { onChange, value, defaultValue },
                               fieldState: { error },
                               formState,
                           }) =>{
                    return <Select multiple={props.ismultiple=== "false"? false : true} labelId={labelId} label={label} onChange={onChange} value={value} defaultValue={defaultValue} >
                        {children}
                    </Select>
                }}
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};

export default SelectInput;
