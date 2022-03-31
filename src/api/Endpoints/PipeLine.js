import { get, post } from './../Config/config';


export const PipeLine = {
    get: (data) => get('pipelines', {params : data}),
}
