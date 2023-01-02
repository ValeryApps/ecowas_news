import React from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../../data/categories";

export const RightMenu = ({ isVisible, setIsVisible }) => {
  const { pathname } = useLocation();

  return (
    <div className={isVisible ? "menu_out" : "menu_in"}>
      <div className="flex ">
        {/* <IoClose
          size={30}
          onClick={() => setIsVisible(false)}
          style={{ cursor: "pointer" }}
          className="z-[60] text-white bg-slate-700 p-2 m-2 rounded-full"
        />{" "} */}
        <img src="../../../512.png" style={{ width: "100px" }} alt="" />
      </div>
      <div className="divider" />
      <ul>
        {categories.map((item) => (
          <div
            key={item.text}
            className={
              pathname === `/category/${item.link}`
                ? "country_item active"
                : "country_item"
            }
          >
            <Link
              to={`/category/${item.link}`}
              className="country_flex"
              onClick={() => setIsVisible(false)}
            >
              <span>{item.text} </span>
              <img src={item.icon} alt="" style={{ width: "30px" }} />
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};
