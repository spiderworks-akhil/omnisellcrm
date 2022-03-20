import React, {useEffect, useState} from 'react';
import {Controller} from "react-hook-form";
import {Checkbox, FormControlLabel, FormHelperText, Radio, RadioGroup} from "@mui/material";

const CheckboxInput = (props) => {

    const [selectedItems, setSelectedItems] = useState(props.preSelectedValues);
    const options= props.options;

    const handleSelect = (value) => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item) => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems((prevItems) => [...prevItems, value]);
        }

    };

    useEffect(() => {
        props.setValue(props.name, selectedItems);
        console.log("Values :", props.value)
    }, [selectedItems]);



    return (
        <>
            {options.map((option, index) => {
                return (
                        <FormControlLabel
                            control={
                                <Controller
                                    name={props.name}
                                    render={({}) => {
                                        return (
                                            <Checkbox
                                                checked={selectedItems.includes(option.value)}
                                                onChange={() => handleSelect(option.value)}
                                            />
                                        );
                                    }}
                                    control={props.control}
                                />
                            }
                            label={option.label}
                            key={index}
                        />
                );
            })}

            {props.errors?.message? <FormHelperText error>{props.errors?.message}</FormHelperText>:""}
        </>
    );
}

export default CheckboxInput;