export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        if (res.status === 200 && res.data?.result) {
          dispatch({
            type: 'comments/load-success',
            payload: { data: res.data.result },
          });
        } else {
          throw new Error('Ошибка при загрузке комментариев.');
        }
      } catch (e) {
        console.error(`Ошибка при загрузке комментариев: ${e.message}`);
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  createComment: (id, value, type) => {
    return async (dispatch, getState, services) => {
      try {
        const data = {
          text: value,
          parent: { _id: id, _type: type },
        };

        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200 && res.data?.result) {
          dispatch({
            type: 'comments/new-comment',
            payload: { data: res.data.result },
          });
        } else {
          throw new Error('Ошибка при создании комментария.');
        }
      } catch (e) {
        console.error(`Ошибка при создании комментария: ${e.message}`);
      }
    };
  },
};
