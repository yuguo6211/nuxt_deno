import axios from 'axios'
import Cookies from 'js-cookie'
let _ = require('underscore')
let ENV = require('../config/local_env.json')

// 请求分为两类：
// 1类是客户端发出的请求：直接用 Cookie.get('token') 即可
// 2类是服务端发出的请求：则需要通过 req.headers.cookie 去获取了
export default (req) => {
  let headersobj = {}
  let token = ''
  if (req && req.headers.cookie) {
    let _cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token-' + process.env.port + '='))
    if (_cookie) {
      token = _cookie.split('=')[1]
    }
  } else {
    token = Cookies.get('token-' + process.env.port)
  }
  if (!_.isEmpty(token)) {
    headersobj['token'] = token || Cookies.get('token-' + process.env.port)
  }
  return axios.create({
    baseURL: process.env.baseUrl,
    crossDomain: true,
    headers: headersobj
  })
}
