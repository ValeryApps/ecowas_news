import React from "react";
import { BsClock } from "react-icons/bs";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const RightPost = ({ post }) => {
  const date = new Date(post?.createdAt * 1);
  return (
    <div className="h-[125px] flex gap-2 lg:mb-0 items-start p-1 overflow-hidden bg-white md:mt-0 pb-1">
      <div className="overflow-hidden  min-w-[170px] max-w-[150px] h-[117px] cursor-pointer">
        <img
          src={post?.images[0] ?? "/ecowas.png"}
          alt=""
          className="w-full h-full"
        />
      </div>
      <Link to={`/post/${post?.slug}`}>
        <span className="flex items-center gap-1">
          <BsClock />
          <Moment
            fromNow
            date={post?.createdAt * 1}
            className="text-[10px] italic"
          ></Moment>
        </span>
        <h2 className="text-lg font-bold line-clamp-2 mb-2" title={post?.title}>
          {post?.title}
        </h2>
      </Link>
    </div>
  );
};
