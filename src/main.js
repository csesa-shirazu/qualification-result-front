import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Navbar from './components/Navbar.vue'
import { routes } from './routes';

import { host_url } from './config';

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

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

const router = new VueRouter({
  routes,
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   if (to.hash) {
  //     return { selector: to.hash };
  //   }
  //   return {x: 0, y: 0};
  // }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

new Vue({
  el: '#navcomponent',
  router,
  store,
  render: h => h(Navbar)
})