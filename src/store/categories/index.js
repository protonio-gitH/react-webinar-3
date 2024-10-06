import StoreModule from '../module';
import { buildTree } from '../../utils';

class CategoriesState extends StoreModule {
  initState() {
    return {
      category: [],
      waiting: false,
    };
  }

  async load() {
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState(
        {
          category: json.result.items,
        },
        'Загружены категории из АПИ',
      );
    } catch (e) {
      this.setState({
        category: [],
      });
    }
  }
}

export default CategoriesState;
