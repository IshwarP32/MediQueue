import express from "express"
import { addDoctor,clearDoctorDatabase,allDoctors,loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard, seedSampleDoctors, clearAppointmentDatabase, clearUserDatabase} from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post("/login",upload.none(),loginAdmin);

//secure Routes
adminRouter.post("/add-doctor",authAdmin,upload.single("image"),addDoctor);
adminRouter.post("/clear-doctor-db",authAdmin,clearDoctorDatabase);
adminRouter.post("/clear-appointment-db",authAdmin,clearAppointmentDatabase);
adminRouter.post("/clear-user-db",authAdmin,clearUserDatabase);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availability",authAdmin,changeAvailability);
adminRouter.get("/appointments",authAdmin,appointmentsAdmin);
adminRouter.post("/cancel-appointment",authAdmin,appointmentCancel);
adminRouter.get("/dashboard",authAdmin,adminDashboard);
adminRouter.post("/seed",authAdmin,seedSampleDoctors);


export default adminRouter;