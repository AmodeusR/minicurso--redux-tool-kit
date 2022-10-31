import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: null
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const fetchedData = await axios.get(POSTS_URL);
    
    return fetchedData.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (postToAdd) => {
  try {
    const response = await axios.post(POSTS_URL, postToAdd);
  
    return response.data;
  } catch (error) {
    return error.message
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, body, userId) => {
        return {
          payload: {
            id: uuid(),
            title,
            body,
            userId
          },
        };
      },
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      action.payload.userId = Number(action.payload.userId)
      state.posts.push(action.payload);
    }
  }
});

// Selectors

export const selectAllPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectPostsFetchError = (state) => state.posts.error;

// Default exports

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
