import axios from "axios";
import { Request, Response } from "express";
import { IImage } from "../types";

const paginateResult = (arr: any[], page: number, limit: number) => {
  //Calculating the range of images to return
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result: {
    images: any[];
    maxPage: number;
  } = { images: [], maxPage: 0 };

  //Slicing the array in the correct range
  const resultImages = arr.slice(startIndex, endIndex);

  result.images = resultImages;

  //Calculating the max amount of pages.
  result.maxPage = Math.round(arr.length / limit);

  return result;
};

export const getImages = async (req: Request, res: Response) => {
  const category = req.query.category;
  const sortBy = req.query.sortBy as string;
  const page = Number(req.query.page);

  try {
    //Fetching the data from the endpoint
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const images: IImage[] = data.hits;

    if (sortBy)
      images.sort((a, b) =>
        a[sortBy].toString().localeCompare(b[sortBy].toString())
      );

    const result = paginateResult(images, page, 9);

    res.status(200).json(result);
  } catch (err: any) {
    console.log(err);

    res.status(400).json({ message: err.message });
  }
};
