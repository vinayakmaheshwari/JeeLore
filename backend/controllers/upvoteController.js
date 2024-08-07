import Qsn from "../models/qsnModel.js";

export const upvote = async (req, res) => {
  try {
    const { id: qsnId } = req.params;
    const userId = req.user._id.toString();

    const qsn = await Qsn.findById(qsnId);

    if (!qsn) {
      res.status(200).json({ error: "Qsn not found" });
    }

    const userUpvoted = qsn.upvotedBy.includes(userId);

    if (userUpvoted) {
      await Qsn.updateOne({ _id: qsnId }, { $pull: { upvotedBy: userId } });

      res.status(200).json({ msg: "upvote removed" });
    } else {
      qsn.upvotedBy.push(userId);
      await qsn.save();

      res.status(200).status(201).json({ msg: "upvote added" });
    }
  } catch (error) {
    console.log("error in upvoteController", error);
    res.status(500).json({ error: "internal server error" });
  }
};
