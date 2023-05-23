import axios from "axios";
import { Request, Response, response } from "express";
import { IImage } from "../types";
import { paginateArray, sortArray } from "../utils/arrayUtils";
import { RequestHandler } from "express-serve-static-core";

type ReqQuery = {
  category: string;
  sortBy: keyof IImage;
  page: number;
};

export const getImages: RequestHandler<
  unknown,
  unknown,
  unknown,
  ReqQuery
> = async (req, res) => {
  const category = req.query.category;
  const sortBy = req.query.sortBy;
  const page = req.query.page;

  //Check for valid input
  if (!category || !sortBy || !page)
    return res.status(400).json({
      message: "Please provide a valid input",
    });

  //Fetching the data from the endpoint
  let images: IImage[] = [];
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    images = data.hits;
  } catch (err: any) {
    console.log(err.message);

    return res
      .status(421)
      .json({ message: "Failed fetching pixbay API. " + err.message });
  }

  //Sort by the keyword and pageinate the array
  let formatedData;
  try {
    const sortedImages = sortArray(images, sortBy);
    const paginatedImages = paginateArray(sortedImages, page, 9);
    formatedData = {
      images: paginatedImages.data,
      maxPage: paginatedImages.maxPage,
    };
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({ message: "Failed to procces the data" });
  }

  res.status(200).json(formatedData);
};
