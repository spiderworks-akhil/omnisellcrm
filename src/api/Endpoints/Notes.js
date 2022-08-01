import { get, post } from './../Config/config';

export const Note = {

    get: (data) => get('notes', {params : data}),
    getDetails: (data) => get('notes/get-note', {params : data}),
    add: (data) => post('notes/store', data),
    update: (data) => post('notes/update', data),
    remove: (data) => get('notes/delete', {params : data}),

}
