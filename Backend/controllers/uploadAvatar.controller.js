import userModel from "../model/user.model.js";
import uploadImageCloudinary from "../utils/uploadImage.js";

export async function uploadavatarController(req, res) {
  try {
    const image = req.file;
    // console.log("image", image);

    if (!image) {
      return res.status(400).json({
        message: "Provide the image",
        error: true,
        success: false,
      });
    }

    await uploadImageCloudinary(image)
      .then(async (result) => {
        await userModel.findByIdAndUpdate(req.userID, {
          avatar: result.secure_url,
        });
        return res.status(200).json({
          message: "Avatar uploaded successfully",
          error: false,
          success: true,
          url: result.secure_url,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "failed to upload the avatar" + error.message || error,
          error: true,
          success: false,
        });
      });
    
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload avatar : " + error.message || error,
      error: true,
      success: false,
    });
  }
}
