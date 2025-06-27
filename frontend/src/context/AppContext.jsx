import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const currencySymbol = "$"
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [profilePic, setProfilePic] = useState();

    const  getDoctorData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/list");
            if(data.success){
                setDoctors(data.data);
            }
        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(()=>{
        getDoctorData();
    },[])
    
    const value={
        doctors,getDoctorData,currencySymbol,token,setToken,backendUrl,profilePic,setProfilePic,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;