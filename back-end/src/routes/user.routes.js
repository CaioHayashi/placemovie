import { Router } from "express";
import { createUser, getUser } from "../controllers/UsersController.js";
import supabase from "../../db/supabase.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUser)

export default router;
