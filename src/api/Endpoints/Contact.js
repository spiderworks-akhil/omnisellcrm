import { get, post } from './../Config/config';


export const Contacts = {
    getDetails: (data) => get('contacts/get-contact', {params : data}),
    add: (data) => post('contacts/store', data),
    update: (data) => post('contacts/update', data),
    remove: (data) => get('contacts/delete', {params : data}),
}
