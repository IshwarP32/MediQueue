import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding doctor
const addDoctor = asyncHandler(async (req,res)=>{
    const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
    const imageFile = req.file;
    
    //check validity of data
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
        return res.status(400).json(new ApiResponse(400,null,"Missing Details"))
    }
    
    if(!validator.isEmail(email)){
        return res.status(400).json(new ApiResponse(400,null,"Please Enter a valid email"))
    }
    
    if(password.length < 8){
        return res.status(400).json(new ApiResponse(400,null,"Password length shall be greater than 7"))
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
    const imageUrl = imageUpload.secure_url;

    try {
        const doctorData = {
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date:Date.now()
        }
    
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
    
        res.status(201).json(new ApiResponse(201,newDoctor._id,`${name} has been registered as doctor successfully !`));
    } catch (error) {
        console.log("Doctor Creation Failed");
        if(imageUpload) await deleteFromCloudinary(imageUpload.public_id); //if anything goes wrong delete uploaded image
        res.status(500).json(new ApiResponse(501,error,));
    }
})

// API for admin login
const loginAdmin = asyncHandler(async(req,res)=>{
    // console.log(req.body);
    
    const {email,password} = req.body;
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
        return res.status(401).json(new ApiResponse(401,null,"Invalid Admin Credentials !"));
    }
    const token = jwt.sign(email+password,process.env.JWT_SECRET);
    res.status(202).json(new ApiResponse(202,token,"Admin Login Succesfull"));
})

// API to clear DB
const clearDatabase = asyncHandler(async (req, res) => {
  const pipeline = [
    { $project: { _id: 1 } }
  ];

  const idList = await doctorModel.aggregate(pipeline);

  for (const { _id } of idList) {
    try {
      const doctor = await doctorModel.findById(_id);

      if (!doctor) continue;

      const imageUrl = doctor.image;
      const parts = imageUrl.split("/");
      const publicIdWithExtension = parts[parts.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
      await doctorModel.findByIdAndDelete(_id);
    } catch (error) {
      console.error("Failed to delete:", error.message);
    }
  }

  res.status(200).json(new ApiResponse(200, null, "Database cleared successfully"));
});

// API to get all doctors in admin panel
const allDoctors = asyncHandler(async (req, res) => {
  const doctors = await doctorModel.find({}).select("-password");

  res.status(200).json(new ApiResponse(200, doctors, "List Generated Successfully"));
});

// API to get all appointments
const appointmentsAdmin = asyncHandler(async (req,res)=>{
  const appointments = await appointmentModel.find({});
  res.status(200).json(new ApiResponse(200, appointments, "Success"));
})

//API to cancel Appointment
const appointmentCancel = asyncHandler(async(req,res)=>{
  const {appointmentId} =req.body;
  await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true});
  return res.status(200).json(new ApiResponse(200, null, "Appointment Cancelled Succesfully"))
})

// API to get dashboard data for admin panel
const adminDashboard = asyncHandler(async (req, res) => {
  const appointments = await appointmentModel.find({});

  // Count doctors and patients using aggregation
  const doctorCountResult = await doctorModel.aggregate([{ $count: "myCount" }]);
  const patientCountResult = await userModel.aggregate([{ $count: "myCount" }]);

  const dashData = {
    doctors: doctorCountResult[0]?.myCount || 0,
    appointments: appointments.length,
    patients: patientCountResult[0]?.myCount || 0,
    latestAppointments: appointments.reverse().slice(0, 5)
  };

  res.status(200).json(new ApiResponse(200, dashData, "Success"));
});


export {addDoctor, loginAdmin, clearDatabase, allDoctors,appointmentsAdmin,appointmentCancel, adminDashboard};