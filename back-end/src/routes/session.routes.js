import { Router } from "express";
import { createSession } from "../controllers/SessionsControllers.js";


const router = Router();

router.post("/", createSession);

export default router;
