import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/UsersController.js";
import supabase from "../../db/supabase.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUser)
router.put("/", updateUser)

export default router;
