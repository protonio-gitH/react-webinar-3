import React, { useState } from 'react';
import PropTypes from 'prop-types';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

function LanguageSelector({ lang, setLang }) {
  const handleChange = event => {
    const newLanguage = event.target.value;
    setLang(newLanguage);
  };

  return (
    <div>
      <select value={lang} onChange={handleChange}>
        {languages.map(language => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

LanguageSelector.propTypes = {
  lang: PropTypes.string,
  setLang: PropTypes.func.isRequired,
};

LanguageSelector.defaultProps = {
  lang: 'ru',
};

export default React.memo(LanguageSelector);
