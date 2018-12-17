import thunk from 'redux-thunk';
import faker from 'faker/locale/en';
import { createStore, applyMiddleware, compose } from 'redux';
import { keyBy } from 'lodash';
import gon from 'gon';
import reducers from './reducers';


/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  channels: keyBy(gon.channels, 'id'),
  messages: keyBy(gon.messages, 'id'),
  user: faker.name.findName(),
  currentChannelId: gon.currentChannelId,
};

export default createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));
