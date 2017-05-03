import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  const { content, user } = props.message;
  return (
    <div className="message">
      <img className="message__user-icon" src={user.imageUrl} />
      <div className="message__content">
        {content}
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  }),
};
