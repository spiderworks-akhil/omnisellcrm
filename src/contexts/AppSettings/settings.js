import React, {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';


export const AppSettingsContext = createContext({
    method: 'JWT',
    set_lead_type : () => Promise.resolve(),
    get_lead_type : () => Promise.resolve(),
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
            localStorage.setItem('leadType',1);
            return localStorage.getItem('leadType');;
        }
    };

    return (
        <AppSettingsContext.Provider
            value={{
                set_lead_type,
                get_lead_type
            }}
        >
            {children}
        </AppSettingsContext.Provider>
    );
}

AppSettingsProvider.protoTypes = {
    children: PropTypes.node.isRequired
}
