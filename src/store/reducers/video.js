import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_videos } from "../../firebase_api/videoApi";

const initialState = {
  videos: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetVideosAsync = createAsyncThunk(
  "video/fetVideosAsync",
  async (lang) => {
    try {
      const data = await fetch_videos(lang);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    createVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    updateVideo: (state, action) => {
      state.videos = [
        ...state.videos.filter((x) => x.id !== action.payload.id),
        action.payload,
      ];
    },
    removeVideo: (state, action) => {
      state.videos = [...state.videos.filter((x) => x.id !== action.payload)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetVideosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetVideosAsync.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetVideosAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllVideos = (state) => state.videos;

export const { createVideo, updateVideo, removeVideo } = videoSlice.actions;
export default videoSlice.reducer;
