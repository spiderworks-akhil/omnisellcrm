import {LeadTypes} from "../Endpoints/LeadTypes";

export const Lists = {
    leadTypes: () =>{
        return  LeadTypes.index().then(response => { return response.data.data.data; })
    },
    priorities: () =>{
        return [{id:1,label:'High'},{id:2,label:'Medium'},{id:3,label:'Low'}];
    },
    status: () =>{
        return [{id:1,label:'Open'},{id:2,label:'Close'}];
    },

}
