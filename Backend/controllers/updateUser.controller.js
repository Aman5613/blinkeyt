import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js"

export async function updateuserController(req, res) {
    try {
        if(!req.body){
            res.status(400).json({
                message : "Provide the data",
                error : true,
                success : false
            })
        }
        const {name, email, password, mobile} = req.body

        const hashPassword = "";

        if(password){
            const salt = bcrypt.genSalt(10);
            hashPassword = bcrypt.hash(password, salt)
        }

        const updateUser = await userModel.updateOne({_id : req.userID},{
            ...(name && {name : name}),
            ...( email && { email : email}),
            ...(mobile && { mobile : mobile}),
            ...(password && { password : hashPassword})
        })

        return res.status(200).json({
            message : "User updated successfully",
            error : false,
            success : true,
            data : updateUser
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Failed to updated the user details " + error.message || error,
            error : true,
            success : false
        })
    }
}