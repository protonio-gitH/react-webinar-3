import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import findComment from '../../utils/find-comment';
import newComments from '../../utils/new-comments';

export const initialState = {
  count: 0,
  list: [],
  isWaiting: false, // New field for waiting state
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
    case 'comments/new-comment-start':
      return {
        ...state,
        isWaiting: true, // Set waiting state to true
      };

    case 'comments/load-success': {
      const treeData = listToTree(action.payload.data.items);
      const list = treeData.length > 0 ? treeData[0].children : [];

      return {
        ...state,
        count: action.payload.data.count || 0,
        list,
        isWaiting: false, // Set waiting state to false after success
      };
    }

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
          isWaiting: false, // Set waiting state to false after new comment
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
          isWaiting: false, // Set waiting state to false after new comment
        };
      }

      return {
        ...state,
        isWaiting: false, // In case the parent is not found, stop waiting
      };
    }

    case 'comments/load-error':
    case 'comments/new-comment-error':
      return {
        ...state,
        count: 0,
        list: [],
        isWaiting: false, // Reset waiting state on error
      };

    default:
      return state;
  }
}

export default reducer;
