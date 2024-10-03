/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Строит древовидную структуру из плоского массива элементов.
 * Каждый элемент, имеющий родителя, вставляется в соответствующее поле `children` родительского элемента.
 * Также каждому элементу присваивается глубина вложенности (`depth`), начиная с 0 для корневых элементов.
 *
 * @param arr {Array<Object>} Массив объектов, представляющих элементы дерева.
 *                            Каждый объект должен содержать `_id` (уникальный идентификатор)
 *                            и `parent` (объект с полем `_id` или `null`, если элемент корневой).
 *
 * @returns {Array<Object>} Массив корневых элементов, содержащих их вложенные дочерние элементы.
 */
export function buildTree(arr) {
  let res = [];

  while (arr.length > 0) {
    const item = arr.shift();
    item.children = [];
    if (item.parent === null) {
      item.depth = 0;
      res.push(item);
    }
    if (item.parent?._id) {
      let queue = [...res];
      while (queue.length > 0) {
        const elem = queue.shift();

        if (elem._id === item.parent._id) {
          item.depth = elem.depth + 1;
          elem.children.push(item);
          break;
        }

        if (elem.children.length > 0) {
          queue.push(...elem.children);
        }
      }
    }
  }

  return res;
}
