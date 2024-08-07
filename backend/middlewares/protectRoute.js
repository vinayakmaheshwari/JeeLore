import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "you need to login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ msg: "invalid or unathorised token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    req.user = user;
    next()
  } catch (error) {
     console.log("error in protectRoute ", error.message)
     return res.status(500).json({error: "internal server error"})
  }
};
