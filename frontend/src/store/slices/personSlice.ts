import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Person {
  id: number;
  name: string;
}

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [],
};

export const fetchPerson = createAsyncThunk(
  "person/fetch",
  async (thunkApi) => {
    const response = await axios.get(
      "https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=flowers"
    );
    return response.data.hits;
  }
);

export const savePerson = createAsyncThunk(
  "person/save",
  async (name: string, thunkApi) => {
    const response = await axios.get("");
    return response.data;
  }
);

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{ name: string }>) => {
      state.persons.push({
        id: state.persons.length,
        name: action.payload.name,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.persons = action.payload;
    });

    builder.addCase(savePerson.fulfilled, (state, action) => {
      state.persons.push(action.payload);
    });
  },
});

export default PersonSlice.reducer;
export const { addPerson } = PersonSlice.actions;
