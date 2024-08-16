export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {path: '/'})
        res.status(200).json({msg:"loggedout successfully"})
    } catch (error) {
        console.log("error in logoutController", error)
        res.status(500).json({error:"internal server error"})
    }
  };
  