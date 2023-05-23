import { sortBy } from "lodash";

export function paginateArray<T>(arr: Array<T>, page: number, limit: number) {
  //Calculating the range of images to return
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    data: arr.slice(startIndex, endIndex),
    maxPage: Math.round(arr.length / limit),
  };
}

export function sortArray<T>(arr: Array<T>, sortKey: keyof T) {
  let temp: Array<T> = [...arr];

  //sort an array by a key word
  temp = sortBy(temp, [sortKey]);

  return [...temp];
}
