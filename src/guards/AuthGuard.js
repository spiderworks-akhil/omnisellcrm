import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {Login} from "../pages/Login";
import {useAuth} from "../hooks/use-auth";

function AuthGuard(props) {
    const { children } = props;
    const auth = useAuth();
    const location = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!auth.isAuthenticated) {
        if (location.pathname !== requestedLocation) {
            setRequestedLocation(location.pathname);
        }

        return (
            <Login />
        );
    }


    return (
        <div>{children}</div>
    );
}

export default AuthGuard;
