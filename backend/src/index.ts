import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import imagesRouter from "./routers/imagesRouter";
import cors from "cors";

config();

const app: Application = express();

//Configure the server
app.use(express.json());
app.use(cors());

//Adding a router
app.use("/api/images", imagesRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
