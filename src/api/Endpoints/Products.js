import { get, post } from './../Config/config';

export const Products = {

    get: (data) => get('products', {params : data}),
    getDetails: (data) => get('products/get-requirement', {params : data}),
    add: (data) => post('products/store', data),
    update: (data) => post('products/update', data),
    remove: (data) => get('products/delete', {params : data}),

}
