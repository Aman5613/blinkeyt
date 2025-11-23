import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import { setUserDetails } from "../store/userSlice";
import toast from "react-hot-toast";
import getuserdetails from "../utils/fetchuserDetails";
import getErrorMessage from "../utils/axiosError";

export default function UpdateUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // Load user into form on mount
  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.mobile && form.mobile.length < 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    try {
      await insatance({
        ...summary.updateUser,
        data: form,
      })
        .then(async (res) => {
          if (res.data.success) {
            const newUserData = await getuserdetails();
            toast.success(res.data.message);
            dispatch(setUserDetails(newUserData));
            return;
          } else {
            toast.error(res.data.message || "Failed to update user");
            return;
          }
        })
        .catch((err) => getErrorMessage(err));
    } catch (error) {
      toast.error("Error updating user: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Update Profile</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Enter Mobile No"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <button
          type="submit"
          className="w-full mt-10 bg-green-800 text-white font-bold tracking-wider py-2 rounded cursor-pointer hover:bg-green-900"
        >
          Update
        </button>
      </form>
    </div>
  );
}
