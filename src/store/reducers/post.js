import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Posts } from "../../firebase_api/postApi";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetPostsAsync = createAsyncThunk(
  "posts/fetPostsAsync",
  async () => {
    try {
      const data = await fetch_Posts();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      state.posts = [
        ...state.posts.filter((x) => x.id !== action.payload.id),
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetPostsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.posts;

export const { createPost, updatePost } = postSlice.actions;
export default postSlice.reducer;
