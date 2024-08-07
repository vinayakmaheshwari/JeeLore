import Qsn from "../models/qsnModel.js";

export const addComment = async (req, res) => {
  try {
    const { id: qsnId } = req.params;
    const { text, image } = req.body;
    const userId = req.user._id.toString();

    const qsn = await Qsn.findById(qsnId);

    if (!qsn) {
      return res.status(404).json({ error: "Qsn not found" });
    }

    if (!text && !image) {
      return res.status(400).json({ error: "text or image are required" });
    }

    await Qsn.updateOne(
      { _id: qsnId },
      { $push: { comments: { text: text, postedBy: userId, image: image } } }
    );
    res.status(200).json({ msg: "comment added" });
  } catch (error) {
    console.log("error in commentController", error);
    res.status(500).json({ error: "internal server error" });
  }
};
