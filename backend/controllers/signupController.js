import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateTokenSetCookie } from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
    try {
      const { firstName, lastName, userName, email, password } = req.body;
      let { profileImg } = req.body;
  
      // check if email is valid
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid Email" });
      }
  
      // check if user already exists
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ error: "UserName already Taken" });
      }
  
      // check if email already registered
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "email already registered" });
      }
  
      //password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if(profileImg){
        const uploadResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadResponse.secure_url;
      }
  
      const newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        profileImg: profileImg
      });
  
      if (newUser) {
        generateTokenSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          userName: newUser.userName,
          email: newUser.email,
          qsnsUploaded: newUser.qsnsUploaded,
          qsnsSolved: newUser.qsnsSolved,
          points: newUser.points,
          profileImg: newUser.profileImg,
          isAdmin: newUser.isAdmin,
        });
      } else {
        res.status(400).json({ error: "Invalid user Data" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };