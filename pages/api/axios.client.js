import axios from "axios";
const axiosClient=axios.create({
    baseURL:`https://simpuskesmasjungkat.online/api`
});
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization=`Bearer ${token}`
    return config;
});
axiosClient.interceptors.request.use((response)=>{
    return response;
},(error)=>{
    try {
        const {response}=error;
        if(response.status===401){
            console.log(response.status)
            localStorage.removeItem('ACCESS_TOKEN')
        }
    } catch (error) {
        console.log(error)
    }
    throw error;
})
export default axiosClient;
