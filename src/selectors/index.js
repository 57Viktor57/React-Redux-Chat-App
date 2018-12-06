import { createSelector } from 'reselect';

const getTasks = state => state.channels;
export const channelsSelector = createSelector(
  getTasks,
  channels => Object.values(channels),
);

const getMessage = state => state.messages;
export const messageSelector = createSelector(
  getMessage,
  messages => Object.values(messages),
);
