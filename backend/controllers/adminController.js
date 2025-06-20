import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// API for adding doctor
const addDoctor = asyncHandler((req,res)=>{
    const {name,
           email,
           password,
           speciality,
           degree,
           experience,
           about,
           fees,
           address
        } = req.body;
        res.status(200).json(new ApiResponse(200, {name,email}, "asyncHandler Working"))
})

export {addDoctor};