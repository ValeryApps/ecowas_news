import React from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/reducers/lang";
import { CategoriesLink } from "./CategoriesLink";

const lngs = {
  en: { nativeName: "English" },
  fr: { nativeName: "French" },
};

export const AppIntro = ({ visible, i18n, t }) => {
  const dispatch = useDispatch();

  // console.log(i18n.language);
  return (
    <div className="w-full bg-gradient-to-b from-teal-800 via-teal-600 to-teal-800 h-40 relative">
      <div>
        <h1 className="text-white text-7xl font-bold text-center drop-shadow-md mb-2">
          E24
        </h1>
        <h1 className="text-white text-2xl font-bold text-center drop-shadow-md ">
          Ecowas24 news
        </h1>
        {visible && (
          <div className="absolute bottom-0 w-full">
            <CategoriesLink t={t} />
          </div>
        )}
      </div>
      <div className="absolute right-3 w-fit">
        {Object.keys(lngs).map((lng) => (
          <button
            className={`${
              i18n.resolvedLanguage === lng ? "w-10 h-10" : "w-5 h-5"
            } rounded-md overflow-hidden mr-1 `}
            key={lng}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(lng);
              dispatch(setLanguage(i18n.language));
            }}
          >
            <img
              src={`/${lngs[lng].nativeName}.png`}
              alt=""
              className={`w-full rounded-md ${
                i18n.resolvedLanguage === lng ? "opacity-100" : "opacity-50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
