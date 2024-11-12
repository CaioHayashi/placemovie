import { Router } from "express";
import { createComment, getComments } from "../controllers/MoviesCommentsControllers.js"

const router = Router()

router.post("/", createComment)
router.get("/", getComments)

export default router
