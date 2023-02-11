import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetch_Posts_per_category } from "../../firebase_api/postApi";

import { MainPost } from "./MainPost";
import { RightPost } from "./RightPost";

export const PostCategory = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const { language } = useSelector((state) => ({ ...state.lang }));
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch_Posts_per_category(category, language);
      setPosts(data);
    };
    getPosts();
  }, [setPosts, category, language]);
  return (
    <div className="flex justify-between flex-wrap mb-2">
      <div className="w-full md:w-[41%]">
        <MainPost post={posts[0]} />
      </div>
      <div className="w-full md:w-[58%] flex flex-col gap-1">
        {posts.slice(1, 4).map((post, index) => (
          <RightPost post={post} key={index} />
        ))}
      </div>
    </div>
  );
};
