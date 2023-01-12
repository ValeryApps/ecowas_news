import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserById } from "../firebase_api/AuthApi";

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInAsAuthor, setLoggedInAsAuthor] = useState(false);
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkIsAdmin = async () => {
      const auth = getAuth();
      let user;
      if (auth.currentUser?.uid) {
        user = await getUserById(auth.currentUser?.uid);
      }

      let isAuthor = false;
      let isAdmin = false;
      if (user) {
        isAuthor = user["roles"]?.indexOf("author") !== -1;
        isAdmin = user["roles"]?.indexOf("admin") !== -1;
      }

      onAuthStateChanged(
        auth,
        (currentUser) => {
          if (currentUser && isAuthor) {
            setLoggedInAsAuthor(true);
          } else if (currentUser && isAdmin) {
            setLoggedInAsAdmin(true);
          } else if (currentUser) {
            setLoggedIn(true);
          }
          setIsLoading(false);
        },
        []
      );
    };
    checkIsAdmin();
  }, []);

  return { isLoading, loggedInAsAuthor, loggedIn, loggedInAsAdmin };
};
