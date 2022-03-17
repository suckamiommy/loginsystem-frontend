import { createStore } from 'vuex'


// if you refresh the web page and then state go back to default value, you can use 'vuex-persistedstate' to resolve this problem.
// import createPersistedState from "vuex-persistedstate";

import user from './user/index'
import application from './application'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    application
  },
  // plugins: [createPersistedState()]
})
