import { get, post } from './../Config/config';

export const Requirement = {

    get: (data) => get('requirements', {params : data}),
    getDetails: (data) => get('requirements/get-requirement', {params : data}),
    add: (data) => post('requirements/store', data),
    update: (data) => post('requirements/update', data),
    remove: (data) => get('requirements/delete', {params : data}),

}
