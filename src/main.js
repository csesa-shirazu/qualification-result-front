import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Navbar from './components/Navbar.vue'

import { host_url } from './config';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
  state: {
    hostUrl: host_url,
    appState: 'initial',
    graderId: 0,
  },
  getters: {
    appState: state => {
      return state.appState;
    },
    graderId: state => {
      return state.graderId;
    }
  },
  mutations: {
    setAppState (state, appState) {
      state.appState = appState
    },
    setGraderId (state, graderId) {
      state.graderId = graderId
    }
  },
  actions: {
    setGrader (context, graderId){
      context.commit('setGraderId', graderId)
      context.commit('setAppState', 'grader-is-set')
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

new Vue({
  el: '#navcomponent',
  store,
  render: h => h(Navbar)
})