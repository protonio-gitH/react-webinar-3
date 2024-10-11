import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

const CommentsList = ({ list, render }) => {
  const cn = bem('ArticleCard');

  return (
    <div className={cn('comments-list')}>
      {list.map(item => (
        <div key={item._id} className={cn('comments-item-wrap')}>
          {render(item)}
        </div>
      ))}
    </div>
  );
};

CommentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  render: PropTypes.func.isRequired,
};

CommentsList.defaultProps = {
  list: [],
};

export default memo(CommentsList);
