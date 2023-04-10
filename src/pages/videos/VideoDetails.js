import YouTube from "react-youtube";
import { useNavigate, useParams } from "react-router";
import {
  create_video_comment,
  delete_video,
  fetch_video_by_slug,
  get_video_comments,
  like_video,
} from "../../firebase_api/videoApi";
import { v4 as uuidv4 } from "uuid";

import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth } from "firebase/auth";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import CreateComment from "../../components/comments/CreateComment";
import Comment from "../../components/comments/Comment";
import { useSelector } from "react-redux";
import { Layout } from "../../components/layout/Layout";
import { SpinnerComponent } from "../../components/SpinnerComponent";
import { createMarkup } from "../../helpers/parseHTML";
import Moment from "react-moment";
import { BsClock } from "react-icons/bs";
import { SimilarVideos } from "../../components/videos/SimilarVideos";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const VideoDetails = () => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { loggedInAsAdmin, loggedInAsMod } = useAuthStatus();
  const { currentUser } = getAuth();
  const navigate = useNavigate();

  const { language } = useSelector((state) => ({ ...state.lang }));
  const [player, setPlayer] = useState(null);
  const { slug } = useParams();

  const onReady = (e) => {
    setPlayer(e.target);
  };
  // const onPlayHandler = () => {
  //   player.playVideo();
  // };
  // const onPauseHandler = () => {
  //   player.pauseVideo();
  // };

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const vid = await fetch_video_by_slug(slug);
        setVideo(vid);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchVideo();
  }, [slug]);

  useEffect(() => {
    if (video?.likes?.indexOf(currentUser?.uid) !== -1) {
      setLike(true);
      setLikeCount(video?.likesCount);
    } else {
      setLike(false);
      setLikeCount(video?.likesCount);
    }
  }, [currentUser, video]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await get_video_comments(video?.id);
      setComments(data);
    };
    fetchComments();
  }, [video]);

  const handleLikeVideo = async () => {
    if (currentUser?.uid) {
      const isLiked = await like_video(video?.id, currentUser?.uid);
      isLiked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
      setLike(isLiked);
    } else {
      navigate("/login");
    }
  };
  if (!video || loading) {
    return <SpinnerComponent />;
  }
  const deleteVideo = async (id) => {
    window.confirm("Are you sure you want to delete?");
    await delete_video(id);
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
          videoId: video?.id,
          commentedBy: currentUser?.uid,
          username: currentUser?.displayName,
          createdAt: Date.now(),
        };
        setCommentLoading(true);
        await create_video_comment(video?.id, comment, commentId);
        setComments((prev) => [...prev, comment]);
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
      <Helmet title={video?.title}></Helmet>
      <div className=" bg-white w-full p-4">
        <div className="">
          <YouTube
            iframeClassName="w-full lg:w-[90%]"
            videoId={video.videoId}
            onReady={onReady}
            opts={{
              playerVars: {
                controls: 0,
                origin: "http://localhost:3000",
              },
            }}
          />
          <h3 className="text-2xl font-bold  text-neutral-700">
            {video.title}
          </h3>
          <div className="flex gap-8 my-5 border-2 border-neutral-200 rounded-lg lg:w-[90%] w-full p-2">
            <p className="">
              By: <strong>{video?.author}</strong>{" "}
            </p>
            <p className="">
              Category: <strong>{video?.category}</strong>{" "}
            </p>
            <p className="">
              Country: <strong>{video?.country}</strong>{" "}
            </p>
            <span className="flex items-center gap-1">
              <BsClock />
              <Moment
                fromNow
                date={video?.createdAt * 1}
                className=" font-bold"
              ></Moment>
            </span>
          </div>
          <div className="bg-neutral-100 p-2  w-full lg:w-[90%] rounded-md">
            <div
              dangerouslySetInnerHTML={createMarkup(video?.description)}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-2">
          {like ? (
            <MdFavorite
              className="text-red-800 text-2xl cursor-pointer"
              onClick={handleLikeVideo}
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="text-red-800 text-2xl cursor-pointer"
              onClick={handleLikeVideo}
            />
          )}

          {likeCount > 1 ? (
            <span>{likeCount}Likes</span>
          ) : (
            <span>{likeCount}Like</span>
          )}
          <div className="">{comments?.length} comments</div>
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
        <SimilarVideos
          category={video.category}
          language={language}
          slug={video.slug}
        />
        {/* admin or author who owns this post can have access to this area or */}
        {(loggedInAsAdmin || loggedInAsMod) && (
          <div className=" flex gap-2 m-3">
            <AiFillDelete
              className="text-red-700 cursor-pointer"
              onClick={() => deleteVideo(video.id)}
            />
            <Link to={`/edit-post/${video.id}`}>
              <FaRegEdit className="text-green-700" />
            </Link>
          </div>
        )}
      </div>
      {/* <button onClick={onPlayHandler} className="btn">
        Play
      </button>
      <button onClick={onPauseHandler} className="btn">
        Pause
      </button> */}
    </Layout>
  );
};
