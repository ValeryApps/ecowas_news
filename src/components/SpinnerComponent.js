import React from "react";

export const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center bg-black opacity-80  fixed left-0 right-0 top-0 bottom-0 z-[80]">
      <img src={"/svg/Infinity2.svg"} alt="svg" />
    </div>
  );
};
