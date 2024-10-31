import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
app.use(express.json())

app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server is run!"));
