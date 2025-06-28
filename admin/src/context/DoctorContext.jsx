import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
export const DoctorContext = createContext();
import { toast } from "react-toastify";
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const getAppointments = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments",{},
        { headers: { "dtoken":dToken } }
      );
      if (data.success) {
        setAppointments(data.data);
        // toast.success("Appointments Loaded")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { "dtoken":dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/dashboard",{}, {
        headers: { "dtoken":dToken },
      });
     
      if (data.success) {
        setDashData(data.data);
        // toast.success("Dashboard Loaded");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { "dtoken":dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getProfileData = async () => {
    try {
        const {data}=await axios.post(backendUrl+'/api/doctor/profile',{},{headers:{"dtoken":dToken}})
        if(data.success){
            setProfileData(data.data)
            // toast.success("Profile Loaded Successfully")
        }
        else{
            toast.error(data.message)
        }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    profileData,setProfileData,getProfileData,getDashData
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
