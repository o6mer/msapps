import axios from "axios";
import { Request, Response } from "express";
import { Hit } from "../types";

export const getByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const hits: Hit[] = data.hits;
    res.status(200).json({ images: hits });
  } catch (err) {}
};
