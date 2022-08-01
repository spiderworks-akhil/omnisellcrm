import { get, post } from './../Config/config';


export const MissedCalls = {
    get: (data) => get('missed-calls', {params : data}),
    getByStatus: (data) => get('missed-calls/by-status', {params : data}),
    changeStatus: (data) => post('missed-calls/change-status',data),
    remove:  (data) => get('missed-calls/delete', {params : data}),
}
