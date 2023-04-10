import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { VideoCard } from "../../components/videos/VideoCard";
import { Layout } from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { fetch_videos } from "../../firebase_api/videoApi";

export const Videos = ({ country }) => {
  const [videos, setVideos] = useState([]);
  const { language } = useSelector((state) => ({ ...state.lang }));
  useEffect(() => {
    const getVideos = async () => {
      const data = await fetch_videos(language);
      setVideos(data);
    };
    getVideos();
  }, [setVideos, language]);
  return (
    <Layout>
      <Helmet>
        <title>{country?.toUpperCase()}</title>
      </Helmet>
      <div className="flex flex-wrap">
        {videos?.map((story, index) => (
          <div
            key={index}
            className="w-full md:w-[47%] lg:w-[31%] xl:w-[23%] mr-3"
          >
            <VideoCard video={story} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
