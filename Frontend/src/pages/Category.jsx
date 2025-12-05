import React, { useEffect, useState } from "react";
import { lazy } from "react";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import NoData from "../components/NoData";

// lazy load UploadCategoryModel component
const UploadCategoryModel = lazy(() =>
  import("../components/UploadCategoryModel")
);

const Category = async () => {
  const [openModel, setopenModel] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await insatance({
      ...summary.getCategories,
    }).then((res) => {
      setCategories(res.data.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      {openModel && <UploadCategoryModel fetchCategories={fetchCategories} close={() => setopenModel(false)} />}
      {categories.length === 0 ? (
        <NoData />
      ) : (
        <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-center">
          {categories.map((e, i) => {
            return (
              <div
                className="w-36 h-fit cursor-pointer shadow-md rounded-lg hover:scale-105 transition-all duration-300 p-2 flex justify-center items-center"
                key={i}
              >
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full h-full object-contain"
                />
                {/* <p>{e.name}</p> */}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Category;
