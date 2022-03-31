import { get, post } from './../Config/config';


export const CallLogs = {
    get: (data) => get('call-logs', {params : data}),
    getDetails: (data) => get('call-logs/get-call-log', {params : data}),
    add: (data) => post('call-logs/store', data),
    update: (data) => post('call-logs/update', data),
    remove: (data) => get('call-logs/delete', {params : data}),
}
