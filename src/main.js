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
  },
  getters: {
  },
  mutations: {
  },
  actions: {
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