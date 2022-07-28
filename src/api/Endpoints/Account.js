import { get, post} from './../Config/config';

export const Account = {
    get: (data) => get(`/accounts`, {params:data}),
    add: (data) => post('/accounts/store', data),
    update: (data) => post(`/accounts/update`,data),
    search: () => get(`/accounts/search`),
    getDetails: (data) => get(`/accounts/get-account`, {params:data})
}
