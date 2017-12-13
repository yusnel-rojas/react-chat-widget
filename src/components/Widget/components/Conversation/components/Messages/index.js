import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Typing from '../Typing';

import './styles.scss';

const scrollToBottom = () => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

class Messages extends Component {
  componentDidMount() {
    scrollToBottom();
  }

  componentDidUpdate() {
    scrollToBottom();
  }

  getComponentToRender = (message) => {
    const ComponentToRender = message.get('component');
    if (message.get('type') === 'component') {
      return <ComponentToRender {...message.get('props')} />;
    }
    return <ComponentToRender message={message} />;
  };

  getTypingComponentToRender = (typingParams) => {
    const ComponentToRender = typingParams.component || Typing;
    return <ComponentToRender {...typingParams}>...</ComponentToRender>;
  };

  render() {
    return (
      <div id="messages" className="messages-container">
        {
          this.props.messages.map((message, index) =>
            <div className="message" key={index}>
              {
                this.props.profileAvatar &&
                message.get('showAvatar') &&
                <img src={this.props.profileAvatar} className="avatar" alt="profile" />
              }
              {
                this.getComponentToRender(message)
              }
            </div>
          )
        }
        {
            this.props.isTyping &&
            <div className="message typing">
              {
                this.props.profileAvatar &&
                <img src={this.props.profileAvatar} className="avatar" alt="profile" />
              }
              {
                this.getTypingComponentToRender({})
              }
            </div>
        }
      </div>
    );
  }
}

Messages.propTypes = {
  messages: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  profileAvatar: PropTypes.string,
  isTyping: PropTypes.bool
};

export default connect(store => ({
  messages: store.messages
}))(Messages);
