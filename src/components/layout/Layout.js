import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetch_Posts } from "../../firebase_api/postApi";
import { RightSide } from "../rightSide/RightSide";

export const Layout = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { language } = useSelector((state) => ({ ...state.lang }));
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch_Posts(language);
      setPosts(data);
    };
    getPosts();
  }, [setPosts, language]);
  return (
    <div className="flex relative justify-between lg:px-10 mt-3 mb-8 gap-3">
      <div className="lg:w-[75%] min-h-[100%]">{children}</div>
      <div className="hidden lg:block lg:w-[25%] bg-white shadow-md">
        <RightSide posts={posts} />
      </div>
    </div>
  );
};
