import * as translations from './translations';

class I18NService {
  constructor(services) {
    this.services = services;
    this.lang = 'ru';
    this.listeners = [];
  }

  setLang = lang => {
    this.lang = lang;
    this.listeners.forEach(subscriber => subscriber(lang));
    this.services.api.setLangHeader(lang);
  };

  translate = (text, plural) => {
    let result =
      translations[this.lang] && text in translations[this.lang]
        ? translations[this.lang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  };

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }
}

export default I18NService;
