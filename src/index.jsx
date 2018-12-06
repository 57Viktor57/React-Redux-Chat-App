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
import stateNormolizing from './stateNormolizing';
import faker from 'faker/locale/en';
import gon from 'gon';
// import cookies from 'js-cookie';
import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = { ...gon, ...stateNormolizing(gon), user: faker.name.findName() };

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));

const socket = io();

socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(addMessageSuccess(attributes));
});

render(<Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('chat'));
