import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import supabase from "../db/supabase.js";

dotenv.config();
const app = express();
app.use(express.json())

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.listen(3000, () => console.log("Server is run!"));
