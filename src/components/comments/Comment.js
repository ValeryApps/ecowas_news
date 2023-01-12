// import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { createMarkup } from "../../helpers/parseHTML";
// import { getAuth } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { likeComment } from "../../firebase_api/commentApi";

export default function Comment({ comment }) {
  // const auth = getAuth();
  // const [isLikeComment, setIsCommentLike] = useState(false);
  // const [LikeCommentCount, setLikeCommentCount] = useState(false);
  // const [userHasLiked, setUserHasLiked] = useState(false);

  // const handleLikeComment = async (commentId) => {
  //   const commentLiked = await likeComment(commentId, auth.currentUser?.uid);
  //   setIsCommentLike(commentLiked);
  //   commentLiked
  //     ? setLikeCommentCount(LikeCommentCount + 1)
  //     : setLikeCommentCount(LikeCommentCount - 1);
  //   commentLiked ? setUserHasLiked(true) : setUserHasLiked(false);
  // };
  // useEffect(() => {
  //   if (comment.likes?.indexOf(auth.currentUser?.uid)) {
  //     setUserHasLiked(true);
  //   } else {
  //     setUserHasLiked(false);
  //   }
  // }, [auth, comment]);
  return (
    <div className="flex items-center gap-2 ">
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
        {/* <div className="comment_actions">
          <div
            className="flex items-center gap-2 ml-2"
            onClick={() => handleLikeComment(comment?.id)}
          >
            {userHasLiked || isLikeComment ? (
              <MdFavorite className="text-red-800 text-1xl cursor-pointer" />
            ) : (
              <MdOutlineFavoriteBorder className="text-red-800 text-1xl cursor-pointer" />
            )}

            {LikeCommentCount > 1 ? (
              <span>{LikeCommentCount} Likes</span>
            ) : (
              <span>{LikeCommentCount} Like</span>
            )}
          </div>

          <span>
           
          </span>
        </div> */}
      </div>
    </div>
  );
}
