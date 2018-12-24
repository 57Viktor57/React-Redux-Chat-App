import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { omit, omitBy } from 'lodash';
import * as actions from '../actions';

const defaultChannelId = 1;


const channels = handleActions({
  [actions.addChannelSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.removeChannelSuccess](state, { payload }) {
    return omit(state, payload.id);
  },
  [actions.renameChannelSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
}, {});

const user = (state = {}) => state;

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { id } = payload;
    return omitBy(state, { channelId: id });
  },
}, {});

const currentChannelId = handleActions({
  [actions.toggleActiveChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.removeChannelSuccess]() {
    return defaultChannelId;
  },
}, 'none');

const removeChannelState = handleActions({
  [actions.removeChannelSuccess]() {
    return 'successed';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelRequest]() {
    return 'requested';
  },
}, 'none');

const addChannelState = handleActions({
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelRequest]() {
    return 'requested';
  },
}, 'none');

const addMessageState = handleActions({
  [actions.addMessageSuccess]() {
    return 'successed';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageRequest]() {
    return 'requested';
  },
}, 'none');

const renameChannelState = handleActions({
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelRequest]() {
    return 'requested';
  },
}, 'none');

export default combineReducers({
  user,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
  addChannelState,
  removeChannelState,
  renameChannelState,
  addMessageState,
});
