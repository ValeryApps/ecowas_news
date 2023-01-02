import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Posts_per_category } from "../../firebase_api/postApi";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const fetPostsPerCategoryAsync = createAsyncThunk(
  "posts/fetPostsPerCategoryAsync",
  async (category) => {
    try {
      const data = await fetch_Posts_per_category(category);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const postPerCategorySlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetPostsPerCategoryAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetPostsPerCategoryAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(fetPostsPerCategoryAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default postPerCategorySlice.reducer;
