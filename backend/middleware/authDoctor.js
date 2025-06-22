import jwt from 'jsonwebtoken'
import { ApiResponse } from '../utils/ApiResponse.js'

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    const { dtoken } = req.headers
    if (!dtoken) {
        return res.json(new ApiResponse(401, null, "Unauthorised, Login Again"))
    }
    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        if (req.body.docId != token_decode.id){
            return res.json(new ApiResponse(401, null, "Unauthorised, Login Again"))
        }

        next()
    } catch (error) {
        console.log(error)
        res.json(new ApiResponse(400,null,"Something Went erong While Authorising"))
    }
}

export default authDoctor;