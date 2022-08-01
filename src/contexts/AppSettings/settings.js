import React, {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {User} from "../../icons/user";
import {Users} from "../../api/Endpoints/Users";


export const AppSettingsContext = createContext({
    method: 'JWT',
    set_lead_type : () => Promise.resolve(),
    get_lead_type : () => Promise.resolve(),
    set_organization : () => Promise.resolve(),
    get_organization : () => Promise.resolve(),
    set_navbar_color : () => Promise.resolve(),
    get_navbar_color : () => Promise.resolve(),
    get_logo : () => Promise.resolve(),
});

export const AppSettingsProvider = (props) => {
    const { children } = props;

    const set_lead_type = async (lead_type) => {
        localStorage.setItem('leadType', lead_type);
        return localStorage.getItem('leadType');
    };

    const get_lead_type =  (lead_type) => {
        let leatType = localStorage.getItem('leadType');
        if(typeof leatType !== undefined){
            return leatType;
        }else {
            return undefined;
        }
    };

    const set_organization = async (lead_type) => {
        localStorage.setItem('organization', lead_type);
        return localStorage.getItem('organization');
    };

    const get_organization =  (lead_type) => {
        let leatType = localStorage.getItem('organization');
        if(typeof leatType !== undefined){
            return leatType;
        }else {
            localStorage.setItem('organization',0);
            return localStorage.getItem('organization');;
        }
    };

    const get_logo =  (organisation_id) => {
        let logo = localStorage.getItem('logo');
        if(logo && !organisation_id){
            return logo;
        }else {
            Users.getLogo({organisation_id:organisation_id}).then(response => {
                localStorage.setItem('logo',response.data.data.logo);
            })
        }

    };

    const set_navbar_color = async (colorCode) => {
        localStorage.setItem('navbarColor', colorCode);
        return localStorage.getItem('navbarColor');
    };

    const get_navbar_color =  () => {
        let colorCode = localStorage.getItem('navbarColor');
        if(colorCode !== null){
            return colorCode;
        }else {
            localStorage.setItem('navbarColor',"#1e212a");
            return localStorage.getItem('navbarColor');
        }
    };

    return (
        <AppSettingsContext.Provider
            value={{
                set_lead_type,
                get_lead_type,
                set_organization,
                get_organization,
                set_navbar_color,
                get_navbar_color,
                get_logo
            }}
        >
            {children}
        </AppSettingsContext.Provider>
    );
}

AppSettingsProvider.protoTypes = {
    children: PropTypes.node.isRequired
}
