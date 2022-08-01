import { get, post } from './../Config/config';


export const Labels = {
    get: (data) => get('labels', {params : data}),
    getLabelsByLeadType: (data) => get('labels/by-lead-type', {params : data}),
    addToLead: (data) => post('labels/store',data),
    removeFromLead: (data) => get('labels/delete', {params : data}),
    getLabelsByLeadID: (data) => get('leads/get-labels', {params : data}),
    getLeadsByLabelId: (data) => get('leads/by-labels', {params : data}),

}
