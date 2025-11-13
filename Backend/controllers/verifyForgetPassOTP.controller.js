import userModel from "../model/user.model.js";

async function verifyOTP (req, res) {
    try {

        if(!req.body){
            return res.status(400).json({
                message : "Provide the email and otp",
                error : true,
                success : false
            })
        }

        //yha pe email automatically fetch hojana chahiye in future

        const {email, otp} = req.body;

        console.log(email, otp);
        

        if(!otp){
            return res.status(400).json({
                message : "Provide the otp",
                error : true,
                success : false
            })
        }


        const user = await userModel.findOne({email : email})

        // iska jarurt nhi hoga future me
        if(!user){
            return res.status(400),json({
                message : "this email is not registered",
                error : true,
                success : false
            })
        }

        if(user.forget_password_expiry < Date.now()){
            return res.status(400).json({
                message : "OTP expired, please try again",
                error : true,
                success : false
            })
        }

        if(otp !== user.forget_password_otp){
            return res.status(400).json({
                message : "Invalid OTP",
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : "OTP verified successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Failed to verifiy the OTP " + error.message || error,
            error : true,
            success : false
        })
    }
}

export default verifyOTP