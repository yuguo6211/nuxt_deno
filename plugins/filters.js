import Vue from 'vue'

let _ = require('underscore')
let moment = require('moment')
let typeJsonData = require('~/static/data/data.json')

Vue.use({
  install: function (Vue, options) {
    // 时间转换器
    Vue.prototype.localDate = function (value, typ) {
      // _.isEmpty(value) 不能处理基本数据类型
      if (parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      return typ ? moment(parseInt(value * 1000)).format(typ) : moment(parseInt(value * 1000)).format('YYYY-MM-DD HH:mm:ss')
    }

    //  状态类型转换器
    Vue.prototype.typeFomat = function (type, value) {
      if (_.isEmpty(value) || _.isEmpty(type)) { return '' }
      if (!_.has(typeJsonData, type)) { return '' }
      let result = ''
      typeJsonData[type].forEach((item) => {
        if (item.key === value) {
          result = item.value
        }
      })
      return result
    }

    //  设备利用率
    Vue.prototype.usePercent = function (production, capacity) {
      let result = isNaN(parseInt(production / capacity * 100)) ? 0 : parseInt(production / capacity * 100)
      return result
    }
  }
})
