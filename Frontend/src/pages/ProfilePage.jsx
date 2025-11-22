import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import ImageUploadModal from "../components/ImageuploadModel";

const ProfilePage = () => {
  const [openuploadModal, setOpenUploadModal] = useState(false);
  const user = useSelector((state) => state.user);

  console.log("User in ProfilePage:", user);

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="overflow-hidden w-24 h-24 flex items-center justify-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user?.name || "User"}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <FaUserAlt className="w-full h-full p-2" />
        )}
      </div>
      <button
        className="px-3 py-1 rounded-md cursor-pointer text-white font-bold active:scale-98 hover:bg-green-900 border border-gray-300 bg-green-800"
        onClick={() => setOpenUploadModal(true)}
      >
        Edit Avatar
      </button>
      {openuploadModal && <ImageUploadModal close={() => setOpenUploadModal(false)} />}
    </div>
  );
};

export default ProfilePage;
