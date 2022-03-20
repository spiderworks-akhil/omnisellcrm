import axios from "axios";
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_PATH, // <- ENV variable
});

apiClient.interceptors.request.use((config) => {
        return ({
            ...config,
            headers: {

            },
        })
    },
    error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) => {

        if(response.data.error){
            if(response.data.error === 1001 || response.data.error === 401){
                localStorage.clear();
                window.location.replace(process.env.PUBLIC_URL+'/logout');
            }
        }

        if(typeof(response.data.errors) !== "undefined"){

            if (typeof (response.data.errors.errors) === "object"){
                const errors =  response.data.errors.errors;
                let messages = "";
                Object.keys(errors).map((key) => {
                    messages += errors[key][0]+"\n";
                })
               // notify('error',500,messages)
            }
        }

    },
    async (error) => {
        console.log("Server error : ", error)
        //notify('error',500,'Internal server!')
        return Promise.reject(error.response.data);
    },
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };