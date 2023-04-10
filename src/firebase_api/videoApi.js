import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetch_videos = async (lang) => {
  const videosRef = collection(db, "videos");
  if (lang === "en") {
    lang = "English";
  } else {
    lang = "French";
  }
  const videosQuery = query(
    videosRef,
    where("language", "==", lang),
    limit(10),
    orderBy("createdAt", "desc")
  );

  const videosSnapshot = await getDocs(videosQuery);

  const videos = videosSnapshot.docs.map((video) => {
    if (video.exists) {
      const date = video.data()["createdAt"].toString();
      return { ...video.data(), createdAt: date };
      // return video.data();
    }
    return null;
  });

  return videos;
};

export const fetch_video_by_slug = async (slug) => {
  try {
    const videosRef = await collection(db, "videos");
    const videosSnapshot = query(videosRef, where("slug", "==", slug));
    const videoSnap = await getDocs(videosSnapshot);
    console.log(videoSnap.docs);
    const video = videoSnap.docs[0];

    if (video.exists()) {
      return video.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const add_video = async (video) => {
  try {
    await setDoc(doc(db, "videos", video.id), video);
  } catch (error) {
    throw error;
  }
};

export const update_video = async (id, data) => {
  try {
    const videoRef = doc(db, "videos", id);
    await updateDoc(videoRef, data);
  } catch (error) {
    throw error;
  }
};

export const fetch_video_by_id = async (videoId) => {
  try {
    const videoRef = doc(db, "videos", videoId);
    const videoData = await getDoc(videoRef);
    if (videoData.exists()) {
      return videoData.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const fetch_videos_per_country = async (country, lang) => {
  if (lang === "en") {
    lang = "English";
  } else {
    lang = "French";
  }
  const videosRef = collection(db, "videos");
  const qu = query(
    videosRef,
    where("country", "==", country),
    where("language", "==", lang),
    orderBy("createdAt", "desc")
  );
  const videoData = await getDocs(qu);
  if (country === null) {
    return [];
  } else {
    return videoData.docs.map((video) => video.data());
  }
};

export const fetch_videos_per_category = async (category, lang) => {
  if (lang === "en") {
    lang = "English";
  } else {
    lang = "French";
  }
  const videosRef = collection(db, "videos");
  const qu = query(
    videosRef,
    where("category", "==", category),
    where("language", "==", lang),
    orderBy("createdAt", "desc")
  );
  const videoData = await getDocs(qu);
  return videoData.docs.map((video) => video.data());
};

export const like_video = async (videoId, userId) => {
  const videoRef = doc(db, "videos", videoId);
  const video = await getDoc(videoRef);
  const userHasLiked = video.data()["likes"].indexOf(userId);
  const count = video.data()["likesCount"];
  if (userHasLiked === -1) {
    await updateDoc(videoRef, {
      likes: arrayUnion(userId),
      likesCount: count + 1,
    });
    return true;
  } else {
    await updateDoc(videoRef, {
      likes: arrayRemove(userId),
      likesCount: count - 1,
    });
    return false;
  }
};

export const delete_video = async (videoId) => {
  let response = "";
  const videoRef = doc(db, "videos", videoId);
  const videoCommentsRef = collection(db, "videoComments");
  const videoCommentQuery = query(
    videoCommentsRef,
    where("videoId", "==", videoId)
  );
  const commentsSnap = await getDocs(videoCommentQuery);
  commentsSnap.docs.forEach(async (videoComment) => {
    const comRef = doc(db, "videoComments", videoComment.id);
    await deleteDoc(comRef);
  });
  await deleteDoc(videoRef);
  response = `Video with id: ${videoId} has been deleted`;
  return response;
};

export const create_video_comment = async (
  videoId,
  videoComment,
  commentId
) => {
  try {
    const commentsRef = doc(db, "videoComments", commentId);
    const videoRef = doc(db, "videos", videoId);
    const video = await getDoc(videoRef);
    const commentCount = video.data()["commentsCount"];
    await setDoc(commentsRef, videoComment);
    await updateDoc(videoRef, {
      videoComments: arrayUnion(videoComment),
      commentsCount: commentCount + 1,
    });
  } catch (error) {
    throw error;
  }
};

export const get_video_comments = async (videoId) => {
  try {
    const commentRef = collection(db, "videoComments");
    const q = query(commentRef, where("videoId", "==", videoId));
    const videoComments = await getDocs(q);
    return videoComments.docs.map((videoComment) => videoComment.data());
  } catch (error) {
    throw error;
  }
};
