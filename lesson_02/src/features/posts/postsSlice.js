import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [
  {
    id: 1,
    title: "This is a post",
    content: "Want to learn how to make a post? Come here!",
    userId: 2
  },
  {
    id: 2,
    title: "Everything has a beginning",
    content: "And this is one of them! Or maybe not...",
    // userId: 1
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: uuid(),
            title,
            content,
            userId
          },
        };
      },
    },
  },
});

// Selectors

export const selectAllPosts = (state) => state.posts;

// Default exports

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
