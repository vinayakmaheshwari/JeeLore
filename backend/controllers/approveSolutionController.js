import Qsn from "../models/qsnModel.js";

export const approveSolution = async (req, res) => {
    try {
        const { id: qsnId } = req.params;
        const {solutionId: solutionId} = req.params;
        const userId = req.user._id.toString();
        const qsn = await Qsn.findById(qsnId);
        const solution = qsn.solution.find((s) => s._id.toString() === solutionId);

        if (!solution) {
            return res.status(404).json({ error: "Solution not found" });
        }
        if (!qsn) {
            return res.status(404).json({ error: "Qsn not found" });
        }

        if(qsn.postedBy.toString() !== userId){
            return res.status(401).json({ error: "Unauthorized" });
        }    
        await Qsn.findByIdAndUpdate(qsnId, { $set: { "solution.$[element].isApproved": true } }, { arrayFilters: [{ "element._id": solutionId }] }); 
        res.status(200).json({ msg: "Solution approved" });

}
catch (error) {
    console.log("error in approveSolutionController", error);
    res.status(500).json({ error: "internal server error" });
}
}
