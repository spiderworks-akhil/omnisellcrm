import {format} from "date-fns";

export const FormHelpers = {
    formatTolaravelDateTime: (time) => {
        return format(new Date(time), 'yyyy-MM-dd h:mm:ss')
    },
}
