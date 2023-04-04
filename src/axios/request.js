import axios from "axios";
import router from "@/router";

const requestAxios = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null,function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 404) {

        router.push('/auth?message=auth')
    }
    return Promise.reject(error);
});

export default requestAxios