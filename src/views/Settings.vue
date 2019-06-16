<template>
  <div class="home">
    <h1>This is an settings page</h1>
    <v-btn @click="showNotification">
      show notification
    </v-btn>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  methods: {
    showNotification() {
      const title = 'notification from settings'
      const options = {
        body: 'notification body'
      }
      // new Notification(title, options)　//renderer processから呼び出す HTML5 Notification API
      ipcRenderer.send('show_notification', {
        title,
        options
      })
    }
  }
}
</script>
