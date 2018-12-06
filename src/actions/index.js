import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = message => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.messagesUrl(message.channelId);
    const data = {
      attributes: message,
    };
    await axios.post(url, { data });
  } catch (e) {
    console.log('ERRRRORRRRRRRR');
  }
};

export const toggleActiveChannel = createAction('TOGGLE_ACTIVE_CHANNEL');
