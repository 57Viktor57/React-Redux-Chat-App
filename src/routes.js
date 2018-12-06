const host = '/api/v1';

export default {
  getChannelsUrl: () => [host].join('/'),
  messagesUrl: id => [host, 'channels', id, 'messages'].join('/'),
};
