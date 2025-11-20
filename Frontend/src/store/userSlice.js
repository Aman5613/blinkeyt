import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address_detail: [],
  avatar: "",
  createdAt: "",
  email: "",
  last_login_date: null,
  mobile: null,
  name: "",
  orderHistory: [],
  role: "",
  shooping_cart: [],
  status: "",
  updatedAt: "",
  verify_email: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        return { ...state, ...action.payload };
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
