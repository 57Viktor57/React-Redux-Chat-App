import React from 'react';
import ChannelsList from './ChannelsList';
import Form from './Form';
import MessagesList from './MessagesList';

const App = () => (
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

export default App;
