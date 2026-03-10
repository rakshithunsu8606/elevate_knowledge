import axios from "axios";
import { BASE_URL } from "./url";

export const axiosinstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true
});

// Add a request interceptor
axiosinstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("Request:", config);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
    { synchronous: true, runWhen: () => [] }
);

// Add a response interceptor
axiosinstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log("Response:", response);
    return response;
},async  function onRejected(error) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log(error);

    if (error.response && error.response.status === 401) {
        const response=await axios.post(BASE_URL + 'user/gentarateNewToken',{},{withCredentials:true})

        console.log(response);

        return axiosinstance(error.config)
        
    }

    return Promise.reject(error);
});

// export default axiosinstance; 