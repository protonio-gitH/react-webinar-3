import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types'; // Импортируем PropTypes
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentArea from '../comment-area';
import Comment from '../comment';
import CommentsList from '../comments-list';

const Comments = ({
  count,
  isAuth,
  list,
  createFirstComment,
  createAnswerComment,
  load,
  currentName,
  loginNavigate,
}) => {
  const cn = bem('ArticleCard');
  const [isMainAreaVisible, setIsMainAreaVisible] = useState(true);
  const [activeReplyId, setActiveReplyId] = useState(null);

  const renderItem = useCallback(
    item => (
      <Comment
        setIsMainAreaVisible={setIsMainAreaVisible}
        activeReplyId={activeReplyId}
        setActiveReplyId={setActiveReplyId}
        currentName={currentName}
        item={item}
        isAuth={isAuth}
        load={load}
        lvl={1}
        createAnswerComment={createAnswerComment}
        createFirstComment={createFirstComment}
        loginNavigate={loginNavigate}
      />
    ),
    [
      currentName,
      isAuth,
      load,
      createAnswerComment,
      createFirstComment,
      loginNavigate,
      activeReplyId,
    ],
  );

  return (
    <div className={cn('comments')}>
      <div className={cn('comments-count')}>Комментарии ({count})</div>

      {list && list.length > 0 && <CommentsList list={list} render={renderItem} />}
      {isMainAreaVisible && (
        <CommentArea
          isAreaVisible={isMainAreaVisible}
          loginNavigate={loginNavigate}
          mainClass="Main"
          parent={1}
          title="Новый комментарий"
          createFirstComment={createFirstComment}
          load={load}
          isAuth={isAuth}
        />
      )}
    </div>
  );
};

Comments.propTypes = {
  count: PropTypes.number,
  isAuth: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object),
  createFirstComment: PropTypes.func,
  createAnswerComment: PropTypes.func,
  load: PropTypes.func,
  currentName: PropTypes.string,
  loginNavigate: PropTypes.func,
};

Comments.defaultProps = {
  count: 0,
  list: [],
  isAuth: false,
  currentName: '',
  createFirstComment: () => {},
  createAnswerComment: () => {},
  load: () => {},
  loginNavigate: () => {},
};

export default memo(Comments);
