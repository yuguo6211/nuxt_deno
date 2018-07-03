import axios from '~/plugins/axios'
import Cookies from 'js-cookie'
let _ = require('underscore')

export default function ({store, redirect, route, isServer, isClient}) {
  // 登录页面直接返回
  if (route.path === '/') {
    store.$router.push({ path: '/home' })
    return
  }
  if (route.path === '/login') {
    return
  }
  //  token判断页面是否显示 2018.6.6 王翀
  if (_.isEmpty(Cookies.get('token-' + process.env.port))) {
    //  无token,直接跳转登录页面
    store.$router.push({ path: '/login' })
    return
  } else {
    //  有token,发送请求判断token是否过期 2018.6.11 王翀
    axios().get('/auth').then((msg) => {
      //  status 为200时认证成功，否则认证失败 2018.6.11 王翀
      if (msg.data.status != '200') {
        //  认证失败，跳转登陆页面 2018.6.11 王翀
        store.$router.push({ path: '/login' })
      }
    })
  }
  // store.$router.push({ path: '/home' })
  // axios().get('admin/current').then((msg) => {
  //   // 更新缓存localstorage
  //   Cookies.get('token-' + process.env.port)
  //   if (route.path === '/') {
  //     store.$router.push({ path: '/home' })
  //     return
  //   }
  // }, () => {
  //   return redirect('/login')
  // })
}
