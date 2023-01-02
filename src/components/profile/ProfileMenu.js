import React from "react";

export const ProfileMenu = ({ username, logout, navigate }) => {
  return (
    <div className="min-h-[400px] min-w-[100] flex flex-col bg-white -z-50">
      <span onClick={navigate}>{username}</span>
      <span onClick={logout}>Logout</span>
    </div>
  );
};
