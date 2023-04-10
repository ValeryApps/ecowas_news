import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const PostMedia = ({ post }) => {
  const date = new Date(post?.createdAt * 1);
  return (
    <div className="flex gap-2 items-start p-1 overflow-hidden bg-neutral-100 md:mt-0 my-2 hover:bg-slate-100 hover:shadow-md  ">
      <div className="overflow-hidden min-w-[90px] h-[70px] cursor-pointer">
        <img
          src={post?.images[0] ?? "/ecowas.png"}
          alt=""
          className="w-[100px] h-full object-cover"
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
