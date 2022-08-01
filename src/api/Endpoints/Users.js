import { get, post } from './../Config/config';


export const Users = {
    me: (data) => get('users/me', {params : data}),
    get: (data) => get('users', {params : data}),
    getByOrganisation: (data) => get('users/search-by-branch', {params : data}),
    getByLeadTypes: (data) => get('users/get-by-lead-type', {params : data}),
    getLogo: (data) => get('organisations/get-logo',{params : data}),
    add: (data) => post('users/store', data),
    update: (data) => post('users/update', data),
    userRoles: (data) => get('users/list-roles', {params : data}),
    searchUserByEmail : (data) => get('users/search-by-mail', {params : data}),
    assignLead : (data) => get('leads/assign-user', {params : data}),
    myActivities : (data) => get('leads/my-activities', {params : data}),
    getOrganisations: (data) => get('users/get-organisations', {params : data}),
    getLeadTypeOrganisations: (data) => get('users/get-lead-types-by-organisations', {params : data}),
    sendMessage: (data) => get('users/send-message'),
}
