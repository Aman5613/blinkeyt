import categoryModel from "../../model/category.model.js";

const updateCategory = async (req, res) => {
  try {
    const { id, name, image } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
        success: false,
        error: true,
      });
    }

    await categoryModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          image,
        },
        {
          new: true,
          
        }
      )
      .then((data) => {
        return res.status(200).json({
          message: "Category updated successfully",
          success: true,
          error: false,
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unable to update category " + err.message,
          success: false,
          error: true,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default updateCategory;
