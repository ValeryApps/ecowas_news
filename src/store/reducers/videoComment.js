import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_video_comments } from "../../firebase_api/videoApi";

const initialState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
};
export const fetchVideoCommentsAsync = createAsyncThunk(
  "videoComments/fetchVideoCommentsAsync",
  async (videoId) => {
    const data = await get_video_comments(videoId);
    return data;
  }
);
const videoCommentSlice = createSlice({
  name: "videoComment",
  initialState,
  reducers: {
    addVideoComment: (state, action) => {
      state.comments.push(action.payload);
    },
    getVideoCommentCount: (state, action) => {
      state.count = state.comments.filter(
        (x) => x.videoId === action.payload
      ).length;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoCommentsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchVideoCommentsAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.count = state.comments.length;
      state.status = "succeeded";
    });
    builder.addCase(fetchVideoCommentsAsync.rejected, (state, action) => {
      state.comments = null;
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const selectAllComments = (state) => state.comments;
export const { addVideoComment, getVideoCommentCount } =
  videoCommentSlice.actions;
export default videoCommentSlice.reducer;
