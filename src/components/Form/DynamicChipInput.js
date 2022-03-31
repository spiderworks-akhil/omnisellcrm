import React from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import {Controller} from "react-hook-form";
import DynamicChipParent from "./DynamicChipParent";

const DynamicChipInput = ({
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
            <Controller
                render= { ({
                               field: { onChange, value, defaultValue },
                               fieldState: { error },
                               formState,
                           }) =>{
                    return <DynamicChipParent
                        options={props.options}
                        value={value}
                        defaultValue={value}
                        onChange={onChange} />
                }
                }
                name={name}
                control={control}
            />
        </FormControl>
    );
};

export default DynamicChipInput;
