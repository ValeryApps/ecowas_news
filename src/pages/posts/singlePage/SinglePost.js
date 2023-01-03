import { Layout } from "../../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { createMarkup } from "../../../helpers/parseHTML";
import "../post.css";
import "./singlePage.css";
import { SimilarPosts } from "./SimilarPost";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import CreateComment from "../../../components/comments/CreateComment";
import Comment from "../../../components/comments/Comment";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { create_comment } from "../../../firebase_api/commentApi";
import { fetch_post_by_slug, likePost } from "../../../firebase_api/postApi";
import { getAuth } from "firebase/auth";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import Moment from "react-moment";
import { fetchCommentsAsync } from "../../../store/reducers/comment";
import { likeComment } from "../../../firebase_api/commentApi";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "../../../store/reducers/comment";

export const SinglePost = () => {
  const [isComment, setIsComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [post, setPost] = useState();
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentLike, setCommentLike] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [text, setText] = useState("");
  const { comments } = useSelector((state) => ({ ...state.comments }));
  const dispatch = useDispatch();
  // let myCommentId = "";

  const { slug } = useParams();
  const { currentUser } = getAuth();
  const similarStories = posts?.filter(
    (x) => x.category === post?.category && x.slug !== post?.slug
  );

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        let story;
        if (posts?.length > 0) {
          story = posts?.find((x) => x.slug === slug);
          setLoading(false);
          dispatch(await fetchCommentsAsync(story.id));
        } else {
          story = await fetch_post_by_slug(slug);
          dispatch(await fetchCommentsAsync(story.id));
          setLoading(false);
        }
        setPost(story);
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchPost();
  }, [slug, posts, dispatch]);

  useEffect(() => {
    if (post?.likes?.indexOf(currentUser?.uid) !== -1) {
      setLike(true);
      setLikeCount(post?.likesCount);
    } else {
      setLike(false);
      setLikeCount(post?.likesCount);
    }
  }, [currentUser, post]);

  useEffect(() => {
    setCommentCount(post?.commentsCount);
  }, [setCommentCount, post]);

  const handleLikePost = async () => {
    const isLiked = await likePost(post?.id, currentUser?.uid);
    isLiked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
    setLike(isLiked);
  };
  if (!post || loading) {
    return <SpinnerComponent />;
  }
  const handleLikeComment = async (commentId) => {
    const isCommentLike = await likeComment(commentId, currentUser?.uid);
    setCommentLike(isCommentLike);
    isCommentLike
      ? setCommentLikeCount(commentLikeCount + 1)
      : setCommentLikeCount(commentLikeCount - 1);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const commentId = uuidv4();
    try {
      const comment = {
        text,
        commentId,
        postId: post?.id,
        commentedBy: currentUser?.uid,
        likeCount: 0,
        likes: [],
        username: currentUser?.displayName,
        createdAt: Date.now(),
      };
      setCommentLoading(true);
      await create_comment(post?.id, comment, commentId);
      setCommentCount(commentCount + 1);
      dispatch(addComment(comment));
      setCommentLoading(false);

      setText("");
    } catch (error) {
      setCommentLoading(false);
      throw error;
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <div className="flex justify-between w-full gap-3">
        <div className="hidden md:block md:w-[40%] bg-white ">
          <h1 className="text-3xl font-semibold py-2 text-center bg-teal-800 text-white rounded-t-md">
            Similar Stories
          </h1>
          <div className="pt-2">
            <SimilarPosts posts={similarStories} />
          </div>
        </div>
        <div className="w-full bg-white rounded-t-xl">
          <div className="bg-teal-800 rounded-t-xl">
            <h2 className="text-4xl font-bold text-white py-3 px-2">
              {post?.title}
            </h2>
          </div>
          <div className="pb-6">
            <img src={post?.images[0]} alt={post?.title} className="w-full" />
            <div className="story_meta px-3">
              <span>
                Country: {post?.country} Category: {post?.category}
              </span>
              <Moment
                fromNow
                date={post?.createdAt * 1}
                className="ml-3"
              ></Moment>
            </div>
            <div className="story_text px-3 text-gray-700">
              <div
                dangerouslySetInnerHTML={createMarkup(post?.description)}
              ></div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              {like ? (
                <MdFavorite
                  className="text-red-800 text-2xl cursor-pointer"
                  onClick={handleLikePost}
                />
              ) : (
                <MdOutlineFavoriteBorder
                  className="text-red-800 text-2xl cursor-pointer"
                  onClick={handleLikePost}
                />
              )}

              {likeCount > 1 ? (
                <span>{likeCount} Likes</span>
              ) : (
                <span>{likeCount} Like</span>
              )}
              <div className="">{commentCount} comments</div>
            </div>
          </div>
          <div className="px-3 pb-5">
            {comments &&
              comments?.map((comment) => {
                // setCommentLikeCount(comment.likesCount);
                return (
                  <div key={comment.commentId}>
                    <Comment comment={comment} />
                  </div>
                );
              })}
            {!isComment && (
              <button
                className="bg-teal-900 text-white p-2 rounded-lg"
                onClick={() => setIsComment((prev) => !prev)}
              >
                Add your comment
              </button>
            )}
            {currentUser && isComment && (
              <CreateComment
                commentLoading={commentLoading}
                setText={setText}
                submitComment={submitComment}
                text={text}
              />
            )}
            {!currentUser && isComment && (
              <>
                <span className="text-red-700 font-semibold mr-3">
                  You have to login before you comment
                </span>
                <Link to="/login">Login!</Link>
              </>
            )}
          </div>
          <div className=" flex gap-2 m-3">
            <AiFillDelete className="text-red-700" />
            <Link to={`/edit-post/${post.id}`}>
              <FaRegEdit className="text-green-700" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
