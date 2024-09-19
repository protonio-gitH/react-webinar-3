import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Underhead from './components/underhead';
import Basket from './components/basket';
import Item from './components/item';
import useTotalSum from './hooks/useTotalSum';

const renderItem = (item, onFunc) => <Item item={item} onFunc={onFunc} />;

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basketList = store.getState().basketList;
  const isOpen = store.getState().isModalOpen;
  const sum = useTotalSum(basketList);

  const callbacks = {
    onAddItemToBasket: useCallback(
      item => {
        store.addItemToBasket(item);
      },
      [store],
    ),

    onDeleteItemFromBasket: useCallback(
      item => {
        store.removeItemFromBasket(item);
      },
      [store],
    ),

    onOpenOrCloseModal: useCallback(() => {
      store.openOrCloseModal();
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Приложение на чистом JS" />
        <Underhead
          onOpenOrCloseModal={callbacks.onOpenOrCloseModal}
          count={basketList.length}
          sum={sum}
        />
        <List list={list} renderItem={renderItem} onFunc={callbacks.onAddItemToBasket} />
      </PageLayout>
      <Basket
        list={basketList}
        isOpen={isOpen}
        isOpenOrCloseModal={callbacks.onOpenOrCloseModal}
        onFunc={callbacks.onDeleteItemFromBasket}
        sum={sum}
      />
    </>
  );
}

export default App;
