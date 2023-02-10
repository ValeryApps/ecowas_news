import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const PostMedia = ({ post }) => {
  const date = new Date(post?.createdAt * 1);
  return (
    <div className="flex gap-2 items-start p-1 overflow-hidden bg-white md:mt-0 pb-1 border-b-2 border-b-s;late-300">
      <div className="overflow-hidden min-w-[90px] h-[70px] cursor-pointer">
        <img
          src={post?.images[0] ?? "/ecowas.png"}
          alt=""
          className="w-full h-full"
        />
      </div>
      <Link to={`/post/${post?.slug}`}>
        <Moment fromNow date={date}></Moment>
        <h2 className="text-sm line-clamp-2" title={post?.title}>
          {post?.title}
        </h2>
      </Link>
    </div>
  );
};
