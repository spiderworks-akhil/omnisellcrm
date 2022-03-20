import { get, post, put, destroy } from './../Config/config';

let lead = {
    lead_types_id : '',
    name : '',
    title : '',
    company_name : '',
    address : '',
    secondary_phone_number : '',
    email : '',
    phone_number : '',
    requirement : '',
    location : '',
    pincode : '',
    detailed_requirement : '',
    departments: '',
    shipping_from_id: '',
    shipping_to_id: ''
}

export const Leads = {
    index: (data) => get('/leads', {params : data}),
    getLeadDetails: (data) => get('/leads/get-lead', {params : data}),
    getUnassignedLeads: (data)=> get('leads/unassigned-leads', {params : data}),
    getMyLeads: (data)=> get('leads/my-leads', {params : data}),
    getBookmarkedeLeads: (data)=> get('leads/my-favourite-leads', {params : data}),
    getActivitiesOfLeads: (data) => get('leads/activities', {params : data}),

    storeLead: (data) => post('leads/store', data),
    updateLead: (data) => post('leads/update', data),

    getCallLogsOFLeads: (data) => get('call-logs', {params : data}),
    getCallLogDetails: (data) => get('call-logs/get-call-log', {params : data}),
    addCallLogToLead: (data) => post('call-logs/store', data),
    updateCallLogDetails: (data) => post('call-logs/update', data),
    removeCallLog: (data) => get('call-logs/delete', {params : data}),

    getRequirementOFLeads: (data) => get('requirements', {params : data}),
    getRequirementDetails: (data) => get('requirements/get-requirement', {params : data}),
    addRequirementToLead: (data) => post('requirements/store', data),
    updateRequirementDetails: (data) => post('requirements/update', data),
    removeRequirement: (data) => get('requirements/delete', {params : data}),


}
