import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Comments } from "../../firebase_api/commentApi";

const initialState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
};
export const fetchCommentsAsync = createAsyncThunk(
  "comments/fetchCommentAsync",
  async (postId) => {
    const data = await get_Comments(postId);
    return data;
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    getCommentCount: (state, action) => {
      state.count = state.comments.filter(
        (x) => x.postId === action.payload
      ).length;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCommentsAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.count = state.comments.length;
      state.status = "succeeded";
    });
    builder.addCase(fetchCommentsAsync.rejected, (state, action) => {
      state.comments = null;
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const selectAllComments = (state) => state.comments;
export const { addComment, getCommentCount } = commentSlice.actions;
export default commentSlice.reducer;
