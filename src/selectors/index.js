import { createSelector } from 'reselect';

const getTasks = state => state.channels;
export const channelsSelector = createSelector(
  getTasks,
  channels => Object.values(channels),
);

const getMessage = ({ messages, currentChannelId }) => ({ messages, currentChannelId });
export const messageSelector = createSelector(
  getMessage,
  state => Object.values(state.messages).filter(item => item.channelId === state.currentChannelId),
);
