import React, { useState, useEffect } from 'react';
import './style.css';
import Head from '../head';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import ItemBasket from '../item-basket';
import ModalLayout from '../modal-layout';

const renderItem = (item, onFunc) => <ItemBasket item={item} onFunc={onFunc} />;

function Basket({ isOpen, isOpenOrCloseModal, list, onFunc, sum }) {
  const cn = bem('Basket');

  return (
    isOpen && (
      <ModalLayout>
        <div className={cn('inner')}>
          <div className={cn('head')}>
            <Head title={'Корзина'} />
            <button className={cn('close')} onClick={() => isOpenOrCloseModal()}>
              Закрыть
            </button>
          </div>
          <div className={cn('body')}>
            <List list={list} renderItem={renderItem} onFunc={onFunc} />
          </div>
          <div className={cn('footer')}>
            <p>
              <b>Итого &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sum}</b>
            </p>
          </div>
        </div>
      </ModalLayout>
    )
  );
}

Basket.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isOpenOrCloseModal: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onFunc: PropTypes.func.isRequired,
  sum: PropTypes.number,
};

Basket.defaultProps = {
  isOpen: false,
  isOpenOrCloseModal: () => {},
  list: [],
  onFunc: () => {},
  sum: 0,
};

export default React.memo(Basket);
