import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VideoPlayer from 'vue-video-player'
import hls from 'videojs-contrib-hls'
import "video.js/dist/video-js.css"
import "vue-video-player/src/custom-theme.css"

Vue.use(VideoPlayer)
Vue.use(hls)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
