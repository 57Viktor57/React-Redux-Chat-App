import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const toggleActiveChannel = createAction('TOGGLE_ACTIVE_CHANNEL');

export const addChannel = name => () => {
  const url = routes.channelsUrl();
  const data = {
    attributes: name,
  };
  return axios.post(url, { data });
};

export const removeChannel = ({ id }) => () => {
  const url = routes.channelsUrl(id);
  const data = {
    attributes: {
      id,
    },
  };
  return axios.delete(url, { data });
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
