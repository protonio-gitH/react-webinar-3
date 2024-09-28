import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { I18nProvider } from './i18n/context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StoreContext.Provider>,
);
