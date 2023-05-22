import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

interface ImageState {
  images: IImage[];
  category: string;
}

const initialState: ImageState = {
  images: [],
  category: "sport",
};

export const fetchImages = createAsyncThunk(
  "images/fetch",
  async (category: string | undefined, thunkApi) => {
    const response = await axios.get(
      `http://localhost:8000/api/images/get-by-category/${category}`
    );
    return response.data.images;
  }
);

export const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
});

export default ImageSlice.reducer;
// export const { addPerson } = PersonSlice.actions;
