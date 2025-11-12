import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    const token = req?.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

    
    if (!token) {
        return res.status(401).json({
            message: "Provide token",
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

    next();
  } catch (error) {
    return res.status(500).json({
      message: `Server error in auth middleware: ${error?.message || error}`,
      error: true,
      success: false,
    });
  }
};

export default authMiddleware;
