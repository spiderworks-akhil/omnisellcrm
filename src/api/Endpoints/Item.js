import { get, post } from './../Config/config';

export const Item = {

    get: (data) => get('items', {params : data}),
    getDetails: (data) => get('items/view', {params : data}),
    add: (data) => post('items/store', data),
    update: (data) => post('items/update', data),
    remove: (data) => get('items/delete', {params : data}),

}
