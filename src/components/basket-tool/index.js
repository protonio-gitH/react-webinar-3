import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { Link } from 'react-router-dom';
import './style.css';

function BasketTool({ sum, amount, onOpen, t }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to="/" className="main-button">
        {t('main')}
      </Link>
      <span className={cn('label')}>{t('inbasket')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: t('oneproduct'),
              few: t('fewproduct'),
              many: t('manyproduct'),
            })} / ${numberFormat(sum)} ₽`
          : t('empty')}
      </span>
      <button onClick={onOpen}>{t('goto')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  t: () => {},
};

export default memo(BasketTool);
