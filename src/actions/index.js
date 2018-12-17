import { createAction } from 'redux-actions';
import axios from 'axios';
import { SubmissionError } from 'redux-form';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const toggleActiveChannel = createAction('TOGGLE_ACTIVE_CHANNEL');

export const addChannel = name => async () => {
  try {
    const url = routes.channelsUrl();
    const data = {
      attributes: name,
    };
    return await axios.post(url, { data });
  } catch (e) {
    throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
  }
};

export const removeChannel = ({ id }) => async () => {
  try {
    const url = routes.channelsUrl(id);
    const data = {
      attributes: {
        id,
      },
    };
    return await axios.delete(url, { data });
  } catch (e) {
    throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
  }
};

export const renameChannel = ({ name, id }) => () => {
  const url = routes.channelsUrl(id);
  const data = {
    attributes: {
      name,
      id,
    },
  };
  return axios.patch(url, { data });
};

export const addMessage = message => () => {
  const url = routes.messagesUrl(message.channelId);
  const data = {
    attributes: message,
  };
  return axios.post(url, { data });
};
