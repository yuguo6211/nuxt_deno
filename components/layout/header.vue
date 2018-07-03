<template lang="pug">
  div.header.collapse.d-lg-flex.p-0
    div.container
      div.row.align-items-center
        div.col-lg.order-lg-first
          ul.nav.nav-tabs.border-0.flex-column.flex-lg-row(style="position: relative")
            li.nav-item
              nuxt-link.nav-link(v-bind:class="controller == 'home' ? 'active' : ''" to="/home")
                i.fe.fe-home 
                | 首页
            li.nav-item
              a.nav-link(v-bind:class="controller == 'product' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                i.fe.fe-database 
                | 生产
              div.dropdown-menu.dropdown-menu-arrow
                nuxt-link.dropdown-item(v-bind:class="subitem == '/product' ? 'active' : ''" to="/product") 生产批次
                nuxt-link.dropdown-item(v-bind:class="subitem == '/product/productDetail' ? 'active' : ''" to="/product/productDetail") 生产线详情
            li.nav-item
              a.nav-link(v-bind:class="controller == 'device' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                i.fe.fe-settings 
                | 设备
              div.dropdown-menu.dropdown-menu-arrow
                nuxt-link.dropdown-item(v-bind:class="subitem == '/device' ? 'active' : ''" to="/device") 设备列表
            li.nav-item
              a.nav-link(v-bind:class="controller == 'process' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                i.fe.fe-git-pull-request
                | 工序
              div.dropdown-menu.dropdown-menu-arrow
                nuxt-link.dropdown-item(v-bind:class="subitem == '/process' ? 'active' : ''" to="/process") 工序详情
            li.nav-item
              a.nav-link(v-bind:class="controller == 'backup' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                i.fe.fe-alert-triangle 
                | 返补
              div.dropdown-menu.dropdown-menu-arrow
                nuxt-link.dropdown-item(v-bind:class="subitem == '/backup' ? 'active' : ''" to="/backup?status=all&page=1") 返补
            li.nav-item(v-if="false")
              a.nav-link(v-bind:class="controller == 'factory' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                i.fe.fe-alert-triangle 
                | 厂房
              div.dropdown-menu.dropdown-menu-arrow
                nuxt-link.dropdown-item(v-bind:class="subitem == '/factory' ? 'active' : ''" to="/factory") 今日排产
                nuxt-link.dropdown-item(v-bind:class="subitem == '/factory/devicewatch' ? 'active' : ''" to="/factory/devicewatch") 厂房设备
            li.nav-item(style="right: 0px; position: absolute")
              a.nav-link(v-bind:class="controller == 'login' ? 'active' : ''" href="javascript:void(0)" data-toggle="dropdown")
                | 已登录
              div.dropdown-menu.dropdown-menu-arrow
                a.dropdown-item(v-bind:class="subitem == '/login' ? 'active' : ''" @click="loginout()") 注销

</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    data () {
      return {
        controller: '',
        subitem: ''
      }
    },
    watch: {
      '$route': function () {
        this.init()
      }
    },
    methods: {
      init: function () {
        model.controller = this.$route.path.split('/')[1]
        model.subitem = this.$route.path
      }, 
      //  发送退出登录请求
      loginout: function () {
        axios().get('/logout').then((msg) => {
          window.window.location = '/login'
        })
      }
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="sass" scoped>

</style>