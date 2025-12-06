import categoryModel from "../../model/category.model.js";


const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res.status(400).json({
        message: "Category id is required",
        error: true,
        success: false,
      });

    await categoryModel.findByIdAndDelete(id).then(() => {
        return res.status(200).json({
            message: "category deleted successfully",
            error: false,
            success: true,
        })
    }).catch((err) => {
        return res.status(500).json({
            message: err.message || "Error in deleting category",
            error: true,
            success: false,
        })
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error in deleting",
      error: true,
      success: false,
    });
  }
};


export default deleteCategoryController;