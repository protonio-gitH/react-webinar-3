import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentArea from '../comment-area';
import './style.css';
import CommentsList from '../comments-list';

const Comment = ({
  activeReplyId,
  setActiveReplyId,
  setIsMainAreaVisible,
  item,
  createAnswerComment,
  load,
  isAuth,
  createFirstComment,
  lvl,
  currentName,
  loginNavigate,
}) => {
  const cn = bem('ArticleCard');

  const formatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const renderItem = useCallback(
    i => (
      <Comment
        setIsMainAreaVisible={setIsMainAreaVisible}
        activeReplyId={activeReplyId}
        setActiveReplyId={setActiveReplyId}
        key={i._id}
        currentName={currentName}
        item={i}
        isAuth={isAuth}
        load={load}
        lvl={lvl + 1}
        createAnswerComment={createAnswerComment}
        createFirstComment={createFirstComment}
        loginNavigate={loginNavigate}
      />
    ),
    [
      currentName,
      isAuth,
      load,
      lvl,
      createAnswerComment,
      createFirstComment,
      loginNavigate,
      activeReplyId,
    ],
  );

  const replyHandler = () => {
    setIsMainAreaVisible(false);
    setActiveReplyId(item._id);
  };

  const margin = lvl >= 10 ? 10 : lvl == 1 ? 0 : lvl * 15;

  return (
    <>
      {item?.text?.trim() && (
        <>
          <div className={cn('comments-item')} style={{ marginLeft: `${margin}px` }}>
            <div className={cn('comments-item-top')}>
              <div
                className={cn('comments-item-name', {
                  currentName:
                    currentName === item?.author?.profile?.name || !item?.author?.profile?.name,
                })}
              >
                {item?.author?.profile?.name || currentName}
              </div>
              <div className={cn('comments-item-date')}>
                {formatter.format(new Date(item.dateCreate))}
              </div>
            </div>
            <div className={cn('comments-item-bottom')}>
              <div className={cn('comments-item-text')}>{item.text}</div>
              <button
                className={cn('comments-item-btn')}
                data-id={item?._id}
                onClick={replyHandler}
              >
                Ответить
              </button>
            </div>
          </div>
          <CommentsList list={item.children} render={renderItem} />
          {activeReplyId === item._id && (
            <CommentArea
              setIsMainAreaVisible={setIsMainAreaVisible}
              setActiveReplyId={setActiveReplyId}
              authorName={item?.author?.profile?.name || currentName}
              loginNavigate={loginNavigate}
              margin={margin}
              parent={item._id}
              title="Новый ответ"
              cancel={true}
              createAnswerComment={createAnswerComment}
              createFirstComment={createFirstComment}
              load={load}
              isAuth={isAuth}
              lvl={lvl}
            />
          )}
        </>
      )}
    </>
  );
};

Comment.propTypes = {
  activeReplyId: PropTypes.string,
  setActiveReplyId: PropTypes.func,
  setIsMainAreaVisible: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  createAnswerComment: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  createFirstComment: PropTypes.func.isRequired,
  lvl: PropTypes.number,
  currentName: PropTypes.string.isRequired,
  loginNavigate: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  isAuth: false,
  lvl: 1,
};

export default memo(Comment);
