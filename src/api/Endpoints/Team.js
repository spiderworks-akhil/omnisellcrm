import { get, post} from './../Config/config';

export const Team = {
    get: (data) => get(`/lead-teams`, {params:data}),
    add: (data) => post('/lead-teams/store', data),
    getDetails: (data) => get(`/lead-teams/get-lead-team`, {params:data}),
    update: (data) => post(`/lead-teams/update`,data),
    remove: (data) => get(`/lead-teams/delete`,{params:data})
}
