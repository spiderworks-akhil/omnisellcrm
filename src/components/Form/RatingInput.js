import React from 'react';
import {Controller} from "react-hook-form";
import {FormHelperText, Rating} from "@mui/material";

const RatingInput = (props) => {
    return (
        <>
            <Controller
            name={props.name}
            control={props.control}
            render={({   field: { onChange, value}}) =>
                <Rating
                    value={parseInt(props.value)}
                    onChange={onChange}
                />
            }
            /><br/>
            {props.errors?.message? <FormHelperText error>{props.errors?.message}</FormHelperText>:""}

        </>


    );
}

export default RatingInput;