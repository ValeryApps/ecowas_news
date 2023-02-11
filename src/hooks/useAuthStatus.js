import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserById } from "../firebase_api/AuthApi";

export const useAuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);
  const [loggedInAsMod, setLoggedInAsMod] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          if (currentUser) {
            const user = await getUserById(currentUser?.uid);
            const admin = user ? user["roles"]?.indexOf("admin") !== -1 : false;
            const moderator = user
              ? user["roles"]?.indexOf("moderator") !== -1
              : false;
            if (moderator) {
              setLoggedInAsMod(true);
              setLoggedIn(true);
            } else if (admin) {
              setLoggedInAsAdmin(true);
              setLoggedIn(true);
            } else if (currentUser) {
              setLoggedIn(true);
            }
          } else {
            setLoggedIn(false);
          }
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      },
      []
    );
  }, [auth]);

  return { loading, loggedInAsAdmin, loggedInAsMod, loggedIn };
};
