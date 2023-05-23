import React from "react";
import CategorySelector from "./controlls/CategorySelector";
import ImagePagination from "./controlls/ImagePagination";
import ImagesContainer from "./content/ImagesContainer";
import ImageSort from "./controlls/ImageSort";

const SectionContainer = () => {
  return (
    <main>
      <div>
        <CategorySelector />
        <ImagePagination />
        <ImageSort />
      </div>
      <ImagesContainer />
    </main>
  );
};

export default SectionContainer;
