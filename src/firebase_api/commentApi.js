import {
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
