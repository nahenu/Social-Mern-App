import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appRouter from "./src/routes/route.js";
import { error } from "./src/errors/error.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
  origin:["https://social-mern-frontend.vercel.app"],
  methods:["POST","GET"],
  credentials:true
  
} ));

app.use("/api/v1", appRouter);
app.use(error());
export default app;
