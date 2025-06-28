import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const {token,setToken, backendUrl} = useContext(AppContext);
  useEffect(() => {
    if (token) {
      navigate('/my-profile');
    }
  }, [token, navigate]);


  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const action = state === "Sign Up"? "register": "login";
      const {data} = await axios.post(backendUrl + "/api/user/" + action, {name,email,password});
      // console.log(data);
      if(data.success){
        toast((state === "Sign Up"? "Registered":"Logged In") + " Successfully");
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  }

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-extrabold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "Create Account" : "Login"} to book appointment</p>
        { state === "Sign Up" ?
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)}  value={name} required/>
            </div>:
            ""
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)}  value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)}  value={password} required/>
        </div>

        <button onClick={(e) => onSubmitHandler(e)} className='bg-[var(--primary)] text-white w-full py-2 rounded-md text-base]'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state=== "Sign Up" ? 
          <div>Already have an account? <span onClick={()=>setState("Login")} className='text-[#5F6FFF] underline cursor-pointer'>Login here</span></div> : 
          <div>Create an new account? <span onClick={()=>setState("Sign Up")} className='text-[#5F6FFF] underline cursor-pointer'>Click here</span></div>
        }
      </div>
    </form>
  )
}

export default Login