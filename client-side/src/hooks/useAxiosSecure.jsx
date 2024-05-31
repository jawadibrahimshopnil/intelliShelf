import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../routers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://intellishelf-server.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const {logOutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        }, error =>{
            console.log(error.response);
            if(error.response.status === 401 || error.response.status === 403){
                logOutUser()
                .then(()=>{
                    navigate('/login')
                })
                .catch(err => console.log(err))
            }
        })
    }, [])
    return axiosSecure;
};

export default useAxiosSecure;