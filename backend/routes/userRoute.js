import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, startPayment, completePayment} from '../controllers/userController.js'
// import { paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', authUser,upload.single("image"), updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/pay/getAmount', authUser, startPayment)
userRouter.post('/pay/success', authUser, completePayment)
// userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
// userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default userRouter