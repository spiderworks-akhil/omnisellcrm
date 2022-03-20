import React, {useEffect, useState} from 'react';
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Rating, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {wait} from "@testing-library/user-event/dist/utils";
import RatingInput from "../components/Form/RatingInput";
import TextInput from "../components/Form/TextInput";
import RadioInput from "../components/Form/RadioInput";
import CheckboxInput from "../components/Form/CheckboxInput";

const Form = (props) => {
    //component variables
    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    });
    const [ratingValue, setRatingValue] = useState(null);

    const scheme = yup.object().shape({
        name: yup.string().required(),
        address: yup.string().required(),
        gender: yup.string().required(),
        rating: yup.string().required().typeError("Please select a rating"),
    })

    const {register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({
        resolver : yupResolver(scheme),
    });
    const onSubmit = data => {
        setFormButtonStatus({...formButtonStatus, loading : true});
        setTimeout(()=>{
            console.log("data received from the form", data);
            setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
        },1000)
    };

    // testing out the function of watch
    useEffect(()=> {
        setValue('rating',null)
        setValue('name',"Akhil")
        setValue('address',"Mangalam house")
    },[])
    console.log(watch('name'))
    console.log(watch('address'))
    console.log("Watch gender : ", watch('gender'))

    //Dummy data
    let radioValues = [{label: "Male", value: "Male", key : 1},{label: "Female", value: "Female", key : 2},{label: "Other", value: "Other", key : 3}]
    let checkboxValues = [{label: "Male", value: "Male"},{label: "Female", value: "Female"},{label: "Other", value: "Other"}]

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={8}>
                    <h5>Form testing</h5>
                    <Grid container spacing={0.5}>
                        <Grid item xs={4}>
                            <br/>
                        </Grid>
                        <Paper>
                            <Grid item xs={8} >
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <TextInput control={control} name="name" label="Full name" value={watch('name')}  /> <hr/>
                                    <RadioInput control={control} name="gender" label="Gender" value={watch('gender')} options={radioValues} /> <hr/>
                                    <CheckboxInput control={control} name="checkbox" setValue={setValue}
                                                   preSelectedValues={["Other"]} label="checkbox"
                                                   options={checkboxValues} errors={errors.checkbox} /> <br/><hr/>
                                    <RatingInput name="rating" control={control} value={watch('rating')} errors={errors.rating}/><hr/>


                                    <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}  variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton >
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}

export default Form;
