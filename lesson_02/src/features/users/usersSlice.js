import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, username: "Jhin Karra"},
  { id: 2, username: "Mauga Amon"},
  { id: 3, username: "Dauriel Artanis"}
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

  }
});

// Selectors

export const selectAllUsers = (state) => state.users;

// Default exports

export const {} = usersSlice.actions;

export default usersSlice.reducer;