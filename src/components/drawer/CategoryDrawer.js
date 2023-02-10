import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreHorizontal } from "react-icons/fi";
import { categories } from "../../data/categories";

const itemVariants = {
  closed: { x: 300 },
  open: { x: 0, transition: { duration: 1 } },
  exit: { x: 300, transition: { duration: 1 } },
};
export const CategoriesDrawer = ({ openCategories, setOpenCategories }) => {
  const { pathname } = useLocation();

  return (
    <main>
      <div className="absolute top-4 px-2 right-0 ">
        <div onClick={setOpenCategories}>
          <FiMoreHorizontal className="text-white cursor-pointer" size={25} />
        </div>
      </div>
      <AnimatePresence>
        {openCategories && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="bg-white w-[300px]  absolute mb-10 mt-2 shadow-lg right-0 h-[100vh] overflow-scroll custom-scroll pb-16"
          >
            <div>
              <img src="/512.png" alt="" className="h-40 w-full" />
            </div>
            <div>
              {categories.map(({ text, icon, link }) => (
                <div
                  key={link}
                  className={`${
                    pathname === `/categories/${link}` ? "bg-slate-300" : ""
                  } flex justify-between items-center py-3 px-2 border-b-2 border-blue-200`}
                >
                  <Link to={`/categories/${link}`}> {text}</Link>
                  <img src={icon} alt="" className="w-7" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
