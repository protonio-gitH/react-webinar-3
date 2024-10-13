import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentArea = ({
  setIsMainAreaVisible,
  setActiveReplyId,
  authorName,
  title,
  cancel,
  createFirstComment,
  createAnswerComment,
  isAuth,
  parent,
  margin,
  mainClass,
  loginNavigate,
}) => {
  const [area, setArea] = useState('');
  const cn = bem('CommentArea');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (mainClass) {
      setArea('Текст');
    } else {
      setArea(`Мой ответ для ${authorName}`);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current && !mainClass) {
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isAuth]);

  const onSend = e => {
    e.preventDefault();
    if (area.trim()) {
      if (parent && !mainClass) {
        createAnswerComment(parent, area, 'comment');
      } else {
        createFirstComment(area, 'article');
      }
      setArea('');
    }
  };

  const cancleHandler = () => {
    setActiveReplyId(null);
    setIsMainAreaVisible(true);
  };

  return (
    <div
      className={`${cn()} ${mainClass}`}
      id="comment_area"
      data-id={parent}
      style={{ marginLeft: !mainClass && `${margin + 15}px`, marginBottom: !mainClass && `30px` }}
    >
      {isAuth ? (
        <>
          <div className={cn('title')}>{title}</div>
          <textarea
            ref={textareaRef}
            className={cn('area')}
            onChange={e => setArea(e.target.value)}
            value={area}
          />
          <button className={cn('send-btn')} onClick={onSend}>
            Отправить
          </button>
          {cancel && (
            <button onClick={cancleHandler} className={cn('cancel-btn')}>
              Отмена
            </button>
          )}
        </>
      ) : (
        <div className={cn('not-logged-in')}>
          <a href="#" onClick={loginNavigate}>
            Войдите
          </a>
          , чтобы иметь возможность комментировать{' '}
          {cancel && <span className={cn('cancel-btn')}>Отмена</span>}
        </div>
      )}
    </div>
  );
};

CommentArea.propTypes = {
  setIsMainAreaVisible: PropTypes.func,
  setActiveReplyId: PropTypes.func,
  authorName: PropTypes.string,
  title: PropTypes.string,
  cancel: PropTypes.bool,
  createFirstComment: PropTypes.func.isRequired,
  createAnswerComment: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  parent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.number,
  mainClass: PropTypes.string,
  loginNavigate: PropTypes.func.isRequired,
};

CommentArea.defaultProps = {
  setIsMainAreaVisible: () => {},
  authorName: '',
  title: 'Новый комментарий',
  cancel: false,
  isAuth: false,
  parent: 0,
  margin: 0,
  mainClass: '',
};

export default memo(CommentArea);
