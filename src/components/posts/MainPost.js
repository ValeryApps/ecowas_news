import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const MainPost = ({ post }) => {
  const date = new Date(post?.createdAt * 1);

  return (
    <div className="bg-white mb-2 p-4 h-[380px] lg:mb-0 md:h-96 overflow-hidden relative">
      <div className="overflow-hidden h-[351px] relative">
        <div className="absolute flex gap-3 top-1 left-1 text-[11px]">
          <span className="py-2 px-4 bg-white text-teal-800 rounded-tl-2xl rounded-br-2xl shadow-md">
            {post?.country.toUpperCase()}
          </span>
          <span className="py-2 px-4 bg-white text-teal-800 rounded-tl-2xl rounded-br-2xl shadow-md">
            {post?.author.toUpperCase()}
          </span>
          <Moment
            className="py-2 px-4 bg-white text-teal-800  rounded-tl-2xl rounded-br-2xl shadow-md"
            fromNow
            date={date}
          ></Moment>
        </div>
        <img
          src={post?.images[0] ?? "ecowas.png"}
          alt=""
          className="w-full h-[351px]  hover:scale-125 transition duration-500 ease-in-out cursor-pointer object-cover"
        />
        <div className="absolute bottom-4 bg-[#00000080] p-5 w-full">
          <Link to={`/post/${post?.slug}`}>
            <h2 className="text-md text-white font-bold line-clamp-2 mb-2">
              {post?.title}
            </h2>
          </Link>
        </div>
        <div className="absolute flex gap-6 bottom-1 left-1 font-bold text-teal-800 bg-[rgba(255,255,255,0.7)] px-3 rounded-full shadow-md">
          <span> Likes: {post?.likesCount}</span>
          <span> comments: {post?.commentsCount}</span>
        </div>
      </div>
    </div>
  );
};
