import Qsn from "../models/qsnModel.js";

export const deleteQsn = async (req, res) => {
    try {
        const  qsnId  = req.body.qsnId.toString();
        const userId = req.user._id.toString();
        const qsn = await Qsn.findById(qsnId);
        if (!qsn) {
            return res.status(404).json({ error: "Qsn not found" });
        }
        
        if (qsn.postedBy.toString() !== userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        await Qsn.deleteOne({ _id: qsnId });
        res.status(200).json({ msg: "Qsn deleted successfully" });

    } catch (error) {
        console.log("error in deleteQsnController", error);
        res.status(500).json({ error: "internal server error" });
    }
}