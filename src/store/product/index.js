import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      result: {},
    };
  }

  async getProduct(id) {
    const url = `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const json = await response.json();

      this.setState(
        {
          result: json.result,
        },
        'Получена информация о товаре',
      );
    } catch (error) {
      console.error('Ошибка при получении информации о товаре:', error);
      this.setState({
        result: {},
      });
    }
  }
}

export default Product;
