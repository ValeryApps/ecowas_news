import React from "react";
import { CategoryCard } from "./CategoryCard";

export const CategoriesMenu = ({ categories, navigate, visible }) => {
  return (
    <div className="flex absolute opacity-70 bg-white w-full bottom-0 justify-between px-6 ">
      {categories.map((category) => (
        <CategoryCard
          navigate={navigate}
          visible={visible}
          category={category}
          key={category.link}
        />
      ))}
    </div>
  );
};
