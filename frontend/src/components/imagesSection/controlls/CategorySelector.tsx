import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { changeCategory } from "../../../store/slices/imagesSlice";
import Dialog from "../../general/Dialog";

const CategorySelector = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedCategory = useAppSelector((state) => state.image.category);
  const dispatch = useAppDispatch();

  //Change the state and closes the dialog
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    if (!category) return;

    dispatch(changeCategory(category));
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center p-4">
      <button
        onClick={() => setIsDialogOpen(true)}
        className="border hover:bg-slate-200 transition-all px-2 py-1 text-xl"
      >
        Select Category
      </button>
      <div>
        <Dialog isOpen={isDialogOpen}>
          <div>
            <button
              className="absolute right-2 top-2"
              onClick={() => setIsDialogOpen(false)}
            >
              X
            </button>
            <header className="flex justify-center">
              <h2>Select Category</h2>
            </header>
            <div className="flex justify-center mt-8">
              <select
                name=""
                id="select-category"
                className="border"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="nature">Nature</option>
                <option value="buildings">Buildings</option>
                <option value="cars">Cars</option>
              </select>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CategorySelector;
