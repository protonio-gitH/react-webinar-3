/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.initialLength = this.state.list.length; // Изначальная длинна
    this.nextCode = {};
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
   * Генерация кода
   */

  generateCode(listKey) {
    if (!this.nextCode[listKey]) {
      this.nextCode[listKey] = (this.state[listKey]?.length || 0) + 1;
    }
    return this.nextCode[listKey]++;
  }

  /**
   * Добавление новой записи
   */
  addItem(listKey) {
    const nextCode = this.generateCode(listKey);
    this.setState({
      ...this.state,
      [listKey]: [
        ...this.state[listKey],
        { code: nextCode, title: 'Новая запись', selectedCount: 0 },
      ],
    });
    this.initialLength = this.initialLength + 1;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(listKey, code) {
    this.setState({
      ...this.state,
      [listKey]: this.state[listKey].filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(listKey, code) {
    this.setState({
      ...this.state,
      list: this.state[listKey].map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) item.selectedCount += 1;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
