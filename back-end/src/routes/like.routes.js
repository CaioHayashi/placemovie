import { Router } from "express";
import { getLikeMovieStart, toggleLikeMovie, getLikesMovieList } from "../controllers/LikesMoviesControllers.js";
import { getLikeSerieStart, toggleLikeSerie, getLikesSerieList } from "../controllers/LikesSeriesControllers.js";

const route = Router()

route.post("/movies", toggleLikeMovie);
route.get("/movies", getLikeMovieStart)
route.get("/movies/list", getLikesMovieList);

route.post("/series", toggleLikeSerie);
route.get("/series", getLikeSerieStart);
route.get("/series/list", getLikesSerieList);

export default route