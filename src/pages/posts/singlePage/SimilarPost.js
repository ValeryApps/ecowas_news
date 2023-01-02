import React from "react";
import { Link } from "react-router-dom";
import { createMarkup } from "../../../helpers/parseHTML";

export const SimilarPosts = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <div className="px-2 mb-4  border-b-2" key={post.slug}>
          <Link to={`/post/${post.slug}`}>
            <div className="">
              <img src={post.images[0]} alt="" className="w-full h-full" />
            </div>

            <h3 className=" font-bold">{post?.title.substring(0, 50)}...</h3>

            <div className="text-sm">
              <div
                dangerouslySetInnerHTML={createMarkup(
                  `${post?.description?.substring(0, 100)}...`
                )}
              ></div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
