import { Router } from "express";
import { createComment, getComments } from "../controllers/SeriesCommentsControllers.js";

const router = Router()

router.post("/", createComment)
router.get("/", getComments)

export default router