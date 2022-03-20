import { get, post, put, destroy } from './../Config/config';

export const LeadTypes = {
    index: () =>
        get('/lead-types'),
}
