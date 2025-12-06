import React from 'react'
import { useSelector } from "react-redux";
import Any from "../pages/Any";

const Admin = ({ children }) => {
  const user = useSelector((state) => state.user);

  const isAdmin = user?.role === "admin";

  return <div>{isAdmin ? children : <Any />}</div>;
};

export default Admin;
