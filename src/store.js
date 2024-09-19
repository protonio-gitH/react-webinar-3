import basket from './components/basket';
import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Открытие/закрытие модалки
   *
   */
  openOrCloseModal() {
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen,
    });
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToBasket(item) {
    if (this.state.basketList.find(elem => elem.code === item.code)) {
      this.setState({
        ...this.state,
        basketList: this.state.basketList.map(elem => {
          if (elem.code === item.code) {
            return {
              ...elem,
              count: elem.count + 1,
            };
          }
          return elem;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        basketList: [...this.state.basketList, { ...item, count: 1 }],
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  removeItemFromBasket(item) {
    const existingItem = this.state.basketList.find(elem => elem.code === item.code);

    if (existingItem) {
      if (existingItem.count > 1) {
        this.setState({
          ...this.state,
          basketList: this.state.basketList.map(elem => {
            if (elem.code === item.code) {
              return {
                ...elem,
                count: elem.count - 1,
              };
            }
            return elem;
          }),
        });
      } else {
        this.setState({
          ...this.state,
          basketList: this.state.basketList.filter(elem => elem.code !== item.code),
        });
      }
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }
}

export default Store;
