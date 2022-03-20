import { get, post, put, destroy } from './../Config/config';

export const Auth = {
    login: (data) =>
        post('/login', data),
    register: (id) =>
        get(`/login/${id}`),
    me: () =>
        get(`/users/me`)
}
