import axios from "axios";


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
})
const token = localStorage.getItem('accessToken');

if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}
apiClient.interceptors.request.use((config) => {
        config.params = {
            api_token: localStorage.getItem('accessToken'),
            lead_type_id: localStorage.getItem('leadType'),
            ...config.params,
        };
        return ({
            ...config,
            headers: {
                Authorization : 'Bearer '+localStorage.getItem('accessToken')
            },
        })
    },
    error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
        response,
    async (error) => {

        return Promise.reject(error.response.data);
    },
);


const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
