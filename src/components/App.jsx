import React from 'react';
import ChannelsList from './channelsList';
import Form from './form';
import MessagesList from './messagesList';

export default class App extends React.Component {
  render() {
    return (
    <div className="row">
      <div className="col-md-4">
        <ChannelsList />
      </div>
      <div className="col-md-8">
        <Form />
        <MessagesList />
      </div>
    </div>
  );
  }
}
