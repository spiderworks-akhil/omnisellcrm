import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Grid, Typography} from "@mui/material";
import {SketchPicker} from "react-color";
import PageHeader from "./page-header";
import ColorPicker from "../../utils/color-picker";
import {useAppSettings} from "../../hooks/use-app-settings";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import {Auth} from "../../api/Endpoints/Auth";

const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const UserSettings = () => {

    const query = useQuery();
    const appSettings = useAppSettings();
    const navigate = useNavigate();
    // Modal actions
    const [showColorPicker, setShowColorPicker] = useState(false);
    const handleColorPicker = () => {setShowColorPicker(true)}
    const handleColorPickerClose = () => {setShowColorPicker(false)}

    const [navbarColor, setnavBarColor] = useState(appSettings.get_navbar_color());

    const handleColorPick = (color) => {
        setnavBarColor(color);
        appSettings.set_navbar_color(color);
        navigate('/dashboard/settings')
    }

    const handleGoogleConnectCLick = () => {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {'client_id': '72617630398-r0mh7q0cgef7oghpe6r9ulch4tjdkch6.apps.googleusercontent.com',
            'redirect_uri': 'http://localhost:3000/dashboard/settings',
            'response_type': 'code',
            'access_type': 'offline',
            'scope': 'https://www.googleapis.com/auth/calendar.app.created',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'};

        // Add form parameters as hidden input values.
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

    const saveAccessToken = () => {

        let code = (query.get('code'));

        var fragmentString = window.location.hash.substring(1);
        // Parse query string to see if page request is coming from OAuth 2.0 server.

        if (query.get('code')) {
            localStorage.setItem('google-token-code', query.get('code') );
            if(code.length > 10){
                let data = {
                    token: code,
                    origin: 'Google'
                }
                Auth.getAccessTokens().then(response => {
                    console.log("Respose from google:", response)
                })
                Auth.registerToken(data).then(response => {
                    console.log("response from register token", response)
                    if(response.data.status === "success"){
                        toast.success(response.data.message)
                    }
                })
            }
        }
    }

    useEffect(()=>{
        saveAccessToken();
    },[])

    return (
        <Grid container>
            <ColorPicker onColorPick={handleColorPick} isShow={showColorPicker} onHandleClose={handleColorPickerClose} />
            <Grid item xs={12}>
                <PageHeader />
            </Grid>
            <Grid item xs={12} sx={{mx:2}}>
                    <Grid container>

                        <Grid item lg={6} sm={6} xs={12} >
                            <Typography variant="h6" gutterBottom component="div">
                                App Settings
                            </Typography>
                            <Divider />

                            <Grid container sx={{py:2}}>
                                <Grid item  lg={4} sm={6} xs={12} >
                                    <Typography variant="subtitle2" gutterBottom component="div"> Pick a nav bar color </Typography>
                                </Grid>
                                <Grid item  lg={4} sm={6} xs={12} >
                                    <Grid item sx={{background:navbarColor, width:"50px", p:1}}></Grid>
                                </Grid>
                                <Grid item  lg={4} sm={6} xs={12} >
                                    <Button onClick={handleColorPicker} sx={{display:'block'}} variant={"outlined"}>Pick color</Button>
                                </Grid>
                            </Grid>


                        </Grid>


                        <Grid item lg={6} sm={6} xs={12} >
                            <Typography variant="h6" gutterBottom component="div">
                                You can connect your google account to access your calender
                            </Typography>
                            <Divider />
                            <Button  onClick={handleGoogleConnectCLick} sx={{display:'block',mt:1}} variant={"outlined"}>Connect Google Calendar</Button>
                        </Grid>

                    </Grid>
            </Grid>




        </Grid>
    );
};

export default UserSettings;
