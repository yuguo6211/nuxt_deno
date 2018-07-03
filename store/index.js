import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
require('whatwg-fetch')
const store = () => new Vuex.Store({
  state: {
    updateSate: ''
  },
  mutations: {
    // 设置用户token
    SET_STATE: function (state, val) {
      state.updateSate = val
    }
  },

  actions: {
  }
})

export default store
