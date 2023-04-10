import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { GrAdd, GrList, GrUserSettings } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export const UserMenu = ({ logout }) => {
  const { loggedInAsAdmin, loggedInAsMod } = useAuthStatus();

  return (
    <div className="w-[150px] bg-white absolute right-0 text-black z-[60] p-1 top-10 shadow-md rounded-b-md">
      <ul className="flex flex-col gap-3">
        <li className=" flex items-center gap-3 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer p-2">
          <GrUserSettings />
          <span className="hover:text-teal-500 text-gray-700">SETTING</span>
        </li>
        {(loggedInAsAdmin || loggedInAsMod) && (
          <>
            <li className="hover:bg-gray-200 rounded-lg font-semibold ">
              <Link
                className="flex items-center gap-3 cursor-pointer p-2"
                to="/create-post"
              >
                <GrAdd />
                <span className="hover:text-teal-500 text-gray-700">
                  ADD POST
                </span>
              </Link>
            </li>
            <li className="hover:bg-gray-200 rounded-lg font-semibold ">
              <Link
                className="flex items-center gap-3 cursor-pointer p-2"
                to="/add-video"
              >
                <GrAdd />
                <span className="hover:text-teal-500 text-gray-700">
                  ADD Video
                </span>
              </Link>
            </li>
            <li className="hover:bg-gray-200 rounded-lg font-semibold ">
              <Link
                className="flex items-center gap-3 cursor-pointer p-2"
                to="/admin/posts"
              >
                <GrList />
                <span className="hover:text-teal-500 text-gray-700">POSTS</span>
              </Link>
            </li>
          </>
        )}
        <li
          className="hover:bg-gray-200 rounded-lg font-semibold flex items-center gap-3 cursor-pointer p-2"
          onClick={logout}
        >
          <FiLogOut />
          <span className="hover:text-teal-500 text-gray-700">SIGN OUT</span>
        </li>
      </ul>
    </div>
  );
};
