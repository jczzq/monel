export const createAction = (originState, targetState, channel) => {
  if (!originState || !targetState || !channel) return;
  return async ({ commit }, needCommit = false) => {
    try {
      if (!window[originState]) {
        await new Promise((resolve) => {
          window.$CHANNEL.on(channel, resolve);
        });
      }
      needCommit &&
        commit('SET', {
          key: targetState,
          value: window[originState],
        });
      return window[originState];
    } catch (error) {
      console.error(`window.$CHANNEL [${channel}] has been rejected`, error);
      return Promise.reject(error);
    }
  };
};
