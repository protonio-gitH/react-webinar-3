import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentArea from '../comment-area';
import './style.css';
import CommentsList from '../comments-list';

const Comment = ({
  item,
  createAnswerComment,
  load,
  isAuth,
  createFirstComment,
  lvl,
  currentName,
  loginNavigate,
}) => {
  const [replyId, setReplyId] = useState(null);
  const cn = bem('ArticleCard');
  const commentAreaRef = useRef(null);

  const formatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  useEffect(() => {
    const buttons = document.querySelectorAll('.ArticleCard-comments-item-btn');
    const areas = document.querySelectorAll('.CommentArea');
    const activeClass = 'CommentArea--active';

    const handleButtonClick = button => {
      areas.forEach(area => area.classList.remove(activeClass));
      const targetArea = [...areas].find(area => area?.dataset?.id === button?.dataset?.id);
      if (targetArea) {
        targetArea.classList.add(activeClass, 'CommentArea--margin');
        document.querySelector('.Main').style.display = 'none';
        targetArea.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    };

    buttons.forEach(button => button.addEventListener('click', () => handleButtonClick(button)));

    return () => {
      buttons.forEach(button => button.removeEventListener('click', () => {}));
    };
  }, []);

  const renderItem = useCallback(
    i => (
      <Comment
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
    [currentName, isAuth, load, lvl, createAnswerComment, createFirstComment, loginNavigate],
  );

  const margin = Math.min(lvl * 15, 10);

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
                onClick={() => setReplyId(item._id)}
              >
                Ответить
              </button>
            </div>
          </div>
          <CommentsList list={item.children} render={renderItem} />
          <CommentArea
            ref={commentAreaRef}
            loginNavigate={loginNavigate}
            margin={margin}
            parent={item._id}
            title="Новый ответ"
            cancel={true}
            createAnswerComment={createAnswerComment}
            createFirstComment={createFirstComment}
            itemId={replyId}
            load={load}
            isAuth={isAuth}
            lvl={lvl}
          />
        </>
      )}
    </>
  );
};

Comment.propTypes = {
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
