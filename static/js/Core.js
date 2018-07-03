window.Core = {
  /**
   * 弹出提示框
   * @param  {string} typ 消息类型：success, info, warning, danger
   * @param  {string} msg 消息内容
   * @param  {object} position 位置 top-center  top-left  top-right
   */
  alert: (typ, msg, position = 'top-center') => {
    let delay = 3000
    let top = 10
    let box = $('<div class="alert alert-' + typ + ' alert-dismissible alert-' + position + '" role="alert" ><button type="button" class="close" data-dismiss="alert"></button>' + msg + '</div>')
    $('body').append(box)
    box.animate({top: top}, () => {
      setTimeout(() => {
        box.remove()
      }, delay)
    })
  },

  /**
   * 检查字段值是否-1
   * @param {object} obj 需要检测的对象
   * @memberof List
   * @return {object} tmp 过滤后的对象
   */
  checkKey (obj) {
    let tmp = {}
    for (var key in obj) {
      if (obj[key] > 0) {
        tmp[key] = obj[key]
      }
    }
    return tmp
  },

  /**
   * 检查对象中是否存在空值
   **/
  checkNullKey (obj) {
    let tmp = {}
    for (var key in obj) {
      if (typeof(obj[key]) === null) {
        console.log('null')
      } else {
        console.log('not null ', key, obj[key])
      }
    }
    return tmp
  },

  /**
   * 获取当前时间
   **/
  getNowDate: function () {
    let date = new Date()
    let year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + '  年  ' + month + '  月  ' + strDate + '  日'
    return currentdate
  },
  /**
   *  计算运行时间
   **/
  getRuntime (startime) {
    let _distance = parseInt((Date.now() - startime) / 1000)
    return [
      {
        name: '天',
        diff: 24 * 3600
      },
      {
        name: '小时',
        diff: 3600
      },
      {
        name: '分',
        diff: 60
      },
      {
        name: '秒',
        diff: 1
      }
    ].reduce((result, item) => {
      let _number = Math.floor(_distance / item.diff)
      _distance = _distance % item.diff
      if (_number > 0) {
        result += `${_number}${item.name} `
      }
      return result
    }, '').trim()
  }
}
