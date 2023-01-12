import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const auth = getAuth();

export const login_user = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};
export const register_user = async (userInfo) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    await updateProfile(auth.currentUser, {
      displayName: `${userInfo.first_name} ${userInfo.last_name}`,
    });
    const user = userCredentials.user;
    await setDoc(doc(db, "users", user.uid), {
      displayName: `${userInfo.first_name} ${userInfo.last_name}`,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      roles: ["user"],
      uid: user.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};
export const logout = async () => {
  await auth.signOut();
};

export const getUserById = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    if (userData.exists()) {
      return userData.data();
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
