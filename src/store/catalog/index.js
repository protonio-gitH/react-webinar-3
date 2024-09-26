import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
      page: 1,
    };
  }

  async load(page) {
    const skip = (page - 1) * 10;

    try {
      this.setState({
        ...this.getState({
          page: page,
        }),
      });

      const url = `api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      }

      const json = await response.json();

      this.setState(
        {
          list: json.result.items,
          count: json.result.count,
        },
        'Загружены товары из АПИ',
      );
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);

      this.setState({
        error: 'Не удалось загрузить данные',
      });
    }
  }
}

export default Catalog;
