import Qsn from "../models/qsnModel.js";

export const getQsnById = async (req, res) => {
    try {
        const qsn = await Qsn.findById(req.body.id);
        if(!qsn) {
            return res.status(404).json({ error: "Qsn not found" });
        }
        res.status(200).json(qsn);
    } catch (error) {
        console.log("error in getQsnByIdController", error);
        res.status(500).json({ error: "internal server error" });
    }
}