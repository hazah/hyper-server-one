import i18n from "i18next";
import middleware from "i18next-http-middleware";
import { initReactI18next } from "react-i18next";

i18n
  .use(middleware.LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          homeTitle: "Home",
          aboutTitle: "About",
          loginTitle: "Login",
          registerTitle: "Register",
        }
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
