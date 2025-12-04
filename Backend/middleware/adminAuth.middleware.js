import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    const token = req?.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

    
    if (!token) {
        return res.status(401).json({
            message: "unauthorized access",
            error: true,
            success: false,
        });
    }
    // console.log("token --> ", token);

    const decoded = await jwt.verify(token, process.env.SECRET_ACCESS_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    // console.log(decoded);
    req.userID = decoded.id;

    const user = await userModel.findById(decoded.id).select("-password");

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "forbidden access - admins only",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: `Server error in admin auth middleware: ${error?.message || error}`,
      error: true,
      success: false,
    });
  }
};

export default adminAuthMiddleware;
