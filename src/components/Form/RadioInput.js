import React from 'react';
import {Controller} from "react-hook-form";
import {FormControlLabel, FormHelperText, Radio, RadioGroup, TextField} from "@mui/material";

const RadioInput = (props) => {
    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                defaultValue={props.value}
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                             formState,
                         }) => (
                    <RadioGroup
                        row
                        value={value || ''}
                        onChange={onChange}
                        aria-label={props.label}
                    >
                        {props.options.map((obj,index) => {
                            return <FormControlLabel value={obj.value} control={<Radio />} label={obj.label} key={index} />
                        })}

                        {!!error? <FormHelperText error>{error.message}</FormHelperText>:""}
                    </RadioGroup>
                )}
            />
        </>
    );
}

export default RadioInput;