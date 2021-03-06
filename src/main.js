// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import { ServerTable, ClientTable } from 'vue-tables-2'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import RestHapiRepository from './plugins/repository-plugin'

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

import httpClient from './services/http-client.service'
import authInterceptor from './services/auth-interceptor.service'

import axios from 'axios'
import qs from 'querystring'
import config, { resources } from './config'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

axios.defaults.baseURL = config.serverURI
// Replace default serializer with one that works with Joi validation
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params)
}

// Use plugins
Vue.use(VueRouter)
Vue.use(ClientTable, {}, false);
Vue.use(ServerTable, {}, false);
Vue.use(RestHapiRepository, { httpClient, resources })

Vue.use(BootstrapVue);

// Register global components
Vue.component('pulse-loader', PulseLoader);

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && (!router.app.$store.state.token || router.app.$store.state.token === 'null')) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return Promise.resolve(response)
}, authInterceptor.responseError)

// EXPL: Initialize auth header
axios.defaults.headers.common.Authorization = 'Bearer ' + store.state.auth.accessToken

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

export {
  router
}
