import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageSelector from '../language-selector';

function Head({ title, lang, setLang }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSelector lang={lang} setLang={setLang} />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  setLang: PropTypes.func.isRequired,
};

export default memo(Head);
