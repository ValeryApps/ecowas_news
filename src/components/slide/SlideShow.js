import React from "react";
import { Link } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { capitalize } from "../../helpers/capitalize";

export const SlideShow = ({ posts }) => {
  const postsWithImages = posts.filter((x) => x.images.length > 0);

  const zoomOutProps = {
    duration: 2000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    scale: 0.1,
    arrows: true,
  };
  return (
    <div className="h-[22rem] flex  min-w-full gap-3 bg-white rounded-md shadow-md p-2">
      <div className="min-w-[50%] bg-[#bdb76b] h-[21rem]">
        <div className="slide-container relative max-h-[336px]">
          <Zoom {...zoomOutProps}>
            {postsWithImages?.slice(0, 10).map((post, index) => (
              <div
                className="each-slide overflow-hidden max-h-[390px]"
                key={index}
              >
                <img
                  src={post?.images[0]}
                  alt=""
                  className="w-full object-cover h-[336px]"
                />
                <div className="bg-[#00000080] relative px-2 bottom-32 max-w-[300px] min-h-[90px] rounded-r-2xl">
                  <Link
                    to={`/post/${post?.slug}`}
                    className="text-md text-white overflow-hidden"
                  >
                    {post?.title}
                  </Link>
                </div>
              </div>
            ))}
          </Zoom>
        </div>
      </div>
      <div className="hidden relative md:block min-w-[50%] lg:flex lg:flex-wrap gap-2">
        {postsWithImages.slice(1, 5).map((post, index) => (
          <div
            key={index}
            className={`${
              index + 1 === 1
                ? "w-[55%]"
                : index + 1 === 2
                ? "w-[42%]"
                : index + 1 === 3
                ? "w-[42%]"
                : index + 1 === 4
                ? "w-[55%]"
                : "w-[58%]"
            } h-[10.3rem] relative `}
          >
            <span className="absolute text-white font-bold bg-teal-800 left-1 top-1 px-4 py-1 rounded-tl-2xl rounded-br-2xl shadow-md">
              {capitalize(post?.country)}
            </span>
            <Link to={`/post/${post?.slug}`}>
              <img
                src={post?.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bg-[#00000080] bottom-3 min-h-[60px] w-[250px] rounded-tr-md rounded-br-md">
                <h2 className="text-white line-clamp-2">{post?.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
