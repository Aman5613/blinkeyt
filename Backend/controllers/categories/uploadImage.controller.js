import uploadImageCloudinary from "../../utils/uploadImage.js";
import categoryModel from "../../model/category.model.js"

const uploadImageController = async (req, res) => {
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
        await categoryModel.findByIdAndUpdate(req.userID, {
          image: result.secure_url,
        });
        return res.status(200).json({
          message: "Image uploaded successfully",
          error: false,
          success: true,
          url: result.secure_url,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "failed to upload the image" + error.message || error,
          error: true,
          success: false,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server Error in uploading category image" + error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
