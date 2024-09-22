import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';

function BasketInfo({ count, sum }) {
  return (
    <div>
      В корзине:&nbsp;{' '}
      {count > 0 ? (
        <b>
          {count} {plural(count, { one: 'товар', few: 'товара', many: 'товаров' })} / {sum}
        </b>
      ) : (
        <b>пусто</b>
      )}
    </div>
  );
}

BasketInfo.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
};

BasketInfo.defaultProps = {
  count: 0,
  sum: 0,
};

export default React.memo(BasketInfo);
