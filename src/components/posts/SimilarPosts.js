import React from "react";
import { Link } from "react-router-dom";
import { createMarkup } from "../../helpers/parseHTML";

export const SimilarPosts = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <div className="px-2 mb-4 border-b-2" key={post?.slug}>
          <Link to={`/post/${post?.slug}`}>
            <img src={post?.images[0]} alt="" className="w-full h-full" />
            <h3 className="font-bold">{post?.title}</h3>
            <div
              className="line-clamp-3"
              dangerouslySetInnerHTML={createMarkup(post?.description)}
            ></div>
          </Link>
        </div>
      ))}
    </>
  );
};
