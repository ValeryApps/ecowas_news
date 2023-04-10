import { VideoCard } from "./VideoCard";
import { fetch_videos_per_category } from "../../firebase_api/videoApi";
import { useState } from "react";
import { useEffect } from "react";
import { ClockLoader } from "react-spinners";

export const SimilarVideos = ({ category, language, slug }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      const data = await fetch_videos_per_category(category, language);
      setLoading(false);
      setVideos(data.filter((x) => x.slug !== slug));
    };
    getVideos();
  }, [category, setVideos, language, slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <ClockLoader size={70} />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap">
      {videos?.map((video, index) => (
        <div key={index} className=" md:w-[50%] lg:w-[33%]">
          <VideoCard video={video} key={video.id} />
        </div>
      ))}
    </div>
  );
};
