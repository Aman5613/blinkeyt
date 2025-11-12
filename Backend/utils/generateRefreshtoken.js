import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

const generateRefreshToken = async (userID) => {
  const token = jwt.sign({ id: userID }, process.env.SECRET_REFRESH_KEY, {
    expiresIn: "7d",
  });

  const updateRefreshToken = await userModel.updateOne(
    { _id: userID },
    { refresh_token: token }
  );

  return token;
};

export default generateRefreshToken;
