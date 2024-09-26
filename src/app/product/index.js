import React, { useCallback, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import ProductBody from '../../components/product-body';
import { numberFormat } from '../../utils';

function Product() {
  const store = useStore();
  const params = useParams();
  const cn = bem('Product');

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    result: state.product.result,
  }));

  useEffect(() => {
    store.actions.product.getProduct(params.id);
  }, [params.id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };
  return (
    <PageLayout>
      <Head title={select.result.title} />
      <div className={cn('header')}>
        <Link to="/" className="main-button">
          Главная
        </Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <ProductBody
        description={select.result.description}
        country={select.result?.madeIn?.title}
        category={select.result?.category?.title}
        year={new Date(select.result.dateCreate).getFullYear()}
        price={numberFormat(select.result.price)}
        onAdd={callbacks.addToBasket}
        id={select.result._id}
      />
    </PageLayout>
  );
}

export default React.memo(Product);
