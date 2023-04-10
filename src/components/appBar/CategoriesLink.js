import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

export const CategoriesLink = ({ setVisible, t }) => {
  return (
    <div className="flex items-center gap-3 shadow-md px-2 rounded-md bg-white opacity-50 justify-between">
      {categories.slice(3).map(({ text, link, icon }) => (
        <div key={link} className="flex items-center">
          <img src={icon} alt="" className="h-7 w-9 rounded-md" />
          <Link
            to={`/categories/${link}`}
            className="text-teal-800 font-bold text-md p-3"
            onClick={() => setVisible(false)}
          >
            {t(`des.${text}`)}
          </Link>
        </div>
      ))}
    </div>
  );
};
