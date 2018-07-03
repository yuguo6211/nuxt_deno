let ENV = require('./config/local_env.json')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s-监控后台',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge,chrome=1'},
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dpjia.ico' },
      { rel: 'stylesheet', href: '/css/dashboard.css' },
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/tabler.css' },
      { rel: 'stylesheet', href: '/common/main.css' }
    ],
    script: [
      { src: '/js/jquery.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/fastclick.js' },
      { src: '/js/store.min.js' },
      { src: '/js/Core.js' },
      { src: '/js/init.js' }
    ]
  },
  css: [
    'assets/css/main.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
        vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader'
      }
    },
    vendor: ['axios']
  },
  router: {
    middleware: 'auth'
  },
  mode: 'spa',
  plugins: ['~plugins/filters', { src: '~/plugins/components.js', ssr: false }],
  env: {
    baseUrl: ENV.API || 'http://api.monitor.dpjia.com/api/',
    port: ENV.port || '3002'
  }
}
