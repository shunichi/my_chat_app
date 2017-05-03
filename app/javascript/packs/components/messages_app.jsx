import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';

export default class MessagesApp extends React.Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message
        key={message.id}
        message={message}
      />
    ));
    return (
      <div id="messages">
        {messages}
      </div>
    );
  }
}


MessagesApp.propTypes = {
  messages: PropTypes.array.isRequired,
};
