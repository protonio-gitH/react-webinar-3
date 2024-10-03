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
      const tree = buildTree(json.result.items);
      const parseTree = (items, depth = 0) => {
        return items.flatMap(item => {
          const { _id, title, children } = item;
          const prefix = '- '.repeat(depth);
          const result = [{ title: `${prefix}${title}`.trim(), value: _id }];
          if (children && children.length > 0) {
            result.push(...parseTree(children, depth + 1));
          }

          return result;
        });
      };

      const result = parseTree(tree);

      this.setState(
        {
          category: result,
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
