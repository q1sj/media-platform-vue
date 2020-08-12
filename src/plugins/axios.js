"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message,Loading } from 'element-ui';
import router from '../router'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



axios.defaults.baseURL= "http://192.168.1.7:18080/v1/"

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    loading.close();
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
    config => {
      //判断是否存在token，存在，则每个http header都几上token
      const token = localStorage.getItem('Authorization');
      // console.log(token)
      if (token) {
        config.headers.Authorization = "Ticket " + token;
      }
      startLoading();
      return config;
    }, error => {
      return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    loading.close()
      if(response.data.code == '401') {
          router.replace({path: '/login'});
          Message.error(response.data.msg);
          return;
      }
    return response;
  },
  function(error) {
    // Do something with response error
    loading.close()
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};
Vue.use(Plugin)
export default Plugin;
