import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenSetCookie } from "../utils/generateToken.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email });
    const passwordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if(!passwordCorrect){
      return res.status(400).json({error:"Incorrect password"})
    }
     generateTokenSetCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        qsnsUploaded: user.qsnsUploaded,
        qsnsSolved: user.qsnsSolved,
        points: user.points,
        profileImg: user.profileImg,
        isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log("error in signincontroller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
