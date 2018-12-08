import React from 'react';
import { uniqueId } from 'lodash';
import connect from '../connect';
import { messageSelector } from '../selectors';

const mapStateToProps = state => ({
  messages: messageSelector(state).filter(item => item.channelId === state.currentChannelId),
});

@connect(mapStateToProps)
class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="d-flex flex-column-reverse">
        {messages.map(item => (
          <div className="card border-secondary mb-3" key={uniqueId()}>
            <div className="card-header text-secondary">{`Message by ${item.author}`}</div>
            <div className="card-body">
              <p className="card-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessagesList;
