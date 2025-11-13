import bcryptjs from "bcryptjs";
import userModel from "../model/user.model.js";

const resetPassword = async (req, res) => {

    try {

        if(!req.body){
            return res.status(400).json({
                message : "Provide the email and new password",
                error : true,
                success : false
            })
        }

        const {email, newPassword, confirmnewPassword} = req.body;

        if(!email || !newPassword || !confirmnewPassword){
            return res.status(400).json({
                message : "Provide all the fields",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmnewPassword){
            return res.status(400).json({
                message : "New password and confirm new password do not match",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({email : email});

        if(!user){
            return res.status(400).json({
                message : "User not found",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmnewPassword){
            return res.status(400).json({
                message : "New password and confirm new password do not match",
                error : true,
                success : false
            })
        }

        const samePass = bcryptjs.compare(newPassword, user.password)

        if(!samePass){
            return res.status(400).json({
                message : "New password cannot be same as old password",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message : "Password reset successfully",
            error : false,
            success : true
        })

        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error " + error.message || error,
            error : true,
            success : false
        })
    }

}


export default resetPassword