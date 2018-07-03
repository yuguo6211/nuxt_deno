<template lang="pug">
  div.table-list
    h4.text-center 设备列表
    div.card
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th 序号
              th 设备名称
              th 当前操作人员
              th 登录时间
              th 运行时间 /h
              th 设备利用率
              th 工作状态
          tbody
            tr(v-for="(item, index) in datainfo")
              td {{index+1}}
              td {{item.name}}
              td {{(item.latest_run_record || {}) ? (((item.latest_run_record || {}) || {}).user || {}).name : '暂无'}}
              td {{item.latest_run_record ? localDate(item.latest_run_record.login_time) : '暂无'}}
              td {{item.latest_run_record ? item.latest_run_record.st_time : '暂无'}}
              td {{usePercent(item.production, item.capacity)}}%
              td {{typeFomat('device', item.status)}}
        p(style="text-align: center" v-show="(datainfo.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading      
        pagination(flag="devicelist" v-bind:total="pagetotal" v-bind:size="pagesize" v-on:callback="getListData")
</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '设备'
      }
    },
    layout: 'layout',
    components: {
    },
    data () {
      return {
        loadingState: true,
        pagetotal: 1,
        pagesize: 10,
        datainfo: []
      }
    },
    watch: {
      '$store.state.updateSate': function () {
        model.init()
      }
    },
    methods: {
      // 初始化获取数据
      init: function () {
        model.loadingState = true
      },

      getDeviceData: function (pages) {
        let whereobj = {
          page: pages,
          limit: model.pagesize
        }
        axios().get('/device', {params: whereobj}).then((msg) => {
          model.datainfo = msg.data.data.data.map(item => {
            if (item.latest_run_record) {
              item.latest_run_record.st_time = window.Core.getRuntime(parseInt(item.latest_run_record.start_time) * 1000)
            }
            return item
          })
          model.loadingState = false
          model.pagetotal = msg.data.data.total
        })
      },

      // 翻页请求
      getListData: function (page) {
        model.getDeviceData(page)
      }
    },
    mounted () {
      model = this
      model.init()
      model.getDeviceData(1)
      setInterval(function () {
        model.datainfo.forEach(item => {
          if (item.latest_run_record) {
            item.latest_run_record.st_time = window.Core.getRuntime(parseInt(item.latest_run_record.start_time) * 1000)
          }
        })
      }, 1000)
    }
  }
</script>
<style lang="scss" scoped>
  .table{
    border-bottom: 1px solid #ddd; 
  }
</style>