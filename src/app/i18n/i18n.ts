import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./languages/en.json";
import french from "./languages/fr.json";
import arabic from "./languages/ar.json";
import chinese from "./languages/ch.json";

const resources = {
  en: { translation: english },
  fr: { translation: french },
  ar: { translation: arabic },
  ch: { translation: chinese },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: 'en',          // Default language
    fallbackLng: 'en',  // Use if translation not found
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;