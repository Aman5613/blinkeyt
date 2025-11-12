import jwt from "jsonwebtoken";

const generateAccessToken = async (userID) => {
  const token = jwt.sign({ id: userID }, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "5h",
  });

  return token
};


export default generateAccessToken;
