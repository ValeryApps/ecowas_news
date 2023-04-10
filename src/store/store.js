import { configureStore } from "@reduxjs/toolkit";
import posts from "./reducers/post";
import videos from "./reducers/video";
import auth from "./reducers/user";
import comments from "./reducers/comment";
import videoComments from "./reducers/videoComment";
import postPerCountry from "./reducers/post_country";
import postPerCategory from "./reducers/post_category";
import lang from "./reducers/lang";

export const store = configureStore({
  reducer: {
    posts,
    postPerCountry,
    postPerCategory,
    auth,
    comments,
    videoComments,
    lang,
    videos,
  },
});
