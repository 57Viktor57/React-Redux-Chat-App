import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker/locale/en';
import gon from 'gon';
// import cookies from 'js-cookie';
import io from 'socket.io-client';
import { keyBy } from 'lodash';
import App from './components/App';
import {
  addMessageSuccess,
  addChannelSuccess,
  removeChannelSuccess,
  renameChannelSuccess,
} from './actions';
import reducers from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  channels: keyBy(gon.channels, 'id'),
  messages: keyBy(gon.messages, 'id'),
  user: faker.name.findName(),
  currentChannelId: gon.currentChannelId,
};

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));

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
