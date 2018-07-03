<template lang="pug">
  div.login-box
    div.box.login-box-body
      h3(style="text-align: center !important") 登录设备监控系统
      div.form-group.has-feedback
        input(type="text" class="form-control" placeholder="账号" v-model="loginData.account")
        i.fa.fa-user.form-control-feedback
      div.form-group.has-feedback
        input(type="password" class="form-control" placeholder="密码" v-model="loginData.password")
        i.fa.fa-lock.form-control-feedback
      div
        button(type="button" class="btn btn-primary btn-block btn-flat" @click="login()") 登录
</template>

<script>
  import axios from '~/plugins/axios'
  import storage from '~/plugins/storage'
  let Cookies = require('js-cookie')
  let model
  export default {
    head () {
      return {
        title: '登录'
      }
    },
    components: {
    },
    data () {
      return {
        loginData: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      // 初始化数据
      // 2018-06-02 yuguo
      init: function () {
        Cookies.set('token-' + process.env.port, '')
        storage.set('dpjuserinfo', null)
        storage.set('selecttable', null)
        // 注册执行enter事件
        document.onkeydown = function (e) {
          var ev = document.all ? window.event : e
          if (ev.keyCode == 13) {
            model.login()
          }
        }
      },
      // 登录
      // 2018-06-02 yuguo
      login: function () {
        axios().post('/login', model.loginData)
        .then(function (response) {
          if (response.data.status == 200) {
            Cookies.set('token-' + process.env.port, response.data.data.token)
            model.$router.push({ path: '/home'})
          } else {
            Core.alert('danger', response.data.message)
            return
          }
        })
        .catch(function (error) {
          console.log(error)
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
  .login-box {
    width: 360px;
    height: 360px;
    margin: 7% auto;
  }
  @media (max-width: 768px) {
    .login-box {
      width: 90%;
      margin-top: 20px;
    }
  }
  .login-box-body {
    background: #fff;
    padding: 20px;
    border-top: 0;
    color: #666;
    border-radius: 3px;
  }
  .bg-maroon {
    background-color: #d81b60 !important;
    color: #fff !important;
  }
  .login-box-body .form-control-feedback {
    color: #777;
  }
  .login-box-msg {
    margin: 0;
    text-align: center;
    padding: 0 20px 20px 20px;
  }
  .login-box-body{
    padding: 50px;
  }
  .login-logo {
    position: relative;
    top: 35px;
    font-size: 35px;
    text-align: center;
    font-weight: 300;
  }
  .has-feedback {
    position: relative;
  }
  .has-feedback .form-control {
    padding-right: 42.5px;
  }
  .form-control-feedback {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    pointer-events: none;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .input-lg + .form-control-feedback,
  .input-group-lg + .form-control-feedback,
  .form-group-lg .form-control + .form-control-feedback {
    width: 46px;
    height: 46px;
    line-height: 46px;
  }
  .input-sm + .form-control-feedback,
  .input-group-sm + .form-control-feedback,
  .form-group-sm .form-control + .form-control-feedback {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .btn-group button{
    color: #666;
    font-weight: 400;
  }
  a.back{ font-size: 12px;  margin-left: 10px;}
  // 加载动画
  .sk-rotating-plane {
    width: 40px; height: 40px; margin-left: 50%;
    background-color: #14B9C7; margin: 40px auto;
    -webkit-animation: sk-rotatePlane 1.2s infinite ease-in-out;
            animation: sk-rotatePlane 1.2s infinite ease-in-out; }

  @-webkit-keyframes sk-rotatePlane {
    0% {
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
              transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
    50% {
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
    100% {
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
              transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }

  @keyframes sk-rotatePlane {
    0% {
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
              transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
    50% {
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
    100% {
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
              transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }

  .forget-pwd {
    padding-top: 10px;
    text-align: right;
    font-size: 12px;
  }
</style>
