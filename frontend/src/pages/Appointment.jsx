import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
    const {docId} = useParams();
    const {doctors,currencySymbol} = useContext(AppContext);
    
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo ] = useState();
    const [docSlots, setDocSlots]= useState([]);
    const [slotIndex, setDocSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    
    useEffect(()=>{
        const getAvailableSlots = async ()=>{
            setDocSlots([]);
            let tempSlots = [];
            let today = new Date();
            for(let i=0 ;i<7 ;i++){
                let currentDate = new Date(today);
                currentDate.setDate(today.getDate()+i);

                //setting endtime of the date with index
                let endTime = new Date();
                endTime.setDate(today.getDate()+i);
                endTime.setHours(21,0,0,0)

                if(i===0){
                    // setting starting slot hours to currentHour + 1 for present date else it will be 10
                    currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1: 10);
                    currentDate.setMinutes(currentDate.getMinutes()>30 ? 30: 0);
                } else{
                    currentDate.setHours(10);
                    currentDate.setMinutes(0);
                }

                let timeSlots = [];

                while(currentDate < endTime){
                    let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})

                    timeSlots.push({
                        datetime : new Date(currentDate),
                        time:formattedTime
                    })

                    //Increment current time by 30 min
                    currentDate.setMinutes(currentDate.getMinutes()+30);
                }
                tempSlots.push(timeSlots);
            }
            setDocSlots(tempSlots);
        };
        getAvailableSlots();
    },[docInfo])

    useEffect(() => {
        const fetchInfo = async () => {
            if (!Array.isArray(doctors)) return;

            const docInfo = doctors.find(doc => doc._id === docId);
            setDocInfo(docInfo);
        };
        
        fetchInfo();
    }, [docId, doctors]);

    // useEffect(()=>{
    //     console.log(docSlots);
    // },docSlots?._id)
    
    return docInfo && (
        <div>
            {/* Doctor details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    {/* image */}
                    <img className='bg-[#5F6FFF]/90 w-full sm:max-w-72 rounded-lg ' src={docInfo.image} alt="" />
                </div>
                <div className='flex flex-1 flex-col border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* info */}
                    <h1 className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></h1>

                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <h2>{docInfo.degree} -  {docInfo.speciality}</h2>
                        <h3 className='border border-gray-900 rounded-full px-2 py-0.5 text-nowrap'>{docInfo.experience}</h3>
                    </div>

                    <div>
                        <h3 className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></h3>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <h1 className='text-gray-500 font-medium mt-4'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></h1>
                </div>
            </div>

            {/* Booking */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item,index)=>(
                        <div onClick={()=> setDocSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-[#5f6fff] text-white":"border border-gray-300"}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                {/* time slots */}
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                        <div onClick={()=> setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-[#5f6fff] text-white":"border border-gray-300"}`}>
                            {item.time.toLowerCase()}
                        </div>
                    ))}
                </div>

                {/* button */}
                <button className='bg-[var(--primary)] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer hover:bg-[#444a7d] duration-200'>Book an Appointment</button>
            </div>
            
            <RelatedDoctors speciality={docInfo.speciality} docId={docId}/>
        </div>
    )
}

export default Appointment