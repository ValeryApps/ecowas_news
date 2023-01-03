import { Link, useLocation, useNavigate } from "react-router-dom";
import { IntroHeader } from "./IntroHeader";
import "./appBar.css";
import { AppDrawer } from "./AppDrawer";
import { useState } from "react";
import {
  IoReorderFourOutline,
  IoClose,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { UserMenu } from "./UserMenu";
import { CategoriesMenu } from "./CategoriesMenu";
import { categories } from "../../data/categories";
import { RightMenu } from "./RightMenu";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth } from "firebase/auth";
import { countries } from "../../data/countries";

const navItems = [{ name: "Home", path: "/" }];

export const AppHeader = ({ visible, setVisible, isVisible, setIsVisible }) => {
  // const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  // const [visible, setVisible] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);
  // const token = user?.token ? jwt_decode(user?.token) : "";
  // const { isModerator } = token;
  const [showCategories, setShowCategories] = useState(false);
  let { loggedIn } = useAuthStatus();
  const auth = getAuth();
  const logout = async () => {
    await auth.signOut();
    loggedIn = false;
    navigate("/");
  };
  console.log(pathname.substring(pathname.lastIndexOf("/") + 1));

  const nation = countries.find(
    (x) => x.value === pathname.substring(pathname.lastIndexOf("/") + 1)
  );

  return (
    <>
      <div className="top_header relative hidden md:block">
        <IntroHeader country={nation} />
        {showCategories && (
          <CategoriesMenu
            categories={categories.slice(3)}
            navigate={navigate}
            visible={setShowCategories}
          />
        )}
      </div>
      <nav className="w-full bg-teal-800 shadow  top-0 z-50">
        <div className=" flex justify-between items-center  mx-4">
          <div className="app_left z-[60]">
            {visible ? (
              <IoClose
                size={30}
                onClick={() => setVisible(false)}
                style={{ cursor: "pointer" }}
                className="z-[60]"
              />
            ) : (
              <IoReorderFourOutline
                size={30}
                onClick={() => setVisible(true)}
                style={{ cursor: "pointer" }}
              />
            )}
            <h1
              onClick={() => navigate("/")}
              style={{ fontWeight: "700", cursor: "pointer" }}
            >
              <div className="E24_icon">
                <img src="../../../180.png" alt="" />
              </div>
            </h1>
          </div>
          <div className=" hidden md:flex">
            <div>
              {navItems.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className={`${
                    path === pathname
                      ? "text-[#05396d] bg-white rounded-[3px]"
                      : "text-white"
                  } p-2`}
                >
                  {name}
                </Link>
              ))}
            </div>
            <div>
              {categories.slice(0, 3).map(({ text, link }) => (
                <Link
                  key={text}
                  to={`/category/${link}`}
                  className={`${
                    pathname === `/category/${link}`
                      ? "text-[#05396d] bg-white rounded-[3px]"
                      : "text-white"
                  } p-2`}
                >
                  {text}
                </Link>
              ))}
            </div>
            <Link to="#" onClick={() => setShowCategories((prev) => !prev)}>
              <div className=" text-white flex items-center gap-1">
                More stories
                <IoEllipsisHorizontal />
              </div>
            </Link>
          </div>
          <div>
            <div className="app_right_items flex items-center">
              {/* <div>
                <SearchComponent />
              </div> */}
              {!loggedIn ? (
                <Link
                  className={`${
                    pathname === "/login"
                      ? "text-[#05396d] bg-white rounded-[3px]"
                      : "text-white"
                  } p-2`}
                  to="/login"
                >
                  Login
                </Link>
              ) : (
                <div
                  className="user_nav_item"
                  onMouseOver={() => setShowUserMenu(true)}
                  onMouseOut={() => setShowUserMenu(false)}
                  // onClick={}
                >
                  {/* <img src={user.picture} alt="" />{" "}? */}
                  <span className="text-white p-2">
                    {auth.currentUser?.displayName?.split(" ")[0]}
                    {showUserMenu && <UserMenu logout={logout} />}
                  </span>
                </div>
              )}
              <div className="block text-white ml-3 md:hidden z-[60]">
                {isVisible ? (
                  <IoClose
                    size={30}
                    onClick={() => setIsVisible(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IoEllipsisHorizontal
                    size={30}
                    onClick={() => setIsVisible(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <AppDrawer
          navItems={navItems}
          visible={visible}
          setVisible={setVisible}
        />
        <div className="menu_right">
          <RightMenu isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </nav>
    </>
  );
};
