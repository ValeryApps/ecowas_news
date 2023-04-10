import React from "react";
import { countries } from "../../data/countries";
import { useNavigate } from "react-router-dom";

export const VideoCard = ({ video }) => {
  const item = countries.find((x) => x.value === video?.country);
  const navigate = useNavigate();
  return (
    <div
      className=" h-[200px] bg-white my-4 mx-4 relative shadow-md cursor-pointer overflow-hidden rounded-md"
      onClick={() => navigate(`/videos/${video?.slug}`)}
    >
      <img
        src={video?.images[0] || "/ecowas.png"}
        alt=""
        className="w-full  h-full"
      />
      <div className="bg-[#00000079]   min-w-full h-[200px] absolute top-0"></div>
      <img
        src={item?.flag}
        alt=""
        className="w-[20px] max-h-5 absolute top-0"
      />
      <div className="px-2 flex flex-col justify-between overflow-hidden absolute top-16">
        <div className=" text-white text-center">
          <h2 className="font-bold text-2xl line-clamp-2">{video?.title}</h2>
          <p>{video?.category}</p>
        </div>
        {/* <div className="flex gap-2 max-w-sm mb-2 overflow-hidden items-center">
          <span className="text-gray-300 font-bold">By: </span>{" "}
          <span className="text-gray-400 font-bold">{video?.author}</span>
        </div> */}
      </div>
    </div>
  );
};
