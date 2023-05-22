import { Router } from "express";
import { getByCategory } from "../controllers/imagesController";

const imagesRouter = Router();

imagesRouter.get("/get-by-category/:category", getByCategory);

export default imagesRouter;
