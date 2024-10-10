import { useCallback, useContext, useEffect, useState } from 'react';
import { I18nContext } from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n;

  const [currLang, setCurrLang] = useState(i18nService.lang);

  useEffect(() => {
    const langChange = language => {
      setCurrLang(language);
    };
    const sub = i18nService.subscribe(langChange);

    return () => {
      sub();
    };
  }, [i18nService, currLang]);

  const t = useCallback(
    (text, plural) => {
      return i18nService.translate(text, plural);
    },
    [i18nService, currLang],
  );

  return { t, lang: currLang, setLang: i18nService.setLang };
}
