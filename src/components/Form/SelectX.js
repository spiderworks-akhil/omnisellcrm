import React, {useEffect, useRef, useState} from 'react';
import {FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import AsyncSelect from "react-select/async";
import {Country} from "../../api/Endpoints/Country";

const SelectX = ( props ) => {


    const onInputChange = (e) => {
        props.options(e);
    }


    return (
        <FormControl {...props} sx={{width: '100%'}}>
            <label className={"css-1wjmx8d-MuiFormLabel-root-MuiInputLabel-root"}>{props.label}</label>
            <Controller
                control={props.control}
                name={props.name}
                render={
                    ({field}) => (
                        <AsyncSelect
                                {...field}
                                isClearable={true}
                                defaultOptions
                                loadOptions={props.options}
                                getOptionLabel={e=>e.name}
                                getOptionValue={e=>e.id}
                                onInputChange={onInputChange}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                 />
                    )
                }
            />

            {props.error && <Typography variant={"string"} sx={{color:"#ec4c47",fontSize: '0.75rem'}}>{props.error}</Typography>}
            {props.error2 && <Typography variant={"string"} sx={{color:"#ec4c47",fontSize: '0.75rem'}}>{props.error2}</Typography>}



        </FormControl>
    );
};

export default SelectX;
