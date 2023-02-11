import React from "react";

export const CategoryPill = ({ category, children, t }) => {
  return (
    <div className="mt-6 mb-[10px]">
      <div className="text-[#78f1dd] bg-[#047260] p-1 w-[150px] text-center rounded-t-md font-bold flex items-center gap-2">
        <span>{t(`des.${category}`)}</span>
        <span>{children}</span>
      </div>
      <div className="border border-[#047260] mb-1"></div>
    </div>
  );
};
