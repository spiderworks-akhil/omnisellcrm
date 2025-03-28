import { get, post, put, destroy } from './../Config/config';
import axios from "axios";


const googleInstance = axios.create({
    baseURL: 'https://oauth2.googleapis.com'
});
googleInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('google-token-code')}`;
let data = {
    client_id: '72617630398-r0mh7q0cgef7oghpe6r9ulch4tjdkch6.apps.googleusercontent.com',
    client_secret:'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',
    redirect_uri:'http://localhost:3000/dashboard/settings',
    code : localStorage.getItem('google-token-code'),
    grant_type:'authorization_code'
}
export const Auth = {
    login: (data) => post('/login?portal=admin', data),
    register: (id) => get(`/login/${id}`),
    me: () => get(`/users/me`),
    sendOtp: (data) => post(`forgot-password`, data),
    verifyNewPassword: (data) => post(`forgot-password-save`, data),
    registerToken: (data) => post('register-token',data),

    getCalenderList: () => googleInstance.get('/calendar/v3/users/me/calendarList'),
    getAccessTokens: () => googleInstance.post('/token',data)
}

