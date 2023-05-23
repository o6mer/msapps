import { useAppSelector } from "../../../store/store";
import ImageItem from "./ImageItem";

const ImagesContainer = () => {
  const images = useAppSelector((state) => state.image.images);
  const isLoading = useAppSelector((state) => state.image.isLoading);

  return (
    <>
      {isLoading ? (
        <div className="text-center text-3xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 justify-items-center p-4">
          {images.map((image) => (
            <ImageItem imageData={image} key={image.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ImagesContainer;
