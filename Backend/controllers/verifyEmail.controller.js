import userModel from "../model/user.model.js";

export const verifyemailController = async (req, res) => {
  try {
    
    if(!req.query.code){
        return res.status(400).json({
            message : "verification code not found",
            error : true,
            success : false
        })
    }
    const code = req.query.code;

    const user = await userModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updatedUser = await userModel.updateOne({_id : code},{
        verify_email : true
    })

    return res.status(200).json({
        message : "Email verified successfully",
        error : false,
        success : true
    })

  } catch (error) {
    return res.status(500).json({
      message: "Server error  " + error.message || error,
      error: true,
      success: false,
    });
  }
};
