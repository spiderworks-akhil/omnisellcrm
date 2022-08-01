import React from 'react';
import {ListItem, ListItemText} from "@mui/material";
import {useAppSettings} from "../../hooks/use-app-settings";
import {Users} from "../../api/Endpoints/Users";
import toast from "react-hot-toast";

const AccountPopoverSingleOrganization = (props) => {

    const appSettings = useAppSettings();


    const handleOrganizationClick = async () => {
        await appSettings.set_organization(props.dataSet.id);
        await Users.getLeadTypeOrganisations({organisations_id: appSettings.get_organization()}).then(response => {
            if(response.data.data.length>0){
                toast.loading("Changing lead types",{duration: 3000})
                appSettings.set_lead_type(response.data.data[0].id)
                appSettings.get_logo(props.dataSet.id);
                props.onOrganizationChange();
            }else{
                toast.error("You don't have access to lead types for this Organization")
            }
        })
    }



    return <ListItem
            button
            divider
            selected={parseInt(appSettings.get_organization()) === parseInt(props.dataSet.id)? true : false}
            onClick={handleOrganizationClick}
        >
            <ListItemText primary={props.dataSet?.name} />
        </ListItem>;
};

export default AccountPopoverSingleOrganization;
