import Qsn from "../models/qsnModel.js"

export const getNoOfUpvotes = async (req, res) => {
   try {
    const { id } = req.body
    const qsn = await Qsn.findById(id)
    if (!qsn) {
        return res.status(404).json({ error: "Qsn not found" })
    }

    res.status(200).json(qsn.upvotedBy.length)
   } catch (error) {
    console.log("error in getNoOfUpvotesController", error)
    res.status(500).json({ error: "internal server error" })
   }


}
