import User from "../models/userModel.js"

export const getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user)
    } catch (error) {
        console.log("error in getAuthController", error)
        res.status(500).json({error:"internal server error"})
    }
}