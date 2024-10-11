/**
 * Находит комментарий по заданному идентификатору в иерархическом списке комментариев
 * @param {Array} list - Список комментариев (каждый комментарий должен содержать свойство _id и массив children)
 * @param {string} parent - Идентификатор комментария, который нужно найти
 * @returns {Object|null} - Возвращает объект комментария, если найден, или null, если комментарий не найден
 */
export default function findComment(list, parent) {
  for (const elem of list) {
    if (elem._id === parent) return elem;

    const childrenElem = elem.children?.length > 0 ? findComment(elem.children, parent) : null;
    if (childrenElem) {
      return childrenElem;
    }
  }

  return null;
}
