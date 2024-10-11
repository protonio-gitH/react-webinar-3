import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import findComment from '../../utils/find-comment';
import newComments from '../../utils/new-comments';

export const initialState = {
  count: 0,
  list: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {
        ...state,
        count: 0,
      };

    case 'comments/load-success': {
      const treeData = listToTree(action.payload.data.items);
      const list = treeData.length > 0 ? treeData[0].children : [];

      return {
        ...state,
        count: action.payload.data.count || 0,
        list,
      };
    }

    case 'comments/new-comment-start':
      return {
        ...state,
      };

    case 'comments/new-comment': {
      const newComment = {
        ...action.payload.data,
        children: [],
      };

      if (action.payload.data.parent._type === 'article') {
        return {
          ...state,
          count: state.count + 1,
          list: [...state.list, newComment],
        };
      }

      const parent = findComment(state.list, action.payload.data.parent._id);

      if (parent) {
        const updatedParent = {
          ...parent,
          children: [...parent.children, newComment],
        };

        const updatedList = newComments(state.list, updatedParent);

        return {
          ...state,
          count: state.count + 1,
          list: updatedList,
        };
      }

      return state;
    }

    case 'comments/load-error':
      return {
        ...state,
        count: 0,
        list: [],
      };

    default:
      return state;
  }
}

export default reducer;
