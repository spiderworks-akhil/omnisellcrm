import { get, post } from './../Config/config';

export const Referral = {

    all: (data) => get('referral/all', {params : data}),
    get: (data) => get('referral', {params : data}),
    getDetails: (data) => get('referral/get-details', {params : data}),
    add: (data) => post('referral/store', data),
    update: (data) => post('referral/update', data),
    remove: (data) => get('referral/delete', {params : data}),

}
