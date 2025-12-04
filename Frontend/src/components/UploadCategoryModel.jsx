import React, { useState } from "react";
import { toast } from "react-hot-toast";
import uploadImage from "../utils/uploadImage";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";

const UploadCategoryModel = ({ close }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setdata] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage(data.image)
    .then(async (res) => {
      console.log(res.data.url);
      
    })
    .catch((err) => {
      toast.error(err);
    })
    // console.log(res);
  };

  const handleuploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select an image");
    else {
      setImagePreview(URL.createObjectURL(file));
      setdata({
        ...data,
        image : file,
      })
    }
  };
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-30">
      <div>
        <div className="w-96 md:w-1/2 h-fit bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow-lg">
          <h2 className="font-bold text-lg mb-4">Upload Category</h2>
          <form onSubmit={handleSubmit} className="py-3">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={data.name}
              onChange={handleChange}
              className="w-full border border-gray-300 outline-yellow-300 bg-blue-50  rounded px-2 py-1 mb-4"
            />
            <div>
              <p>image</p>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="bg-blue-100 w-32 h-30 flex items-center justify-center border border-gray-400 rounded-md mt-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Category Preview"
                      className="w-full h-full object-cover object-top rounded-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </div>
                <label htmlFor="uploadCategoryImage">
                  <div
                    className={`
                    ${
                      !data.name
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer active:scale-97"
                    }
                    px-2 py-1 rounded mt-2 w-fit h-fit
                    `}
                  >
                    Upload Image
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="uploadCategoryImage"
                    onChange={handleuploadImage}
                    disabled={!data.name}
                    name="image"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer active:scale-97"
                onClick={close}
              >
                Cancel
              </button>
              <button className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-900 cursor-pointer active:scale-97 font-semibold">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
