import { get, post } from './../Config/config';


export const Statitics = {
    mine: (data) => get('leads/my-statistics', {params : data}),
}