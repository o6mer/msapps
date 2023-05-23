import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { changeCategory } from "./store/slices/imagesSlice";
import SectionContainer from "./components/imagesSection/SectionContainer";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCategory("nature"));
  }, [dispatch]);

  return (
    <div className="px-24 py-4">
      <SectionContainer />
    </div>
  );
}

export default App;
