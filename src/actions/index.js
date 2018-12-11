import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

// export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
// export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const addChannel = name => () => {
  const url = routes.channelsUrl();
  const data = {
    attributes: name,
  };
  return axios.post(url, { data });
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelsUrl(id);
    const data = {
      attributes: {
        id,
      },
    };
    await axios.delete(url, { data });
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};

export const renameChannel = ({ name, id }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.channelsUrl(id);
    const data = {
      attributes: {
        name,
        id,
      },
    };
    await axios.patch(url, { data });
  } catch (e) {
    dispatch(renameChannelFailure());
  }
};

export const addMessage = message => () => {
  const url = routes.messagesUrl(message.channelId);
  const data = {
    attributes: message,
  };
  return axios.post(url, { data });
};

export const toggleActiveChannel = createAction('TOGGLE_ACTIVE_CHANNEL');
