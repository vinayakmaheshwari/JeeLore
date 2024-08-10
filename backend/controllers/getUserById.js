import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
  try {
    const id = req.body.id.toString();
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
     else{res.status(200).json(user);}
  } catch (error) {
    console.log("error in getUserById", error);
    res.status(500).json({ error: "internal server error" });
  }
};


// below function is resolving the render inactivity issue i've set a cron-job from 
// https://console.cron-job.org/jobs that sends a req every 10 min this function is to 
// respond to that req so that server dont spin down
export const getUserByIdParams = async (req, res) => {
  try {
    const { id:id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
     else{res.status(200)}
  } catch (error) {
    console.log("error in getUserById", error);
    res.status(500).json({ error: "internal server error" });
  }
}
