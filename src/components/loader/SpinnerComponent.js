import React from "react";
import { ClockLoader } from "react-spinners";

export const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center bg-black opacity-80 fixed left-0 right-0 top-0 bottom-0 z-[80]">
      <ClockLoader color="#fff" size={90} />
    </div>
  );
};
