import doctorModel from "../models/doctorModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const changeAvailability = asyncHandler(async (req, res) => {
    const { docId } = req.body;

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

export { changeAvailability, doctorList }