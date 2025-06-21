import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//admin authentication middleware
const authAdmin = asyncHandler((req,res,next)=>{
    const {atoken}= req.headers;
    if (!atoken){
        return res.status(401).json(new ApiResponse(401,null,"Not authorised, Login Again"))
    }
    try {
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET);
        //verify
        if(token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json(new ApiResponse(401,null,"Not authorised, Admin rights required for this operation"))
        }
        next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(401,null,"Invalid JWT"));
    }
})

export default authAdmin;