import { get, post } from './../Config/config';

export const SourceType = {

    all: (data) => get('source-types/all', {params : data}),
    get: (data) => get('source-types', {params : data}),
    getDetails: (data) => get('source-types/get-details', {params : data}),
    add: (data) => post('source-types/store', data),
    update: (data) => post('source-types/update', data),
    remove: (data) => get('source-types/delete', {params : data}),

}
