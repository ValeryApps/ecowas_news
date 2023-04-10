import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { countries } from "../../data/countries";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/reducers/lang";
import { useTranslation } from "react-i18next";

const itemVariants = {
  closed: { x: -300 },
  open: { x: 0, transition: { duration: 1 } },
  exit: { x: -300, transition: { duration: 1 } },
};

const lngs = {
  en: { nativeName: "English" },
  fr: { nativeName: "French" },
};
export const CountriesDrawer = ({ visible, setVisible }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <main>
      <div className="absolute top-4 px-2">
        <div onClick={setVisible}>
          {visible ? (
            <AiOutlineClose className="text-white cursor-pointer" size={25} />
          ) : (
            <FiMenu className="text-white cursor-pointer" size={25} />
          )}
        </div>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="bg-white w-[300px] absolute pb-14 mt-2 mb-5 shadow-lg h-[100vh] overflow-scroll custom-scroll"
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
              {countries.map(({ name, value, flag }) => (
                <div
                  key={name}
                  className={`${
                    pathname === `/countries/${value}` ? "bg-slate-300" : ""
                  } flex justify-between items-center py-3 px-2 border-b-2 border-blue-200`}
                >
                  <p
                    onClick={() => {
                      setVisible();
                      navigate(`/countries/${value}`);
                    }}
                    className="font-bold cursor-pointer"
                  >
                    {name}
                  </p>
                  <img src={flag} alt="" className="w-7" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
