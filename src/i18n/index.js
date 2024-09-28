import { I18nContext } from './context';
import { useContext } from 'react';

export function useLanguage() {
  const context = useContext(I18nContext);

  return context;
}
