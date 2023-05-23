import { Router } from "express";
import { getImages } from "../controllers/imagesController";

const imagesRouter = Router();

//Setup the endpoint with the middleware
imagesRouter.get("/get-images", getImages);

export default imagesRouter;
