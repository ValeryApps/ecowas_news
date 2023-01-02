import React from "react";
import { MainPostCard } from "./MainPostCard";
import { RightPostCard } from "./RightPostCard";
import "./post.css";

export const PostsCategory = ({ posts }) => {
  return (
    <>
      {posts && posts.length > 0 && (
        <div className="flex flex-wrap ">
          <div className="w-full __left sm:w-[40%] ">
            <MainPostCard posts={posts} index={0} />
          </div>
          <div className="w-full __right sm:w-[60%] lg:pl-1 flex flex-col justify-between ">
            {posts?.slice(1, 4).map((pts, index) => (
              <RightPostCard post={pts} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
