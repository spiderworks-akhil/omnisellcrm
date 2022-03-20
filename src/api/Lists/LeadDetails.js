import {LeadTypes} from "../Endpoints/LeadTypes";
import {Leads} from "../Endpoints/Leads";

export const LeadDetails = {

    details: (id) =>{
        return  Leads.getLeadDetails({lead_id:id}).then(response => { return response.data.data; })
    }

}
