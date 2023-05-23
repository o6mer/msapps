import axios from "axios";
import { Request, Response } from "express";
import { IImage } from "../types";
import sortArray from "../utils/sortArray";
import paginateResult from "../utils/paginate";

export const getImages = async (req: Request, res: Response) => {
  const category = req.query.category;
  const sortBy = req.query.sortBy as string;
  const page = Number(req.query.page) || 1;

  try {
    //Check for valid input
    if (!category)
      return res.status(400).json({
        message: "Category not provided, Please provide a valid input",
      });

    //Fetching the data from the endpoint
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const images: IImage[] = data.hits;

    //Sort if requierd
    if (sortBy) sortArray(images, sortBy);

    //Paginate the array
    const result = paginateResult(images, page, 9);

    res.status(200).json(result);
  } catch (err: any) {
    //Catches if an error was thrown and return it as a message
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
