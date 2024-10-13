import React, { useCallback } from 'react';
import Spinner from '../../components/spinner';
import Comments from '../../components/comments';
import useStore from '../../hooks/use-store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import shallowequal from 'shallowequal';
import useSelectorStore from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

const CommentsContainer = () => {
  const store = useStore();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const select = useSelector(
    state => ({
      count: state.comments.count,
      list: state.comments.list,
      isWaiting: state.comments.isWaiting,
    }),
    shallowequal,
  );

  const selectStore = useSelectorStore(state => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  const currentName = selectStore.user?.profile?.name;

  const callbacks = {
    createFirstComment: useCallback(
      (value, type) => dispatch(commentsActions.createComment(params.id, value, type)),
      [dispatch, params.id],
    ),
    createAnswerComment: useCallback(
      (id, value, type) => dispatch(commentsActions.createComment(id, value, type)),
      [dispatch],
    ),
    loadComments: useCallback(
      () => dispatch(commentsActions.load(params.id)),
      [dispatch, params.id],
    ),
    loginNavigate: useCallback(
      e => {
        e.preventDefault();
        navigate('/login', { state: { back: location.pathname } });
      },
      [navigate, location.pathname],
    ),
  };

  return (
    <Spinner active={select.isWaiting}>
      <Comments
        loginNavigate={callbacks.loginNavigate}
        currentName={currentName}
        isAuth={selectStore.exists}
        list={select.list}
        count={select.count}
        createFirstComment={callbacks.createFirstComment}
        createAnswerComment={callbacks.createAnswerComment}
        load={callbacks.loadComments}
      />
    </Spinner>
  );
};

export default CommentsContainer;
