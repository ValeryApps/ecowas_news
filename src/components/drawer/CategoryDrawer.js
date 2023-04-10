import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreHorizontal } from "react-icons/fi";
import { categories } from "../../data/categories";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/reducers/lang";
import { useTranslation } from "react-i18next";

const itemVariants = {
  closed: { x: 300 },
  open: { x: 0, transition: { duration: 1 } },
  exit: { x: 300, transition: { duration: 1 } },
};

const lngs = {
  en: { nativeName: "English" },
  fr: { nativeName: "French" },
};
export const CategoriesDrawer = ({ openCategories, setOpenCategories }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
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
              <div className="absolute top-1 right-3 w-fit">
                {Object.keys(lngs).map((lng) => (
                  <button
                    className={`${
                      i18n?.resolvedLanguage === lng ? "w-10 h-10" : "w-5 h-5"
                    } rounded-md overflow-hidden mr-1 `}
                    key={lng}
                    type="submit"
                    onClick={() => {
                      i18n?.changeLanguage(lng);
                      dispatch(setLanguage(i18n?.language));
                    }}
                  >
                    <img
                      src={`/${lngs[lng].nativeName}.png`}
                      alt=""
                      className={`w-full rounded-md ${
                        i18n?.resolvedLanguage === lng
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              {categories.map(({ text, icon, link }) => (
                <div
                  key={link}
                  className={`${
                    pathname === `/categories/${link}` ? "bg-slate-300" : ""
                  } flex justify-between items-center py-3 px-2 border-b-2 border-blue-200`}
                >
                  <p
                    onClick={() => {
                      setOpenCategories();
                      navigate(`/categories/${link}`);
                    }}
                    className="font-bold cursor-pointer"
                  >
                    {text}
                  </p>
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
