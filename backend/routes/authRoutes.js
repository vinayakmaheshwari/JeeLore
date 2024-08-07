import express from "express";
import { signup } from "../controllers/signupController.js";
import { signin } from "../controllers/signinController.js";
import { logout } from "../controllers/logoutController.js";
import { getAuthUser } from "../controllers/getAuthUserController.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUserById } from "../controllers/getUserById.js";


const router = express.Router();

router.get("/me",protectRoute, getAuthUser);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", logout);

router.post("/getUserById", getUserById);



export default router;
