import React from "react";

export const CategoryCard = ({ category, navigate, visible }) => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        navigate(`/category/${category.link}`);
        visible(false);
      }}
    >
      <div className="flex gap-1 items-center py-1">
        <div className="category_icon">
          <img src={category.icon} alt={category.text} className="h-10" />
        </div>
        <div className="category_text">{category.text}</div>
      </div>
    </div>
  );
};
