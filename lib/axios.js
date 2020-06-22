import axios from 'axios';

// const protocol = window.location.protocol
// const host = window.location.host
export const BASE_URL = 'https://piloto-druid-spsa.appspot.com/'


const instance = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com/'
    baseURL: BASE_URL
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log('AXIOS - REQUEST: OK')
    return config;
}, (error) => {
    console.log('AXIOS - REQUEST: ERROR')
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Do something with response data
    let { data=null, status} = response
    let success = false
    if (status == 200) {
        success = true
    }
    console.log('AXIOS - RESPONSE: OK', response)

    return {content: data, status, success}
}, (error) => {
    // Do something with response error
    let err = {
        content: error.message,
        status: error.response.status,
        success: false,
    }
    console.log('AXIOS - RESPONSE: ERROR', error)
    return Promise.reject(err);
});

export default instance;