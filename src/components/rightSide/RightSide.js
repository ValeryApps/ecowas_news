import React from "react";
import { PostMedia } from "../posts/PostMedia";
import { VideoCard } from "../videos/VideoCard";

export const RightSide = ({ posts, videos }) => {
  const International = posts?.filter((x) => x.country === "International");
  return (
    <div className="w-full bg-white rounded-md ">
      <div className="p-2">
        <img src="/512.png" alt="" className="w-full object-cover" />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Ecowas24 Tv
        </h1>
        {videos.map((vid, index) => (
          <VideoCard video={vid} key={index} />
        ))}
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Editorials
        </h1>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Recent News
        </h1>
        {posts?.slice(0, 10).map((post) => (
          <PostMedia post={post} key={post?.slug} />
        ))}
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          International News
        </h1>
        {International?.slice(0, 10).map((post) => (
          <PostMedia post={post} key={post?.slug} />
        ))}
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Commercials
        </h1>
      </div>
    </div>
  );
};
