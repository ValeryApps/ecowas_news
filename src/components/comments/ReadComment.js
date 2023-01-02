import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { createMarkup } from "../../helpers/parseHTML";

export const ReadComment = ({
  comment,
  handleLikeComment,
  commentLike,
  commentLikeCount,
}) => {
  return (
    <div className="flex items-center gap-2 min-w-[300px] min-h-[200px] bg-white ">
      <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green-900">
        <span className="text-4xl text-white font-bold">
          {" "}
          {comment?.username?.charAt(0)}
        </span>
      </div>
      <div className="comment_col">
        <div className="comment_wrap">
          <span className="comment_name">{comment?.username}</span>
          <div className="comment_text">
            <div dangerouslySetInnerHTML={createMarkup(comment?.text)}></div>
          </div>
        </div>
        <div className="comment_actions">
          <div
            className="flex items-center gap-2 ml-2"
            onClick={handleLikeComment}
          >
            {commentLike ? (
              <MdFavorite className="text-red-800 text-1xl cursor-pointer" />
            ) : (
              <MdOutlineFavoriteBorder className="text-red-800 text-1xl cursor-pointer" />
            )}

            {commentLikeCount > 1 ? (
              <span>{commentLikeCount} Likes</span>
            ) : (
              <span>{commentLikeCount} Like</span>
            )}
          </div>

          <span>
            {/* <Moment fromNow interval={30}> */}
            {/* {comment?.commentAt} */}
            {/* </Moment> */}
          </span>
        </div>
      </div>
    </div>
  );
};
