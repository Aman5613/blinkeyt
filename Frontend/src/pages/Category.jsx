import { useEffect, useState } from "react";
import { lazy } from "react";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import toast from "react-hot-toast";

// lazy load UploadCategoryModel component
const UploadCategoryModel = lazy(() => import("../components/UploadCategoryModel"));
const DeleteConfirmModel = lazy(() => import("../components/DeleteConfirmModel"));
const EditCategoryModel = lazy(() => import("../components/EditCategoryModel"));
const NoData = lazy(() => import("../components/NoData"));

const Category = () => {
  const [openModel, setopenModel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openEditModel, setopenEditModel] = useState(false);
  const [editData, seteditData] = useState({
    name: "",
    image: "",
  });
  const [opendeleteModel, setopendeleteModel] = useState(false);
  const [deleteId, setdeleteId] = useState("");

  const fetchCategories = async () => {
    await insatance({
      ...summary.getCategories,
    }).then((res) => {
      setCategories(res.data.data.reverse());
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // delete category function
  const deleteCategory = async (id) => {
    await insatance({
      ...summary.deleteCategory,
      data: { id },
    })
      .then((res) => {
        fetchCategories();
        toast.success(res?.data?.message);
        setopendeleteModel(false);
      })
      .catch((err) => {
        toast.error(err?.message || "Error in deleting category");
      });
  };

  return (
    <section>
      <div className="p-2  flex justify-between items-center">
        <h2 className="font-bold ">Category</h2>
        <button
          className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 font-semibold cursor-pointer active:scale-97"
          onClick={() => setopenModel(!openModel)}
        >
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <NoData />
      ) : (
        <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
          {categories.map((e, i) => {
            return (
              <div
                className="w-44 h-fit cursor-pointer shadow-md rounded-lg hover:scale-105 transition-all duration-300 p-2 flex flex-col text-center justify-center items-center"
                key={i}
              >
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full h-full object-contain"
                  // onClick={() => console.log(i)}
                />
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-green-700 cursor-pointer font-semibold"
                    onClick={() => {
                      setopenEditModel(true);
                      seteditData(e);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer font-semibold"
                    onClick={() => {
                      setopendeleteModel(true);
                      setdeleteId(e._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openModel && (
        <UploadCategoryModel
          fetchCategories={fetchCategories}
          close={() => setopenModel(false)}
        />
      )}

      {openEditModel && (
        <EditCategoryModel
          data={editData}
          fetchCategories={fetchCategories}
          close={() => setopenEditModel(false)}
        />
      )}

      {opendeleteModel && (
        <DeleteConfirmModel
          close={() => setopendeleteModel(false)}
          confirm={() => deleteCategory(deleteId)}
        />
      )}
    </section>
  );
};

export default Category;
