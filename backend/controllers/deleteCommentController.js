import Qsn from "../models/qsnModel.js";

export const deleteComment = async (req, res) => {
    try {
        const { id: qsnId } = req.params;  
        const {commId: commentId} = req.params;
        const userId = req.user._id.toString();

        const qsn = await Qsn.findById(qsnId);
        if (!qsn) {
            return res.status(404).json({ error: "Qsn not found" });
        }   

        const comment = qsn.comments.find((c) => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.postedBy.toString() !== userId) {
            return res.status(401).json({ error: "Unauthorized" }); 

        }

        await Qsn.updateOne({ _id: qsnId }, { $pull: { comments: { _id: commentId } } });
        res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
        console.log("error in deleteCommentController", error);
        res.status(500).json({ error: "internal server error" });
    }
}
