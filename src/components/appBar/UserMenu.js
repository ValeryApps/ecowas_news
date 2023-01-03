import React from "react";
import { Link } from "react-router-dom";
import { GrUserSettings, GrAdd } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

export const UserMenu = ({ logout }) => {
  return (
    <div className="h-[150px] w-[150px] bg-white absolute right-3 text-black z-[60] p-1">
      <ul>
        <li className="hover:bg-gray-200 rounded-lg font-semibold  ">
          <Link className="flex items-center gap-3" to="/setting">
            <GrUserSettings />

            <span className="hover:text-teal-500 text-gray-700"> SETTING</span>
          </Link>
        </li>

        <li className="hover:bg-gray-200 rounded-lg font-semibold ">
          <Link className="flex items-center gap-3" to="/create-post">
            <GrAdd />

            <span className="hover:text-teal-500 text-gray-700"> ADD POST</span>
          </Link>
        </li>

        <li
          className="hover:bg-gray-200 rounded-lg font-semibold flex items-center gap-3"
          onClick={logout}
        >
          <FiLogOut />
          <span className="hover:text-teal-500  text-gray-700"> LOGOUT</span>
        </li>
      </ul>
    </div>
  );
};
