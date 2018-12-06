import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { messageSelector } from '../selectors';

const mapStateToProps = state => ({
  messages: messageSelector(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps, actionCreators)
export default class MessagesList extends React.Component {
  render() {
    const { messages, currentChannelId, author } = this.props;
    const style = {
      'maxWidth': '18rem',
    }
    return <div className="d-flex flex-column-reverse">
      {messages
        .filter(item => item.channelId === currentChannelId)
        .map(item =>
        <div className="card border-secondary mb-3" style={style} key={uniqueId()}>
          <div className="card-header text-secondary">{`Message by ${item.author}`}</div>
          <div className="card-body">
            <p className="card-text">{item.text}</p>
          </div>
        </div>
      )}
    </div>
  }
}
