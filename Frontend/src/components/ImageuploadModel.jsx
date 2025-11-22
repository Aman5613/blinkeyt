import { useState } from "react";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAvatar } from "../store/userSlice";

export default function ImageUploadModal({ close }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Send image to API
  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    
    const formData = new FormData();
    formData.append("avatar", imageFile);

    setLoading(true);

    try {
      const res = await insatance({
        ...summary.uploadAvatar,
        data : formData,
      })

      if(res.data.success){

        dispatch(setAvatar(res.data.url));

        close();

        toast.success("Image uploaded successfully!");
      }
      

    } catch (error) {
      console.error(error);
      toast.error("Upload failed! " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="sticky top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center  p-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Image</h1>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 block w-full text-black border py-2 px-3 rounded-md cursor-pointer"
          placeholder="Choose an Avatar"
        />

        {/* Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-2 bg-green-700 hover:bg-green-800 cursor-pointer text-white rounded-md disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
        {/* Close Button */}
        <button onClick={close} className="w-full cursor-pointer hover:bg-yellow-800 py-2 bg-yellow-700 text-white rounded-md mt-2">
          Close
        </button>
      </div>
    </div>
  );
}
