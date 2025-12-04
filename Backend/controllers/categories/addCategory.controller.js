import categoryModel from "../../model/category.model.js";

const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const category = new categoryModel({
      name,
      image,
    });
    const savedCategory = await category.save();

    console.log("Saved Category:", savedCategory);

    if(!savedCategory){
        return res.status(500).json({
            message: "Failed to add category",
            error: true,
            success: false,
        })
    }

    return res.status(201).json({
      message: "Category added successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error in adding category " + error.message || error,
      error: true,
      success: false,
    });
  }
};


export default AddCategoryController;