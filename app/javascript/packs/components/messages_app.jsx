import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';

export default class MessagesApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: props.messages,
    };
  }

  componentWillMount() {
    if (typeof App !== 'undefined') {
      App.room = App.cable.subscriptions.create("RoomChannel", {
        connected: function () {
        },
        disconnected: function () {

        },
        received: (data) => {
          const messages = this.state.messages.slice();
          messages.push(data['message']);
          this.setState({messages: messages});
        },
        speak: function (content) {
          return this.perform('speak', {message: content});
        },
      });
    }
  }

  render() {
    const messages = this.state.messages.map(message => (
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
