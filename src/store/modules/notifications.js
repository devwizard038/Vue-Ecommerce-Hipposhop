export default {
  namespaced: true,
  state() {
    return {
      notifications: [],
    };
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    setNotification(state, data) {
      state.notifications.push(data);
    },
    deleteFirstNotif(state) {
      state.notifications.shift();
    },
  },
  actions: {
    /**
     * Add notification to the state.
     * @param {Object} data
     */
    loadNotification({ commit }, data) {
      if (data) {
        commit("setNotification", data);
        console.log(data);
      } else
        commit("setNotification", {
          message: "Something went wrong",
          type: "error",
        });
    },
    /**
     * Delete the first notification in the state.
     */
    deleteUsedNotif({ commit, getters }) {
      if (getters["getNotifications"].length > 0) {
        commit("deleteFirstNotif");
      } else return;
    },
  },
};
