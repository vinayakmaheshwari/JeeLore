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

export const getUserByIdParams = async (req, res) => {
  try {
    const { id:id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
     else{res.status(200).json(user);}
  } catch (error) {
    console.log("error in getUserById", error);
    res.status(500).json({ error: "internal server error" });
  }
}
