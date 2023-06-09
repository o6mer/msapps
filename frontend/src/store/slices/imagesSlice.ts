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
  page: number;
  maxPage: number;
  sortBy: string;
  error: string;
  isLoading: boolean;
}

const initialState: ImageState = {
  images: [],
  category: "",
  page: 1,
  maxPage: 1,
  sortBy: "id",
  error: "",
  isLoading: false,
};

// Generic fetching function for the images
const fetchImages = async ({
  category,
  page,
  sortBy,
}: {
  category: string;
  page: number;
  sortBy: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/images/get-images?category=${category}&page=${page}&sortBy=${sortBy}`
    );

    return response.data;
  } catch (err) {
    alert(err.message);
  }
};

//Thunk function to change the image category. Update the state and fetch the data
export const changeCategory = createAsyncThunk(
  "images/changeCategory",
  async (category: string, thunkApi) => {
    //Updating the state
    thunkApi.dispatch(setCategory({ category }));
    thunkApi.dispatch(setIsLoading({ isLoading: true }));

    //Fetching the data
    try {
      const data = await fetchImages({
        ...thunkApi.getState().image,
        category,
      });
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
      return data;
    } catch (err) {
      // Handle the error
      thunkApi.dispatch(setError(err.message));
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
    }
  }
);

//Thunk function to get the previous page. Update the sate and fetch the data
export const getPrevPage = createAsyncThunk(
  "images/prevPage",
  async (_, thunkApi) => {
    //Getting the current state
    const imageState = thunkApi.getState().image;
    thunkApi.dispatch(setIsLoading({ isLoading: true }));

    //Fetching the data
    try {
      const data = await fetchImages({
        ...imageState,
        page: imageState.page - 1,
      });

      //Updating the state
      thunkApi.dispatch(setPrevPage());
      thunkApi.dispatch(setIsLoading({ isLoading: false }));

      return data;
    } catch (err) {
      thunkApi.dispatch(setError(err.message));
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
    }
  }
);

//Thunk function to get the Next page. Update the sate and fetch the data
export const getNextPage = createAsyncThunk(
  "images/nextPage",
  async (_, thunkApi) => {
    const imageState = thunkApi.getState().image;
    thunkApi.dispatch(setIsLoading({ isLoading: true }));

    try {
      const data = await fetchImages({
        ...imageState,
        page: imageState.page + 1,
      });

      //Updating the state
      thunkApi.dispatch(setNextPage());
      thunkApi.dispatch(setIsLoading({ isLoading: false }));

      return data;
    } catch (err) {
      thunkApi.dispatch(setError(err.message));
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
    }
  }
);

//Thunk function to change the sorting of the images. Update the sate and fetch the data
export const changeSortBy = createAsyncThunk(
  "images/changeSortBy",
  async (sortBy: string, thunkApi) => {
    //Updating the state
    thunkApi.dispatch(setSortBy({ sortBy }));
    thunkApi.dispatch(setIsLoading({ isLoading: true }));

    try {
      // Fetching the data
      const data = await fetchImages({
        ...thunkApi.getState().image,
        sortBy,
      });
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
      return data;
    } catch (err) {
      // Handle the error
      thunkApi.dispatch(setError(err.message));
      thunkApi.dispatch(setIsLoading({ isLoading: false }));
      throw err;
    }
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
    setSortBy: (state, action: PayloadAction<{ sortBy: string }>) => {
      state.sortBy = action.payload.sortBy;
    },
    setError: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message;
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeCategory.fulfilled, (state, action) => {
      const { images, maxPage } = action.payload;
      return { ...state, images, maxPage };
    });
    builder.addCase(getPrevPage.fulfilled, (state, action) => {
      state.images = action.payload.images;
    });
    builder.addCase(getNextPage.fulfilled, (state, action) => {
      state.images = action.payload.images;
    });
    builder.addCase(changeSortBy.fulfilled, (state, action) => {
      state.images = action.payload.images;
    });
  },
});

export default ImageSlice.reducer;
export const {
  setPrevPage,
  setNextPage,
  setCategory,
  setSortBy,
  setError,
  setIsLoading,
} = ImageSlice.actions;
