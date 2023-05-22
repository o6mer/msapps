import { configureStore } from "@reduxjs/toolkit";
import { PersonSlice } from "./slices/personSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ImageSlice } from "./slices/imagesSlice";

export const store = configureStore({
  reducer: {
    person: PersonSlice.reducer,
    image: ImageSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
