import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import electron from 'electron'


Vue.config.productionTip = false

electron.ipcRenderer.on('open_settings', function(){
  router.replace("/settings")
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
