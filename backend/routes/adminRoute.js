import express from "express"
import { addDoctor,clearDatabase,allDoctors,loginAdmin} from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin,upload.single("image"),addDoctor);
adminRouter.post("/login",upload.none(),loginAdmin);
adminRouter.post("/clear-db",authAdmin,clearDatabase);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availability",authAdmin,changeAvailability);

export default adminRouter;