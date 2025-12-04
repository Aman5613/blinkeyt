import userModel from "../../model/user.model.js";

const getuserDetail = async (request, response) => {
  try {
    const userID = request.userID;

    const user = await userModel
      .findById(userID)
      .select("-password -refresh_token");

    return response.status(200).json({
      message: "User detail detched successfully",
      error: false,
      success: true,
      user: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

export default getuserDetail;
