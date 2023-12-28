import { Button, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import TextInput from '../../../../Form/TextInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import DateInput from '../../../../Form/DateInput';
import SelectInputWithSearch from '../../../../Form/SelectInputWithSearch';

function DigitalMarketProposal(props) {

  const [open, setOpen] = useState(false);
  // const handleClose = () => { props.onHandleClose(false); };
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogId, setDialogId] = useState(1);

  const [proposalDate, setproposalDate] = useState(moment())

  //component variables
  const [formButtonStatus, setFormButtonStatus] = useState({
    label: "Submit",
    loading: false,
    disabled: false,
  });
  const [alerts, setAlerts] = useState({
    type: '',
    message: '',
    active: false
  })
  const scheme = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
  })
  const { register, handleSubmit, watch, formState: { errors }, control, setValue, reset } = useForm({ resolver: yupResolver(scheme) });

  const onSubmit = data => {
    console.log('first page submitted');
    // setFormButtonStatus({ ...formButtonStatus, loading: true });
    // setAlerts({ active: false, message: "Internal server error", type: "error" })

    // let dataToSubmit = {
    //     id: props.editId,
    //     leads_id: props.leadId,
    //     title: data.title,
    //     description: data.description,
    // };

    // let action;
    // if (props.editId) {
    //     console.log("dataToSubmit", dataToSubmit);
    //     action = Note.update(dataToSubmit);
    // } else {
    //     action = Note.add(dataToSubmit);
    // }

    // action.then(response => {
    //     setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
    //     setAlerts({ active: true, message: response.data.message, type: response.data.status })
    //     props.onDemoUpdate();
    //     props.getCount()
    //     if (props.editId) { fetchEditDetails(); } else { reset(); }
    //     setFormButtonStatus({ label: "Create", loading: false, disabled: false });
    //     setTimeout(() => { setAlerts({}) }, 2000)
    // }).catch(errors => {
    //     toast.error("Internal server error");
    //     setAlerts({ active: true, message: "Internal server error", type: "error" })
    //     setFormButtonStatus({ label: "Create", loading: false, disabled: false });
    // })

  };

  // const fetchEditDetails = () => {
  //     setIsLoading(true)
  //     Note.getDetails({ note_id: props.editId }).then(response => {
  //         setValue('title', response.data.data.title);
  //         setValue('description', response.data.data.description);
  //         setIsLoading(false);
  //     })
  // }

  return (
    <Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>

          <Grid container md={12} item >
            <Grid sx={{ p: 1 }} item md={8}>
              <TextInput control={control} name="client_name" label="Client Name"
                value={watch('client_name')} />
            </Grid>

            <Grid sx={{ p: 1 }} md={4}>
              <TextInput control={control} name="version" label="Version"
                value={watch('version')} />
            </Grid>
          </Grid>

          <Grid sx={{ p: 1 }} item xs={12}>
            <TextInput control={control} name="main_heading" label="Main Heading"
              value={watch('main_heading')} />
          </Grid>

          <Grid container md={12} item >
            <Grid p={1} md={6}>
              <Typography variant={"subtitle2"}>Proposal Date</Typography>

              <DatePicker
                value={proposalDate}
                onChange={(date) => setproposalDate(date)}
                renderInput={(params) => <TextField {...params} variant={"standard"} />
                }
              />
            </Grid>
            <Grid sx={{ p: 1 }} md={6}>
              <TextInput control={control} name="validity" label="Validity Period"
                value={watch('validity')} />
            </Grid>
          </Grid>

          {/* <Grid sx={{ p: 1 }} item xs={12}>
            <TextInput control={control} name="prepared_by" label="Prepared By"
              value={watch('prepared_by')} />
          </Grid> */}

          <Grid container item md={12}>
            <Grid  p={1} md={6}>
              <Typography variant={"subtitle2"}>Prepared By</Typography>
              <SelectInputWithSearch ismultiple={"false"} control={control} name={'type'}
                defaultValue={watch('type')}>
                {/* {
                types.map(obj => {
                  return <MenuItem onChange={() => setValue('type', obj?.label)} value={obj.label}>{obj.label}</MenuItem>
                })
              } */}
              </SelectInputWithSearch>
            </Grid>
            <Grid  p={1} md={6}>
              <Typography variant={"subtitle2"}>Office Branch</Typography>
              <SelectInputWithSearch ismultiple={"false"} control={control} name={'type'}
                defaultValue={watch('type')}>
                {/* {
                types.map(obj => {
                  return <MenuItem onChange={() => setValue('type', obj?.label)} value={obj.label}>{obj.label}</MenuItem>
                })
              } */}
              </SelectInputWithSearch>
            </Grid>

          </Grid>



        </Grid>
      </form >

      {/* <Grid sx={{
        position: 'fixed',
        bottom: 0,
        width: '38%',
        p: 2,
        borderTop: '1px solid #e0e0e0',
      }} display={'flex'} justifyContent={'space-between'}>
        <Grid>
          <Button disabled={true} variant={"outlined"}>Previous</Button>
        </Grid>
        <Grid>
          <Button onClick={props.next} variant={"outlined"}>Next</Button>
        </Grid>
      </Grid> */}
    </Grid >
  )
}

export default DigitalMarketProposal
