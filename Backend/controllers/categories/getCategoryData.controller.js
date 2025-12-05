import categoryModel from "../../model/category.model.js"


const getCategoryData = async (req, res) => {
    try {

        const data = await categoryModel.find()
        .then((data) => {
            // console.log(data);
            return res.status(200).json({
                message : "Category data fetched successfully",
                error : false,
                success : true,
                data : data
            })
        })

        // console.log(data);
        
        

        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default getCategoryData