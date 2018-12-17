import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import cookies from 'js-cookie';
import io from 'socket.io-client';
import App from './components/App';
import {
  addMessageSuccess,
  addChannelSuccess,
  removeChannelSuccess,
  renameChannelSuccess,
} from './actions';
import store from './store';

const socket = io();

socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(addMessageSuccess(attributes));
});

socket.on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(addChannelSuccess(attributes));
});

socket.on('removeChannel', ({ data }) => {
  store.dispatch(removeChannelSuccess(data));
});

socket.on('renameChannel', ({ data: { attributes } }) => {
  store.dispatch(renameChannelSuccess(attributes));
});

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('chat'));
