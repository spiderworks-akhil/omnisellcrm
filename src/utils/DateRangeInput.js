import React, {useEffect, useState} from 'react';
import {DateRangePicker} from "@mui/lab";
import {Box, TextField} from "@mui/material";
import {format, parse} from "date-fns";

const DateRangeInput = (props) => {

    const [value, setValue] = useState([null, null]);

    const onDateChange = (newValue) => {
        setValue(newValue);
        props.onDateChange(newValue);
    }

    useEffect(() => {
       setValue([format(parse(props.date.from, 'dd-MM-yyyy', new Date()),'MM/dd/yyyy'),
           format(parse(props.date.to, 'dd-MM-yyyy', new Date()),'MM/dd/yyyy')])
    },[props.date])

    return (
        <DateRangePicker
            startText="From"
            endText="To"
            value={value}
            onChange={onDateChange}
            renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
            )}
        />
    )
};

export default DateRangeInput;
