import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
// import * as actions from '../actions';

const channels = (state = {}) => state;
const messages = (state = {}) => state;
const currentChannelId = (state = {}) => state;

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
