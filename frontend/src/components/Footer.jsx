import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aut numquam dolore incidunt, omnis in dignissimos odit enim, vel quas sequi amet quam harum eum, et perferendis alias molestiae culpa.</p>
            </div>

            {/* middle */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className='hover:text-shadow-2xs cursor-pointer duration-200' onClick={()=>{navigate(''); scrollTo(0,0);}}>Home</li>
                    <li className='hover:text-shadow-2xs cursor-pointer duration-200' onClick={()=>{navigate('\about'); scrollTo(0,0);}}>About</li>
                    <li className='hover:text-shadow-2xs cursor-pointer duration-200' onClick={()=>{navigate('\contact'); scrollTo(0,0);}}>Contact Us</li>
                    <li className='hover:text-shadow-2xs cursor-pointer duration-200'>Privacy Policy</li>
                </ul>
            </div>


            {/* right */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-8767720529</li>
                    <li>ishwarpatil8767@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* Copyright */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ MufasaCodingCompany - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer