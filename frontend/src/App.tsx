import { useEffect } from "react";
import ImagesContainer from "./components/ImagesContainer";
import { useAppDispatch } from "./store/store";
import CategorySelector from "./components/CategorySelector";
import ImagePagination from "./components/ImagePagination";
import { changeCategory } from "./store/slices/imagesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCategory(""));
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
