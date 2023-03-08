import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";
import {AppBar, Box, Button, Card, CardContent, Container, Grid, TextField, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, Redirect, useNavigate} from "react-router-dom";
import {Logo} from "../logo";
import {useSettings} from "../../contexts/Settings/settings-context";
import {ProductFeatures} from "../auth/product-features";
import TextInput from "../Form/TextInput";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import toast from "react-hot-toast";
import {Auth} from "../../api/Endpoints/Auth";
const ForgotPassword = () => {
    const navigate = useNavigate();
    const settings = useSettings();
    const [showFiledAfterOTP, setShowFiledAfterOTP] = useState(false);

    const [sendOtpButtonStatus, setSendOtpButtonStatus] = useState({
        label: "Send OTP",
        loading: false,
        disabled: false,
    });

    const [changePasswordButtonStatus, setChangePasswordButtonStatus] = useState({
        label: "Change Password",
        loading: false,
        disabled: false,
    });

    const scheme = yup.object().shape({
        email: yup.string().required(),
        otp: yup.string().required(),
        password: yup.string().required(),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], 'New password and confirm password must match')
    })

    const {register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({
        resolver : yupResolver(scheme),
    });

    const onSubmit = async(data) => {
        setChangePasswordButtonStatus({...changePasswordButtonStatus, loading : true});

        let dataToSubmit = {
            email: data.email,
            otp: data.otp,
            password: data.password,
            password_confirmation: data.confirm_password,
        };


        await Auth.verifyNewPassword(dataToSubmit).then(response => {
            if(response.data.status === "success"){
                setChangePasswordButtonStatus({...changePasswordButtonStatus, loading : false});
                toast.success(response.data.message,{autoClose: 5000})
                navigate('/')
            }
        })
    };

    const handleSendOTP = async (data) => {
        setSendOtpButtonStatus({...sendOtpButtonStatus, loading : true});
        await Auth.sendOtp({email:watch('email')}).then(response => {
            if(response.data.status === "success"){
                setSendOtpButtonStatus({...sendOtpButtonStatus, loading : false});
                setShowFiledAfterOTP(true);
            }else{
                toast.error("Invalid email address, Please contact at akhil@spiderworks.in to register your email address", {
                    duration: 10000,
                    position: 'top-center'})
                setSendOtpButtonStatus({...sendOtpButtonStatus, loading : false});
            }
        })
    }

    const handleLoginClick = () => {
        navigate('/')
    }


    return (
        <>
            <Helmet>
                <title>Forgot password | Omnisell Dashboard</title>
            </Helmet>
            <AppBar
                elevation={0}
                sx={{ backgroundColor: 'background.paper' }}
            >
                <Container maxWidth="md">
                    <Toolbar
                        disableGutters
                        sx={{ height: 64 }}
                    >
                        <RouterLink to="/">
                            <Logo variant={settings.theme === 'dark' ? 'light' : 'dark'} />
                        </RouterLink>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    pt: '64px'
                }}
            >

                <Box sx={{ py: 9 }}>
                    <Container maxWidth="md">

                        <Grid
                            container
                            spacing={6}
                        >
                            <Grid
                                item
                                md={6}
                                sx={{
                                    display: {
                                        md: 'block',
                                        xs: 'none'
                                    }
                                }}
                                xs={12}
                            >
                                <ProductFeatures />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Card
                                        sx={{ backgroundColor: 'background.default' }}
                                        elevation={0}
                                    >
                                        <CardContent>
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
                                                    Forgot Password
                                                </Typography>
                                                <Box sx={{ flexGrow: 1 }} />

                                            </Box>
                                            <Grid container spacing={2} >
                                                <Grid item xs={12}>
                                                    <TextInput control={control} name="email" label="Email address" value={watch('email')}  />
                                                    {!showFiledAfterOTP &&
                                                        <LoadingButton sx={{mt: 1}} fullWidth color="info"
                                                                       loading={sendOtpButtonStatus.loading}
                                                                       disabled={sendOtpButtonStatus.disabled}
                                                                       onClick={handleSendOTP}
                                                                       variant="contained" type="button">
                                                            {sendOtpButtonStatus.label}
                                                        </LoadingButton>
                                                    }
                                                </Grid>

                                                { showFiledAfterOTP &&
                                                    <>
                                                        <Grid item xs={12}>
                                                            <TextInput control={control} name="otp" label="OTP"
                                                                       value={watch('otp')}/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextInput control={control} type={"text"} name="password"
                                                                       label="New password" value={watch('password')}/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextInput control={control}  type={"text"} name="confirm_password"
                                                                       label="Confirm password" value={watch('confirm_password')}/>
                                                            <LoadingButton sx={{mt: 1}} fullWidth color="primary"
                                                                           loading={changePasswordButtonStatus.loading}
                                                                           disabled={changePasswordButtonStatus.disabled}
                                                                           variant="contained" type="submit">
                                                                {changePasswordButtonStatus.label}
                                                            </LoadingButton>
                                                        </Grid>
                                                    </>
                                                }


                                            </Grid>
                                            <Button
                                                color="primary"
                                                onClick={handleLoginClick}
                                                variant="text"
                                            >
                                                Sign in
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default ForgotPassword;
