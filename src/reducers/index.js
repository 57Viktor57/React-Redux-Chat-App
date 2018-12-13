import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { omit, omitBy } from 'lodash';
import * as actions from '../actions';


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
    return omitBy(state, item => item.channelId === id);
  },
}, {});

const currentChannelId = handleActions({
  [actions.toggleActiveChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.removeChannelSuccess]() {
    return 1;
  },
}, 'none');

export default combineReducers({
  user,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
