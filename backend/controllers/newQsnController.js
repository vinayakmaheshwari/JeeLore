import Qsn from "../models/qsnModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const newQsn = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const {
      text,
      answer,
      status,
      difficulty,
      subject,
      topic,
      type,
      solutionText,
    } = req.body;

    let { image, solutionImage } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if (!status || !difficulty || !topic || !type || !subject) {
      return res.status(400).json({ error: "all fields are required" });
    }
    if (!text && !image) {
      return res.status(400).json({ error: "text or image are required" });
    }
    if (status === "Solved" && !answer === "") {
      return res.status(400).json({ error: "answer is required" });
    }

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      image = uploadResponse.secure_url;
    }

    if (status === "Solved" && !solutionText && !solutionImage) {
      return res.status(400).json({ error: "solution are required" });
    }

    if (solutionImage) {
      const uploadResponse = await cloudinary.uploader.upload(solutionImage);
      solutionImage = uploadResponse.secure_url;
    }

    if (solutionImage !== "" || solutionText !== "") {
      const newQsn = new Qsn({
        postedBy: userId,
        text: text,
        image: image,
        answer: answer,
        status: status,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        type: type,
        solution: {
          text: solutionText,
          image: solutionImage,
          postedBy: userId,
          isApproved: true,
        },
      });
      await newQsn.save();
      await User.updateOne(
        { _id: userId },
        { $push: { qsnsUploaded: newQsn._id } }
      );
      res.status(201).json(newQsn);
    } else {
      const newQsn = new Qsn({
        postedBy: userId,
        text: text,
        image: image,
        answer: answer,
        status: status,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        type: type,
      });
      await newQsn.save();
      await User.updateOne(
        { _id: userId },
        { $push: { qsnsUploaded: newQsn._id } }
      );
      res.status(201).json(newQsn);
    }
  } catch (error) {
    console.log("error in newQsnController", error);
    res.status(500).json({ error: "internal server error" });
  }
};
