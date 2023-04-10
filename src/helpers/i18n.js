import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          des: {
            Home: "Home",
            Politics: "Politics",
            Economy: "Economy",
            Business: "Business",
            Entertainment: "Entertainment",
            Education: "Education",
            Technology: "Technology",
            Sports: "Sports",
            Health: "Health",
            Justice: "Justice",
            Security: "Security",
            Diplomacy: "Diplomacy",
            Editorial: "Editorial",
            Commentary: "Commentary",
            Society: "Society",
          },
        },
      },
      fr: {
        translation: {
          des: {
            Home: "Accueil",
            Politics: "Politique",
            Economy: "Economie",
            Business: "Business",
            Entertainment: "Culture",
            Education: "Education",
            Technology: "Technologie",
            Sports: "Sports",
            Health: "Santé",
            Justice: "Justice",
            Security: "Securité",
            Diplomacy: "Diplomatie",
            Editorial: "Editorial",
            Commentary: "Commentaire",
            Society: "Société",
          },
        },
      },
    },
  });

export default i18n;
