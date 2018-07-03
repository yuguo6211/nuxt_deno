<template lang="pug">
  div.wrapper
    div.self-header
      <vue-header></vue-header>
    div.content-wrapper
      <vue-crumbs></vue-crumbs>
      <section class="content">
        <nuxt/>
      </section>
    <vue-footer></vue-footer>
</template>
<script>
let model
import axios from '~/plugins/axios'
import Header from '~/components/layout/header.vue'
import Crumbs from '~/components/layout/crumbs.vue'
import Footer from '~/components/layout/footer.vue'
let ENV = require('../config/local_env.json')
export default {
  components: {
    'vue-header': Header,
    'vue-crumbs': Crumbs,
    'vue-footer': Footer
  },
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
<style scoped lang="scss">
// .self-header {
//   display: none;
// }
.content-wrapper{
  padding: 10px 20px;
  .btn:focus,.btn:hover{
    color: #fff;
  }
}
@media screen and (min-width: 2000px) {
  .self-header {
    display: none;
  }
}
</style>
