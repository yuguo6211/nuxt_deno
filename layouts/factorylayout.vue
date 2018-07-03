<template lang="pug">
  div.wrapper
    div.self-header
    div.content-wrapper
      <section class="content">
        <nuxt/>
      </section>
</template>
<script>
let model
import axios from '~/plugins/axios'
let ENV = require('../config/local_env.json')
export default {
  watch: {
    '$route': function () {
      this.init()
    }
  },
  methods: {
    init: function () {
      var socket = io(ENV.msg_url + '?token=1dc05262a674dbbfc4f1f86015544747')
      socket.on('error', function (obj) {
        Core.alert('danger', '服务器连接失败')
      })
      socket.on('unread', function (obj) {
        model.$store.commit('SET_STATE', Math.random())
      })
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
<style lang="scss" scoped>
.content-wrapper{
  padding: 10px 20px;
  .btn:focus,.btn:hover{
    color: #fff;
  }
}
</style>
