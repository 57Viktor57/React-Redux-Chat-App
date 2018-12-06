import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { addMessageSuccess } from './actions';
// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, gon, composeEnhancers(applyMiddleware(thunk)));

const socket = io();

socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(addMessageSuccess(attributes));
});

render(<Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('chat'));
