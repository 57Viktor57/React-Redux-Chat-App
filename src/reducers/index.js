import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const channels = (state = {}) => state;

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload }) {
    return [...state, payload];
  },
}, []);

const currentChannelId = handleActions({
  [actions.toggleActiveChannel](state, { payload: { id } }) {
    return id;
  },
}, 'none');

const messageCreatingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  messageCreatingState,
  form: formReducer,
});
