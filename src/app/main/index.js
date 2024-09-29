import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/pagination';
import useSelector from '../../store/use-selector';
import LanguageSelector from '../../components/language-selector';
import { useLanguage } from '../../i18n';

function Main() {
  const store = useStore();
  const params = useParams();
  const { lang, setLang, t } = useLanguage();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    page: state.catalog.page,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    onChangePage: useCallback(page => store.actions.catalog.load(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item item={item} link={`/product/${item._id}`} onAdd={callbacks.addToBasket} t={t} />
        );
      },
      [callbacks.addToBasket, lang],
    ),
  };

  return (
    <PageLayout>
      <Head title={t('shop')} lang={lang} setLang={setLang} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItems={select.count}
        onChangePage={callbacks.onChangePage}
        number={Number(params.id) ?? select.page}
        link={'/'}
      />
    </PageLayout>
  );
}

export default memo(Main);
