import { get, post, put, destroy } from './../Config/config';

export const Leads = {
    index: (data) => get('/leads', {params: data}),
    getLeadDetails: (data) => get('/leads/get-lead', {params: data}),
    getUnassignedLeads: (data) => get('leads/unassigned-leads', {params: data}),
    getMyLeads: (data) => get('leads/my-leads', {params: data}),
    getBookmarkedeLeads: (data) => get('leads/my-favourite-leads', {params: data}),
    getActivitiesOfLeads: (data) => get('leads/activities', {params: data}),
    filter: (data) => post('leads/filter', data),
    myLeads: (data) => get('leads/my-created-leads', {params : data}),
    leadsAssignedToMe: (data) => get('leads/my-leads', {params : data}),
    closedLeads: (data) => get('leads/closed-leads', {params : data}),


    storeLead: (data) => post('leads/store', data),
    updateLead: (data) => post('leads/update', data),

    getRequirementOFLeads: (data) => get('requirements', {params: data}),
    getRequirementDetails: (data) => get('requirements/get-requirement', {params: data}),
    addRequirementToLead: (data) => post('requirements/store', data),
    updateRequirementDetails: (data) => post('requirements/update', data),
    removeRequirement: (data) => get('requirements/delete', {params: data}),


    getFollowUpOFLeads: (data) => get('leads/follow-up', {params: data}),
 }
