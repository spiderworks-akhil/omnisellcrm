import { get, post } from './../Config/config';


export const Users = {
    get: (data) => get('users', {params : data}),
}
