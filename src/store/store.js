import { configureStore } from "@reduxjs/toolkit";
import posts from "./reducers/post";
import auth from "./reducers/user";
import comments from "./reducers/comment";
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
    lang,
  },
});
