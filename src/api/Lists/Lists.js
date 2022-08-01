import {LeadTypes} from "../Endpoints/LeadTypes";
import {Labels} from "../Endpoints/Labels";
import {Stages} from "../Endpoints/Stages";
import {Users} from "../Endpoints/Users";
import {useAppSettings} from "../../hooks/use-app-settings";


export const Lists = {

    leadTypes: () =>{
        return  Users.getLeadTypeOrganisations({organisations_id: localStorage.getItem('organization')}).then(response => {
            console.log("leadTypes",response.data); return response.data.data;
        })
    },
    labels: () => {
        return Labels.get().then(response => { return response.data.data.data; })
    },
    stages: (data) => {
        return Stages.get(data).then(response => { return response.data.data.data; })
    },
    users: () => {
        return Users.get().then(response => { return response.data.data.data; })
    },
    priorities: () =>{
        return [{id:1,label:'High'},{id:2,label:'Medium'},{id:3,label:'Low'}];
    },
    status: () =>{
        return [{id:1,label:'Open'},{id:2,label:'Close'}];
    },



}
