import React, { Component } from 'react';
import PropTypes from 'prop-types';

import send from 'assets/send_button.svg';
import './style.scss';


class Sender extends Component {
  render() {
    return (
      <form className="sender" onSubmit={this.props.sendMessage}>
        <input type="text" className="new-message" name="message" placeholder={this.props.placeholder} disabled={this.props.disabledInput} autoFocus autoComplete="off" />
        <button type="submit" className="send">
          <img src={send} className="send-icon" alt="send" />
        </button>
      </form>
    );
  }
}

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool
};

export default Sender;
