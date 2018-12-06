export default (state) => {
  const channels = state.channels.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

  const messages = state.messages.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

  return {
    channels,
    messages,
  };
};
