import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
import "./slide.css";

export const NewsSlideShow = ({ posts }) => {
  const [postsWithImage, setPostsWithImage] = useState([]);

  const zoomOutProperties = {
    duration: 2000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    scale: 0.1,
    arrows: true,
  };
  useEffect(() => {
    posts?.forEach((post) => {
      if (post.images.length > 0) {
        setPostsWithImage((prev) => [...prev, post]);
      }
    });
  }, [posts]);
  const imagePosts = posts.filter((x) => x.images.length > 0);
  return (
    <div className="h-[21rem] flex min-w-full gap-3 ">
      <div className="min-w-[50%] bg-[#bdb76b] h-[21rem]">
        <div className="slide-container relative max-h-[336px]">
          <Zoom {...zoomOutProperties}>
            {imagePosts?.slice(0, 10).map((post, index) => {
              return (
                <div
                  className="each-slide overflow-hidden  max-h-[390px]"
                  key={index}
                >
                  <img
                    src={post?.images[0]}
                    alt=""
                    className=" w-full object-cover h-[336px]"
                  />
                  <div className="bg-[#00000080] relative px-2 bottom-32 max-w-[300px] min-h-[90px] rounded-r-2xl">
                    <Link to={`/post/${post?.slug}`}>
                      <h1 className="text-md text-white line-clamp-3 overflow-hidden">
                        {post?.title}
                      </h1>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Zoom>
        </div>
      </div>
      <div className=" hidden relative md:block min-w-[50%] bg-white h-[21rem]">
        {posts?.slice(0, 4).map((post, index) => {
          return (
            <div className={`index${index + 1}`} key={index}>
              <img src={post?.images[0]} alt="" />
              <div className="title mx-auto rounded-md px-1 ">
                <Link to={`/post/${post?.slug}`}>
                  <h5
                    className="line-clamp-2 overflow-hidden"
                    title={post?.title}
                  >
                    {post?.title}
                  </h5>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
