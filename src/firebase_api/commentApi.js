import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const create_comment = async (postId, comment, commentId) => {
  try {
    const commentsRef = doc(db, "comments", commentId);
    const postRef = doc(db, "posts", postId);
    const post = await getDoc(postRef);
    const commentCount = post.data()["commentsCount"];
    await setDoc(commentsRef, comment);
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
      commentsCount: commentCount + 1,
    });
  } catch (error) {
    throw error;
  }
};

export const get_Comments = async (postId) => {
  try {
    const commentRef = collection(db, "comments");
    const q = query(commentRef, where("postId", "==", postId));
    const comments = await getDocs(q);
    return comments.docs.map((comment) => comment.data());
  } catch (error) {
    throw error;
  }
};

export const likeComment = async (commentId, userId) => {
  const commentRef = doc(db, "comments", commentId);
  const comment = await getDoc(commentRef);
  const userHasLinked = comment.data()["likes"].indexOf(userId);
  const count = comment.data()["likesCount"];
  if (userHasLinked === -1) {
    await updateDoc(commentRef, {
      likes: arrayUnion(userId),
      likesCount: count + 1,
    });
    return true;
  } else {
    await updateDoc(commentRef, {
      likes: arrayRemove(userId),
      likesCount: count - 1,
    });
    return false;
  }
};
