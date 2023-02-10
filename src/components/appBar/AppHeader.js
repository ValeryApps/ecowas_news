import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import { CategoriesDrawer } from "../drawer/CategoryDrawer";
import { CountriesDrawer } from "../drawer/CountriesDrawer";
import { UserMenu } from "../UserMenu";
import { AppIntro } from "./AppIntro";

export const AppHeader = ({
  openCountries,
  setOpenCountries,
  openCategories,
  setOpenCategories,
}) => {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  // const { loggedIn } = useAuthStatus();
  const navigate = useNavigate();
  const auth = getAuth();
  const signOut = async () => {
    await auth.signOut();
    navigate("/");
  };
  return (
    <>
      <div className="hidden md:block">
        <AppIntro visible={visible} setVisible={setVisible} />
      </div>

      <div className="w-full bg-teal-900 sticky top-0 py-2 z-50">
        <nav className="max-w-[90%] flex justify-center gap-2 md:justify-between items-center mx-auto relative">
          <div className="fex gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-16">
                <Link to="/">
                  <img src="/images/e24.png" className="rounded-md" alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden gap-3 md:flex items-center">
            <Link
              to="/"
              className={` ${
                pathname === "/"
                  ? "bg-white text-teal-800 rounded-md hover:text-black "
                  : "text-white hover:text-teal-300 "
              } font-bold py-2 px-3 `}
            >
              Home
            </Link>
            {categories.slice(0, 3).map(({ text, icon, link }) => (
              <Link
                to={`/categories/${link}`}
                key={link}
                className={` ${
                  pathname === `/categories/${link}`
                    ? "bg-white text-teal-800 rounded-md hover:text-black "
                    : "text-white hover:text-teal-300 "
                } font-bold py-2 px-3  `}
              >
                {text}
              </Link>
            ))}
            <div
              onClick={() => setVisible(!visible)}
              className="text-white cursor-pointer"
            >
              More News...
            </div>
          </div>
          {!auth.currentUser ? (
            <div className="gap-3 flex items-center">
              <Link to="/login" className="text-white hover:text-teal-300  ">
                LOGIN
              </Link>
              <Link
                to="/register"
                className="bg-teal-500 px-3 py-1 rounded-md text-white"
              >
                SIGN UP
              </Link>
            </div>
          ) : (
            <div
              className="text-white cursor-pointer p-2"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              {auth.currentUser.displayName}
              {showMenu && <UserMenu logout={signOut} />}
            </div>
          )}
        </nav>
        <CountriesDrawer
          visible={openCountries}
          setVisible={setOpenCountries}
        />
        <CategoriesDrawer
          openCategories={openCategories}
          setOpenCategories={setOpenCategories}
        />
      </div>
    </>
  );
};
