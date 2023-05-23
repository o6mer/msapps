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

export default paginateResult;
