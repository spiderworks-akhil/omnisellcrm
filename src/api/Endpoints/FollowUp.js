import { get, post } from './../Config/config';

export const FollowUp = {
    all: (data) => get('follow-up/all', {params : data}),
    get: (data) => get('follow-up', {params : data}),
    getDetails: (data) => get('follow-up/get-details', {params : data}),
    add: (data) => post('follow-up/store', data),
    update: (data) => post('follow-up/update', data),
    remove: (data) => get('follow-up/delete', {params : data}),
    types: (data) => get('follow-up/get-types'),
    subTypes: (data) => get('follow-up/get-sub-types'),
    reschedule : (data) => get('follow-up/reschedule', {params : data}),
}
