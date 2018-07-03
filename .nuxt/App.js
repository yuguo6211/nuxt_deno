import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\assets\\css\\main.scss'


let layouts = {

  "_factorylayout": () => import('..\\layouts\\factorylayout.vue'  /* webpackChunkName: "layouts_factorylayout" */).then(m => m.default || m),

  "_layout": () => import('..\\layouts\\layout.vue'  /* webpackChunkName: "layouts_layout" */).then(m => m.default || m),

  "_default": () => import('./layouts/default.vue'  /* webpackChunkName: "layouts_default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"titleTemplate":"%s-监控后台","meta":[{"charset":"utf-8"},{"http-equiv":"X-UA-Compatible","content":"IE=edge,chrome=1"},{"hid":"description","name":"description","content":"Nuxt.js project"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Fdpjia.ico"},{"rel":"stylesheet","href":"\u002Fcss\u002Fdashboard.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fbootstrap.min.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Ftabler.css"},{"rel":"stylesheet","href":"\u002Fcommon\u002Fmain.css"}],"script":[{"src":"\u002Fjs\u002Fjquery.min.js"},{"src":"\u002Fjs\u002Fbootstrap.min.js"},{"src":"\u002Fjs\u002Ffastclick.js"},{"src":"\u002Fjs\u002Fstore.min.js"},{"src":"\u002Fjs\u002FCore.js"},{"src":"\u002Fjs\u002Finit.js"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

