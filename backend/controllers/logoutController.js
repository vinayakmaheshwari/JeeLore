export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
      domain: "jeelore.site",
    });
    res.status(200).json({ msg: "loggedout successfully" });
  } catch (error) {
    console.log("error in logoutController", error);
    res.status(500).json({ error: "internal server error" });
  }
};
