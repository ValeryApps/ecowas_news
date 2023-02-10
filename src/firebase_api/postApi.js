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
} from "firebase/firestore";
import { db } from "../firebase";

export const fetch_Posts = async () => {
  const postsRef = collection(db, "posts");

  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

  const postsSnapshot = await getDocs(postsQuery);

  const posts = postsSnapshot.docs.map((post) => {
    if (post.exists) {
      const date = post.data()["createdAt"].toString();
      return { ...post.data(), createdAt: date };
      // return post.data();
    }
    return null;
  });

  return posts;
};
export const fetch_post_by_slug = async (slug) => {
  try {
    const postsRef = await collection(db, "posts");
    const postsSnapshot = query(postsRef, where("slug", "==", slug));
    const postSnap = await getDocs(postsSnapshot);
    const post = postSnap.docs[0];
    if (post.exists()) {
      return post.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const add_post = async (post) => {
  try {
    await setDoc(doc(db, "posts", post.id), post);
  } catch (error) {
    throw error;
  }
};

export const update_post = async (id, data) => {
  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, data);
  } catch (error) {
    throw error;
  }
};
export const fetch_post_by_id = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postData = await getDoc(postRef);
    if (postData.exists()) {
      return postData.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const fetch_Posts_per_country = async (country) => {
  const postsRef = collection(db, "posts");
  const qu = query(
    postsRef,
    where("country", "==", country),
    orderBy("createdAt", "desc")
  );
  const postData = await getDocs(qu);
  if (country === null) {
    return [];
  } else {
    return postData.docs.map((post) => post.data());
  }
};
export const fetch_Posts_per_category = async (category) => {
  const postsRef = collection(db, "posts");
  const qu = query(
    postsRef,
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const postData = await getDocs(qu);
  return postData.docs.map((post) => post.data());
};

export const likePost = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);
  const post = await getDoc(postRef);
  const userHasLiked = post.data()["likes"].indexOf(userId);
  const count = post.data()["likesCount"];
  if (userHasLiked === -1) {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
      likesCount: count + 1,
    });
    return true;
  } else {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
      likesCount: count - 1,
    });
    return false;
  }
};
export const delete_post = async (postId) => {
  let response = "";
  const postRef = doc(db, "posts", postId);
  const postCommentsRef = collection(db, "comments");
  const postCommentQuery = query(
    postCommentsRef,
    where("postId", "==", postId)
  );
  const commentsSnap = await getDocs(postCommentQuery);
  commentsSnap.docs.forEach(async (comment) => {
    const comRef = doc(db, "comments", comment.id);
    await deleteDoc(comRef);
  });
  await deleteDoc(postRef);
  response = `Post with id: ${postId} has been deleted`;
  return response;
};
