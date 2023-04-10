import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Posts_per_country } from "../../firebase_api/postApi";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const fetPostsPerCountryAsync = createAsyncThunk(
  "posts/fetPostsPerCountryAsync",
  async (country) => {
    try {
      const data = await fetch_Posts_per_country(country);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const postPerCountrySlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetPostsPerCountryAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetPostsPerCountryAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(fetPostsPerCountryAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default postPerCountrySlice.reducer;
