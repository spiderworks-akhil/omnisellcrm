import { get, post} from './../Config/config';

export const Tax = {
    getFields: (data) => get(`/tax-fields`, {params:data}),
}
