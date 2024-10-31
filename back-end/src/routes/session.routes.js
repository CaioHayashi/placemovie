import { Router } from "express";
import { createSession } from "../controllers/SessionsControllers.js";


const router = Router();

router.get("/", createSession);

export default router;
