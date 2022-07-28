import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
  Box,
  Button,
  Grid,
  Typography
} from "@mui/material";
import TextInput from "./../Form/TextInput";
import {LoadingButton} from "@mui/lab";
import {Link as BrowserLink, useNavigate} from 'react-router-dom';
import {useAuth} from "../../hooks/use-auth";
import toast from "react-hot-toast";


export const LoginJwt = (props) => {
  let isMounted = true
  const { login } = useAuth();
  const navigate = useNavigate();
  //component variables
  const [formButtonStatus, setFormButtonStatus] = useState({
    label: "Login",
    loading: false,
    disabled: false,
  });

  const scheme = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })

  const {register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({
    resolver : yupResolver(scheme),
  });
  const onSubmit = async(data) => {
    setFormButtonStatus({...formButtonStatus, loading : true});

    try {
      await login(data.email, data.password).then(()=> {

          setFormButtonStatus({label: "Login", loading : false,disabled: false});

      });

    } catch (err){
      console.error("Login errors",err);
      toast.custom(err.message)
      setFormButtonStatus({label: "Submitted", loading : false,disabled: true});
    }

  };

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  useEffect(()=> {

    return () => {
      isMounted = false;
    }
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: 3
        }}
      >
        <Typography
          color="textPrimary"
          variant="h4"
        >
          Login
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <TextInput control={control} name="email" label="Email address" value={watch('email')}  />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextInput control={control} name="password" label="Password" type="password" value={watch('password')}  />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <LoadingButton fullWidth color="primary" loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}  variant="contained" type="submit">{formButtonStatus.label}</LoadingButton >

        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            color="primary"
            onClick={handleForgotPassword}
            variant="text"
          >
            Forgot password
          </Button>
        </Grid>
      </Grid>

    </form>
  );
};

