import React from "react";

const ImagePagination = () => {
  return (
    <div className="w-full flex justify-center items-center gap-8">
      <button className="px-2 py-1 border hover:bg-slate-200 transition-all">
        Prev
      </button>
      <p>1</p>
      <button className="px-2 py-1 border hover:bg-slate-200 transition-all">
        Next
      </button>
    </div>
  );
};

export default ImagePagination;
