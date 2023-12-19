import { get, post } from './../Config/config';


export const PreQualifiers = {
    index: (data) => get('/prequalifiers', {params : data}),
    details: (data) => get('/prequalifiers/get-lead', {params : data}),
    accept: (data)=> post('prequalifiers/accept', data),
    reject: (data)=> post('prequalifiers/reject', data),
    report: (data)=> post('prequalifiers/export', data),
    delete: (data) => get('/prequalifiers/delete', {params : data})
}
