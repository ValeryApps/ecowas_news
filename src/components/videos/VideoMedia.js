import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const VideoMedia = ({ video }) => {
  const date = new Date(video?.createdAt * 1);
  return (
    <div className="flex gap-2 items-start p-1 overflow-hidden bg-white md:mt-0 pb-1 border-b-2 border-b-s;late-300">
      <Link to={`/videos/${video?.slug}`}>
        <div className="overflow-hidden min-w-[90px] h-[70px] cursor-pointer">
          <img
            src={video?.image ?? "/ecowas.png"}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="absolute">
          <Moment fromNow date={date}></Moment>
          <h2 className="text-sm line-clamp-2" title={video?.title}>
            {video?.title}
          </h2>
        </div>
      </Link>
    </div>
  );
};
