import { get, post } from './../Config/config';


export const Country = {
    get: (data) => get('countries', {params : data}),
    getTaxGroups: (data) => get('tax-groups', {params : data}),
}
