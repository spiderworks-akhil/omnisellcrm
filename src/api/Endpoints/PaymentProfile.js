import { get, post } from './../Config/config';

export const PaymentProfile = {

    get: (data) => get('payment-profile', {params : data}),
    getByLead: (data) => get('payment-profile/get-lead', {params : data}),
    getDetails: (data) => get('payment-profile/get-payment-profile', {params : data}),
    add: (data) => post('payment-profile/store', data),
    update: (data) => post('payment-profile/update', data),
    remove: (data) => get('payment-profile/delete', {params : data}),

}
