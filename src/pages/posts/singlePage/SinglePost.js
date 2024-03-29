import { Layout } from "../../../components/layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import {
  delete_post,
  fetch_post_by_slug,
  likePost,
} from "../../../firebase_api/postApi";
import { getAuth } from "firebase/auth";
import { SpinnerComponent } from "../../../components/SpinnerComponent";
import Moment from "react-moment";
import {
  fetchCommentsAsync,
  getCommentCount,
} from "../../../store/reducers/comment";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "../../../store/reducers/comment";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { capitalize } from "../../../helpers/capitalize";
import { BsClock } from "react-icons/bs";
import { removePost } from "../../../store/reducers/post";
// import { useTranslation } from "react-i18next";

export const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [text, setText] = useState("");
  const { comments, count } = useSelector((state) => ({ ...state.comments }));
  const dispatch = useDispatch();
  const { loggedInAsAdmin, loggedInAsMod } = useAuthStatus();
  const { currentUser } = getAuth();
  const navigate = useNavigate();

  const { language } = useSelector((state) => ({ ...state.lang }));
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const story = await fetch_post_by_slug(slug);
        setPost(story);
        dispatch(await fetchCommentsAsync(story.id));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPost();
  }, [slug, dispatch]);

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
    dispatch(getCommentCount(post?.id));
  }, [dispatch, post]);

  const handleLikePost = async () => {
    if (currentUser?.uid) {
      const isLiked = await likePost(post?.id, currentUser?.uid);
      isLiked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
      setLike(isLiked);
    } else {
      navigate("/login");
    }
  };
  if (!post) {
    return <SpinnerComponent />;
  }
  const deletePost = async (id) => {
    window.confirm("Are you sure you want to delete?");
    await delete_post(id);
    dispatch(removePost(id));
  };
  const submitComment = async (e) => {
    e.preventDefault();
    if (currentUser === null) {
      navigate("/login");
      return;
    } else {
      const commentId = uuidv4();
      try {
        const comment = {
          text,
          commentId,
          postId: post?.id,
          commentedBy: currentUser?.uid,
          username: currentUser?.displayName,
          createdAt: Date.now(),
        };
        setCommentLoading(true);
        await create_comment(post?.id, comment, commentId);
        dispatch(addComment(comment));
        dispatch(getCommentCount(post?.id));
        setCommentLoading(false);

        setText("");
      } catch (error) {
        setCommentLoading(false);
        throw error;
      }
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
            <SimilarPosts
              category={post?.category}
              language={language}
              slug={post?.slug}
            />
          </div>
        </div>
        <div className="w-full bg-white rounded-t-xl">
          <div className="bg-teal-800 rounded-t-xl">
            <h2 className="text-4xl font-bold text-white py-3 px-2">
              {post?.title}
            </h2>
          </div>
          <div className="pb-6">
            <img src={post?.images[0]} alt="" className="w-full" />
            <div className="flex gap-6 px-3 bg-white shadow-md py-2 w-fit ml-2 items-center rounded-md">
              <span>
                Country: <strong> {capitalize(post?.country)}</strong>
              </span>
              <span>
                {" "}
                Category: <strong>{capitalize(post?.category)}</strong>
              </span>
              <span className="flex items-center gap-1">
                <BsClock />
                <Moment
                  fromNow
                  date={post?.createdAt * 1}
                  className=" font-bold"
                ></Moment>
              </span>
            </div>
            <div className="story_text [p:first-of-type:font-bold] px-3 text-gray-700 flex flex-col items-end ">
              <div
                dangerouslySetInnerHTML={createMarkup(post?.description)}
              ></div>
              <a
                className="bg-teal-600 text-white px-4 py-2 rounded-md"
                href={post.externUrl}
                target="_blank"
                rel="noreferrer"
              >
                Read More...
              </a>
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
              <div className="">{count} comments</div>
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

            <CreateComment
              commentLoading={commentLoading}
              setText={setText}
              submitComment={submitComment}
              text={text}
            />
          </div>
          {/* admin or author who owns this post can have access to this area or */}
          {(loggedInAsAdmin || loggedInAsMod) && (
            <div className=" flex gap-2 m-3">
              <AiFillDelete
                className="text-red-700 cursor-pointer"
                onClick={() => deletePost(post.id)}
              />
              <Link to={`/edit-post/${post.id}`}>
                <FaRegEdit className="text-green-700" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
