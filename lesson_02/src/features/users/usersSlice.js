import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const POSTS_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const fetchedData = await axios.get(POSTS_URL);
  return fetchedData.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

// Selectors

export const selectAllUsers = (state) => state.users;

// Default exports

export const {} = usersSlice.actions;

export default usersSlice.reducer;