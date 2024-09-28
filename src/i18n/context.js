import { createContext, useContext, useMemo, useState } from 'react';
import translation from './translation';

export const I18nContext = createContext({});

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const t = key => {
    return translation[lang][key] ?? key.toString();
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}
