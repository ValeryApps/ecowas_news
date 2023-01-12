import { Link } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import Moment from "react-moment";

export const MainPostCard = ({ posts, index }) => {
  let post;
  if (posts) {
    post = posts[index];
  }

  const date = new Date(post.createdAt * 1);

  return (
    <div className="bg-white mb-2 p-4 h-[380px] lg:mb-0 md:h-96 overflow-hidden ">
      <div className=" overflow-hidden">
        <img
          src={post.images && post?.images[0]}
          alt=""
          className="w-full md:h-[250px] h-[200px] hover:scale-150 transition duration-[2000ms] ease-in-out"
        />
      </div>
      <Link to={`/post/${post?.slug}`}>
        <h5 className="text-md font-bold line-clamp-2 mb-2" title={post?.title}>
          {post?.title}
        </h5>
      </Link>
      <div className="flex justify-start gap-7">
        <span className="flex justify-start gap-1 items-center bg-teal-800 text-white px-2 rounded-md hover:bg-teal-400 hover:text-gray-800 transition duration-300 ease-in-out text-sm">
          <AiTwotoneLike /> {post?.likesCount} likes
        </span>
        <span className="flex justify-start gap-1 items-center  bg-teal-800 text-white px-2 rounded-md hover:bg-teal-400 hover:text-gray-800 transition duration-300 ease-in-out text-sm">
          <FaCommentAlt /> {post?.commentsCount} comments
        </span>
      </div>
      <div className="flex justify-between mt-3">
        <Moment
          className=" bg-[#3377cc] text-white font-semibold text-xs rounded-md py-1 px-2 shadow-md w-fit"
          fromNow
          date={date}
        />{" "}
        <span>{post?.author}</span>
      </div>
    </div>
  );
};
