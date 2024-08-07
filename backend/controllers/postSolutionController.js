import Qsn from "../models/qsnModel.js";  
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
  

export const postSolution = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    try {
        const { Id , solutionText, answer }  = req.body;
        let { solutionImage }  = req.body;
        const userId = req.user._id.toString();
        const qsn = await Qsn.findById(Id);  
        const user = await User.findById(userId);

        if (!qsn) {      
            return res.status(404).json({ error: "Qsn not found" });
        }   
        if (!solutionText && !solutionImage) {
            return res.status(400).json({ error: "text or image are required" });
        }   
        if (solutionImage) {
            const uploadResponse = await cloudinary.uploader.upload(solutionImage);
            solutionImage = uploadResponse.secure_url;
        }   
        if (qsn.type!=="Subjective" && qsn.answer=="" && answer=="") {
            return res.status(400).json({ error: "answer is required" });
        }


        await User.updateOne({
            _id: userId},{ $push: { qsnsSolved: Id,  } });

        if(qsn.answer!==""){
             await Qsn.updateOne(
            { _id: Id },
            { $push: { solution: { text: solutionText, image: solutionImage, postedBy: userId }  }, status: "Solved" }
        );
        res.status(200).json({ msg: "solution added" });
        }    
        if(qsn.answer==""){
            await Qsn.updateOne(
                { _id: Id },
                { $push: { solution: { text: solutionText, image: solutionImage, postedBy: userId } },answer: answer, status: "Solved" }
            );
            res.status(200).json({ msg: "solution added" });
        }
       
        
    } catch (error) {
        console.log("error in postSolutionController", error);
        res.status(500).json({ error: "internal server error" });
}
}