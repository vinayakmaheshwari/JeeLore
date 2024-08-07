import Qsn from "../models/qsnModel.js";


export const getPost = async (req, res) => {
    let skip = Number(req.body.skip);
    let limit = Number(req.body.limit);
    const { subject, difficulty, type, status } = req.body;

    try {
        const qsn = await Qsn.find({subject: subject, difficulty: difficulty, type: type, status: status }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json(qsn);
    } catch (error) {
        console.log("error in getPostController", error);
        res.status(500).json({ error: "internal server error" });
    }
}

export const numberOfQsn = async (req, res) => {
    const { subject, difficulty, type, status } = req.body;
    try {
        const qsn = await Qsn.countDocuments({subject: subject, difficulty: difficulty, type: type, status: status });
        res.status(200).json(qsn);
    } catch (error) {
        console.log("error in getPostController", error);
        res.status(500).json({ error: "internal server error" });
    }    

}