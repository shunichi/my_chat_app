import React from 'react';
import PropTypes from 'prop-types';
import MicroContainer from 'react-micro-container';
import MessagesApp from '../components/messages_app'

export default class MessagesAppContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
    };
  }

  componentWillMount() {
    if (typeof App !== 'undefined') {
      App.room = App.cable.subscriptions.create("RoomChannel", {
        connected: () => {},
        disconnected: () => {},
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
    return (<MessagesApp messages={this.state.messages} />);
  }
}

MessagesAppContainer.propTypes = {
  messages: PropTypes.array.isRequired,
};
