/**
 * Обновляет комментарий в иерархическом списке комментариев
 * @param {Array} list - Список комментариев (каждый комментарий должен содержать свойство _id и массив children)
 * @param {Object} update - Объект обновленного комментария, который необходимо вставить в список
 * @returns {Array} - Возвращает новый массив комментариев с обновленным элементом
 */
export default function newComments(list, update) {
  return list.map(elem => {
    if (elem._id === update._id) {
      return update;
    }

    if (elem.children?.length > 0) {
      return { ...elem, children: newComments(elem.children, update) };
    }

    return elem;
  });
}
