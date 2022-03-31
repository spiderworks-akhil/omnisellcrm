import { get, post } from './../Config/config';


export const Stages = {
    get: (data) => get('stages', {params : data}),
    getStagesOfLeads: (data) => get('leads/get-stages', {params : data}),
    changeLeadStage: (data) => post('leads/change-stage', data)
}
