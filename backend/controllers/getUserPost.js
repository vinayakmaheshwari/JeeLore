import Qsn from "../models/qsnModel.js";

export const getUserPost = async (req, res) => {
    try {
        const { id, status } = req.body
        const qsn = await Qsn.find({ postedBy: id, status: status }).sort({ createdAt: -1 });
        console.log(id)
        res.status(200).json(qsn)
    } catch (error) {
        console.log("error in getUserController", error);
        res.status(500).json({ error: "internal server error" });
    }
}