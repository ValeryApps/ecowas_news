import { Link } from "react-router-dom";
import { createMarkup } from "../../helpers/parseHTML";

export const RightPostCard = ({ post }) => {
  let mx_title = "";
  if (post?.title?.length > 30) {
    mx_title = `${post?.title?.substring(0, 30)}...`;
  } else {
    mx_title = post?.title;
  }

  return (
    <div className="h-[125px] flex gap-2 mb-2 lg:mb-0 items-start p-1 overflow-hidden bg-white   md:mt-0 pb-1 ">
      <div className="overflow-hidden min-w-[170px] max-w-[150px] h-[117px] cursor-pointer ">
        <img
          src={post?.images[0]}
          alt={post?.title}
          className="w-full h-full transition duration-700 ease-in-out hover:scale-110"
        />
      </div>
      <Link to={`/post/${post?.slug}`}>
        <h6 className="text-lg line-clamp-2 font-bold mb-2" title={post?.title}>
          {post?.title}
        </h6>
        <div className="hidden md:block intro line-clamp-1 ">
          <div
            dangerouslySetInnerHTML={createMarkup(
              `${post?.description.substring(0, 200)}`
            )}
          ></div>
        </div>
      </Link>
    </div>
  );
};
