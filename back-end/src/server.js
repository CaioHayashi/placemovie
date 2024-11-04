import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);

app.listen(3001, () => console.log("Server is run!"));
