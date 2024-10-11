import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentArea = ({
  title,
  cancel,
  createFirstComment,
  createAnswerComment,
  itemId,
  load,
  isAuth,
  lvl,
  parent,
  margin,
  mainClass,
  loginNavigate,
}) => {
  const [area, setArea] = useState('');
  const cn = bem('CommentArea');

  useEffect(() => {
    const buttons = document.querySelectorAll('.CommentArea-cancel-btn');
    const activeClass = 'CommentArea--active';

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.closest(`.${cn()}`)?.classList.remove(activeClass);
        document.querySelector('.Main').style.display = 'block';
      });
    });

    return () => {
      buttons.forEach(button => button.removeEventListener('click', () => {}));
    };
  }, []);

  const onSend = e => {
    e.preventDefault();
    if (area.trim()) {
      if (itemId) {
        createAnswerComment(itemId, area, 'comment');
      } else {
        createFirstComment(area, 'article');
      }
      setArea('');
      document.querySelector('.Main').style.display = 'block';
    }
  };

  return (
    <div
      className={`${cn()} ${mainClass}`}
      id="comment_area"
      data-id={parent}
      style={{ marginLeft: `${margin + 15}px` }}
    >
      {isAuth ? (
        <>
          <div className={cn('title')}>{title}</div>
          <textarea className={cn('area')} onChange={e => setArea(e.target.value)} value={area} />
          <button className={cn('send-btn')} onClick={onSend}>
            Отправить
          </button>
          {cancel && <button className={cn('cancel-btn')}>Отмена</button>}
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
  title: PropTypes.string,
  cancel: PropTypes.bool,
  createFirstComment: PropTypes.func.isRequired,
  createAnswerComment: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  load: PropTypes.func,
  isAuth: PropTypes.bool,
  lvl: PropTypes.number,
  parent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.number,
  mainClass: PropTypes.string,
  loginNavigate: PropTypes.func.isRequired,
};

CommentArea.defaultProps = {
  title: 'Новый комментарий',
  cancel: false,
  itemId: null,
  load: null,
  isAuth: false,
  lvl: 1,
  parent: 0,
  margin: 0,
  mainClass: '',
};

export default memo(CommentArea);
