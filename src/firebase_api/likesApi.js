import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const like = async (documentCollection, documentId, userId) => {
  const likeRef = doc(db, documentCollection, documentId);
  await updateDoc(likeRef,{})
};
