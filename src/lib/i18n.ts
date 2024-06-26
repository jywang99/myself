import { derived, writable } from "svelte/store";
import translations, { type LanguageType } from "./translations";

export const locale = writable("en");
export const locales = Object.keys(translations);

type ReplaceVars = {
  [key: string]: string;
};

function translate(locale: LanguageType, key: string, vars: ReplaceVars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  const keys = key.split(".");
  const lang = translations[locale];
  let text: any = lang;
  for (let i = 0; i < keys.length; i++) {
    text = text[keys[i]];
  }

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = (text as string).replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key: string, vars: ReplaceVars = {}) =>
  translate($locale as LanguageType, key, vars)
);

