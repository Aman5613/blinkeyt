import sendEmail from "../config/sendEmail.js"
import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs"
import generateVerificationEmail from "../utils/verifyEmail.template.js"

async function registeruserController (req, res) {
    try {
        if(!req.body){
            return res.status(400).json({
                message : "No data found"
            })
        }
        const { name, email, password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json({
                message : "All fields are required",
                error : true,
                success : false
            })
        }

        // checking user is already registerd or not
        if(await userModel.findOne({email})){
            return res.status(500).json({
                message : "this email is already registerd",
                error : true,
                success : false
            })
        }

        // encrypting thepassword
        const salt = await bcrypt.genSalt(10);
        const hashPassword  = await bcrypt.hash(password, salt);

        // payload 
        const payload = {
            name,
            email,
            password : hashPassword
        }

        const user = new userModel(payload)
        user.save();

        
        // for verifying the email address

        // const verifyemailURL = `${process.env.FRONTEND_URL}/verify-email?code=${user?._id}`

        // sendEmail({
        //     sendTo : email,
        //     subject : "Verification Email",
        //     htmlTemplate : generateVerificationEmail({
        //         name,
        //         url : verifyemailURL
        //     })
        // })


        return res.status(200).json({
            message : "user registered successfully",
            success : true,
            error : false,
            user : user
        })

    } catch (error) {
        return res.status(500).json({
            message : "Server error, try after sometime" +  error ,
            error : true,
            success: false,
        })
    }
}

export default registeruserController;