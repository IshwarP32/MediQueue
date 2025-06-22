import doctorModel from "../models/doctorModel.js";

const changeAvailability = asyncHandler(async (req, res) => {
  const { docId} = req.body;

  const doctor = await doctorModel.findById(docId).select("-password -email");
  if (!doctor) {
    return res.status(404).json(new ApiResponse(404, null, "Doctor not found"));
  }
  await doctorModel.findByIdAndUpdate(docId, {available: !doctor.available});

  res.status(200).json(new ApiResponse(200, null, `Availability changed to ${!doctor.available} successfully`));
});

const doctorList = async (req, res) => {
    try {
        const doctor = await doctorModel.find({}).select('-password -email')

        res.json({success:true, doctor})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})     
    }
}

export {changeAvailability, doctorList}