export const errorLog = {
  state: {
    logs: []
  },
  getters: {
    errorLogs: state => state.logs
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  }
}
