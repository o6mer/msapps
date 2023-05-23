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
  category?: string;
  page: number;
  maxPage: number;
}

const initialState: ImageState = {
  images: [],
  category: "",
  page: 1,
  maxPage: 1,
};

// Generic fetching function for the images
const fetchImages = async (category: string, page: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/images/get-images?category=${category}&page=${page}`
    );

    return response.data;
  } catch (err) {
    alert(err);
  }
};

//Thunk function to change the image categoy. Update the state and fetch the data
export const changeCategory = createAsyncThunk(
  "images/changeCategory",
  async (category: string, thunkApi) => {
    //Updating the state
    thunkApi.dispatch(setCategory({ category }));

    //fetching the data
    return await fetchImages(category, 1);
  }
);

//Thunk function to get the previous page. Update the sate and fetch the data
export const getPrevPage = createAsyncThunk(
  "images/prevPage",
  async (_, thunkApi) => {
    //Fetching the data
    const data = await fetchImages(
      thunkApi.getState().image.category,
      thunkApi.getState().image.page - 1
    );

    //Updating the state
    thunkApi.dispatch(setPrevPage());
    return data;
  }
);

//Thunk function to get the Next page. Update the sate and fetch the data
export const getNextPage = createAsyncThunk(
  "images/nextPage",
  async (_, thunkApi) => {
    const data = await fetchImages(
      thunkApi.getState().image.category,
      thunkApi.getState().image.page + 1
    );
    thunkApi.dispatch(setNextPage());
    return data;
  }
);

export const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setNextPage: (state) => {
      state.page++;
    },
    setPrevPage: (state) => {
      state.page--;
    },
    setCategory: (state, action: PayloadAction<{ category: string }>) => {
      state.category = action.payload.category;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeCategory.fulfilled, (state, action) => {
      state.images = action.payload.images;
      state.maxPage = action.payload.maxPage;
    });
    builder.addCase(getPrevPage.fulfilled, (state, action) => {
      state.images = action.payload.images;
      state.maxPage = action.payload.maxPage;
    });
    builder.addCase(getNextPage.fulfilled, (state, action) => {
      state.images = action.payload.images;
      state.maxPage = action.payload.maxPage;
    });
  },
});

export default ImageSlice.reducer;
export const { setPrevPage, setNextPage, setCategory } = ImageSlice.actions;
