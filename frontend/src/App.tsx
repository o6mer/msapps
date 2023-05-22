import { useEffect } from "react";
import ImagesContainer from "./components/ImagesContainer";
import { useAppDispatch } from "./store/store";
import { fetchImages } from "./store/slices/imagesSlice";
import CategorySelector from "./components/CategorySelector";
import ImagePagination from "./components/ImagePagination";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div className="px-24 py-4">
      <CategorySelector />
      <ImagesContainer />
      <ImagePagination />
    </div>
  );
}

export default App;
