import { Router } from "express";
import { getLikeStart, toggleMovieLike, getLikesList } from "../controllers/LikesControllers.js";

const route = Router()

route.post("/", toggleMovieLike)
route.get("/", getLikeStart)
route.get("/list", getLikesList);

export default route