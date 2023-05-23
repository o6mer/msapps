const sortArray = (arr: any[], sortKey: string) => {
  //sort an array by a key word
  arr.sort((a, b) =>
    a[sortKey]?.toString()?.localeCompare(b[sortKey]?.toString())
  );
};

export default sortArray;
