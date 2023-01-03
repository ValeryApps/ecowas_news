import React from "react";

export const IntroHeader = ({ country }) => {
  return (
    <div className="intro scrollbar relative ">
      <h1>E24</h1>
      <h3>Ecowas24 News</h3>
      <div className="absolute top-40 ml-6 flex items-center gap-2 ">
        <h4 className="text-4xl font-bold text-white text-center">
          {country?.name}
        </h4>

        <img
          src={country?.flag}
          alt={country?.value}
          className="h-[40px] shadow-2xl"
        />
      </div>
    </div>
  );
};
