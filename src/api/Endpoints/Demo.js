import { get, post } from './../Config/config';

export const Demo = {

    all: (data) => get('demo/all', {params : data}),
    get: (data) => get('demo', {params : data}),
    getDetails: (data) => get('demo/get-details', {params : data}),
    add: (data) => post('demo/store', data),
    update: (data) => post('demo/update', data),
    remove: (data) => get('demo/delete', {params : data}),

}
