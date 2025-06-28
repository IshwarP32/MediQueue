import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailability = asyncHandler(async (req, res) => {
    let docId = req.docId;
    if (docId == null) {
        docId = req.body.docId;
    }

    const doctor = await doctorModel.findById(docId).select("-password -email");
    if (!doctor) {
        return res.status(404).json(new ApiResponse(404, null, "Doctor not found"));
    }
    await doctorModel.findByIdAndUpdate(docId, { available: !doctor.available });

    res.status(200).json(new ApiResponse(200, null, `Availability changed to ${!doctor.available} successfully`));
});

const doctorList = asyncHandler(async (req, res) => {

    const doctors = await doctorModel.find({}).select("-email -password");
    return res.status(200).json(new ApiResponse(200, doctors, "Success"));
})
//APi for Doctor Login 

const loginDoctor = asyncHandler(async(req,res) => {
    const {email , password } = req.body;
    const doctor = await doctorModel.findOne({email});
    if(!doctor){
        return res.status(404).json(new ApiResponse(404,null,"Doctor Not Found"));
    }
    //verify password
    const isMatch = await bcrypt.compare(password,doctor.password)
    if(!isMatch){
        return res.status(401).json(new ApiResponse(401,null,"Invalid Credentials"));
    }
    const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
    res.status(202).json(new ApiResponse(202,token,"Login Successfull"))
})

// Api to get doctor appointments for doctor panel
const appointmentsDoctor = asyncHandler(async (req,res)=>{
    const docId  = req.docId;
    const appointments = await appointmentModel.find({docId});

    return res.status(200).json(new ApiResponse(200,appointments,"Success"));
})

//API to mark appointment complete
const appointmentComplete = asyncHandler(async(req,res)=>{
    const {appointmentId} = req.body;
    const docId  = req.docId;

    const appointment = await appointmentModel.findById(appointmentId);

    if(appointment && appointment.docId === docId){
        appointment.isCompleted = true;
        await appointment.save();
        return res.status(200).json(new ApiResponse(200, null, "Marked Complete"));
    }
    return res.status(400).json(new ApiResponse(400, null, "Appointment do not exist or Unauthorised"));
})

// API to cancel appointment for doctor panel
const appointmentCancel = asyncHandler(async (req, res) => {
    const {appointmentId } = req.body
    const docId  = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {
        appointmentData.cancelled = true;
        appointmentData.save();
        return res.json(new ApiResponse(200,null,"Appintment Cancelled Successfully"))
    }
    return res.status(400).json(new ApiResponse(400, null, "Appointment do not exist or Unauthorised"));
});

// API to get doctor dashboard data
const doctorDashboard = asyncHandler(async (req,res)=>{
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId })
    let earnings = 0
    appointments.map((item) => {
        if (item.isCompleted || item.payment) {
            earnings += item.amount
        }
    })
    let patients = []
    appointments.map((item) => {
        if (!patients.includes(item.userId)) {
            patients.push(item.userId)
        }
    })

    const dashData = {
        earnings,
        appointments:appointments.length,
        patients:patients.length,
        latestAppointments: appointments.reverse()
    }
    
    res.status(200).json(new ApiResponse(200,dashData,"Success"))
})

const doctorProfile = asyncHandler(async(req,res)=>{
    const docId  = req.docId;
    const doctor = await doctorModel.findById(docId).select("-password");
    return res.status(200).json(new ApiResponse(200, doctor, "Success"))
})

// API to update doctor profile
const updateDoctorProfile = asyncHandler(async (req,res)=>{
    const { fees, address, available } = req.body
    const docId  = req.docId;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
    res.status(200).json(new ApiResponse(200,null,"Doctor profile updated successfully"));
})

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete,
    appointmentCancel,doctorDashboard, updateDoctorProfile, doctorProfile }