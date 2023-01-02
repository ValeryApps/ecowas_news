import React from "react";
import { Link } from "react-router-dom";

export const UserMenu = ({ logout }) => {
  return (
    <div className="userMenu z-[70]">
      <ul>
        <li>
          <Link to="/setting">SETTING</Link>
        </li>

        <li>
          <Link to="/create-post">ADD POST</Link>
        </li>

        <li onClick={logout}>LOGOUT</li>
      </ul>
    </div>
  );
};
