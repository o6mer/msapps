import axios from "axios";
import { Request, Response } from "express";

export const getImages = async (req: Request, res: Response) => {
  const category = req.query.category;
  const page = Number(req.query.page);
  try {
    //Fetching the data from the endpoint
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const images = data.hits;

    //Calculating the range of images to return
    const startIndex = (Number(page) - 1) * 9;
    const endIndex = page * 9;

    const result: {
      images: any[];
      maxPage: number;
    } = { images: [], maxPage: 0 };

    //Slicing the array in the correct range
    const resultImages = images.slice(startIndex, endIndex);

    result.images = resultImages;

    //Calculating the max amount of pages.
    result.maxPage = Math.round(images.length / 9);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
