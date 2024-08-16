import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { newQsn } from "../controllers/newQsnController.js";
import { upvote } from "../controllers/upvoteController.js";
import { addComment } from "../controllers/commentController.js";
import { deleteQsn } from "../controllers/deleteQsnController.js";
import { deleteComment } from "../controllers/deleteCommentController.js";
import { postSolution } from "../controllers/postSolutionController.js";
import { approveSolution } from "../controllers/approveSolutionController.js";
import { getPost, numberOfQsn } from "../controllers/getPost.js";
import { getQsnById } from "../controllers/getQsnById.js";
import { getNoOfUpvotes } from "../controllers/getNoOfUpvotesController.js";
import { getUserPost } from "../controllers/getUserPost.js";

const router = express.Router();

router.post("/getPost", getPost);
router.post("/post", protectRoute, newQsn);
router.post("/upvote/:id", protectRoute, upvote);
router.post("/comment/:id", protectRoute, addComment);
router.post("/deleteQsn", protectRoute, deleteQsn);
router.post("/delete/comment/:id/:commId", protectRoute, deleteComment);
router.post("/postSolution", protectRoute, postSolution);
router.post("/approveSolution/:id/:solutionId", protectRoute, approveSolution);
router.post("/getQsnById", getQsnById );
router.post("/countQsns", numberOfQsn );
router.post("/getNoOfUpvotes", getNoOfUpvotes );
router.post("/getUserPost", protectRoute, getUserPost );
export default router;
