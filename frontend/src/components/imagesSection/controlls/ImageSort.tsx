import { useAppDispatch, useAppSelector } from "../../../store/store";
import { changeSortBy } from "../../../store/slices/imagesSlice";

const ImageSort = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.image.sortBy);

  return (
    <div className="flex justify-end">
      <label htmlFor="sort-select">Sort By</label>
      <select
        className="border"
        id="sort-select"
        onChange={(e) => dispatch(changeSortBy(e.target.value))}
        value={sortBy}
      >
        <option value="id">ID</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
};

export default ImageSort;
