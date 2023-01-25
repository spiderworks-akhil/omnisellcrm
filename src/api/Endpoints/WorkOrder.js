import { get, post } from './../Config/config';

export const WorkOrder = {

    get: (data) => get('work-orders', {params : data}),
    getByLead: (data) => get('work-orders', {params : data}),
    getDetails: (data) => get('work-orders/get-work-orders', {params : data}),
    add: (data) => post('work-orders/store', data),
    update: (data) => post('work-orders/update', data),
    remove: (data) => get('work-orders/delete', {params : data}),

}
