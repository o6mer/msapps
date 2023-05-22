import React, { useState } from "react";
import { IImage } from "../store/slices/imagesSlice";
import Dialog from "./general/Dialog";

interface Props {
  imageData: IImage;
}

const ImageItem = ({ imageData }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>
        <img
          src={imageData.webformatURL}
          key={imageData.id}
          className="max-h-48"
        />
      </button>
      <Dialog isOpen={isDialogOpen}>
        <div className="max-w-md overflow-x-hidden">
          <div>
            <button
              className="absolute right-2 top-2"
              onClick={() => setIsDialogOpen(false)}
            >
              X
            </button>
            <h2 className="text-center font-bold">Image Details</h2>
          </div>
          <div className="flex flex-col gap-2 ">
            {Object.entries(imageData).map((data, i) => (
              <div
                key={data[0]}
                className={`flex  ${i % 2 === 0 && "bg-slate-100"}`}
              >
                <p className="font-bold mr-2">{data[0].toLocaleUpperCase()}:</p>
                <p>{data[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageItem;
