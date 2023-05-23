import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getNextPage, getPrevPage } from "../../../store/slices/imagesSlice";

const ImagePagination = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.image.page);
  const maxPage = useAppSelector((state) => state.image.maxPage);

  return (
    <div className="w-full flex justify-center items-center gap-8">
      {page > 1 ? (
        <button
          onClick={() => {
            dispatch(getPrevPage());
          }}
          disabled={page === 1}
          className="px-2 py-1 border hover:bg-slate-200 transition-all"
        >
          Prev
        </button>
      ) : null}
      <p>{page}</p>
      {page <= maxPage ? (
        <button
          onClick={() => {
            dispatch(getNextPage());
          }}
          className="px-2 py-1 border hover:bg-slate-200 transition-all"
        >
          Next
        </button>
      ) : null}
    </div>
  );
};

export default ImagePagination;
