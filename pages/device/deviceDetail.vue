<template lang="pug">
  div.table-list
    h4.text-center 设备详情
    span.goback-icon(v-on:click="backPage()") 
      i.fe.fe-chevrons-left
      | 返回
    div.card.info-box
      div.row
        div.col-3.col-sm-3
          | 设备名称：{{deviceInfo.name}}
        div.col-3.col-sm-3 
          | 当前操作人：{{(deviceInfo.latest_run_record || {}) ? (((deviceInfo.latest_run_record || {}) || {}).user || {}).name : '---'}}
        div.col-3.col-sm-3
          | 登录时间：{{localDate((deviceInfo.latest_run_record || {}) ? ((deviceInfo.latest_run_record || {}) || {}).login_time : '---')}}
        div.col-3.col-sm-3
          | 设备状态：{{typeFomat('device', deviceInfo.status)}}
    div.card
      div.table-responsive
        div.row(v-cloak)
          div.col-4
            table.table.card-table.table-striped.table-vcenter
              thead
                tr
                  th.text-center(colspan="10") 设备事件监控
              tbody
                tr(v-for="(item, index) in warning")
                  td 
                    div.goods-infos
                      p(style="float: right") {{localDate(item.report_time)}}
                      p.color777.fontsize12 信息：{{item.information}}
            pagination(flag="devicedetail" v-bind:total="pagetotal" v-bind:size="pagesize" v-on:callback="getListData")
          p(style="text-align: center" v-show="(warning.length == 0) && (warningLoadingState == false)") 暂无数据
          div(v-if="warningLoadingState")
            vueloading   

          div.col-8
            table.table.card-table.table-striped.table-vcenter
              thead
                tr
                  th.text-center(colspan="10") 设备维护档案信息
                tr
                  th 部件名称
                  th 预算寿命
                  th 已使用时间  
                  th 已使用率%
                  th 警告门槛%
                  th 状态
              tbody
                tr(v-for="(item, index) in devices")
                  td {{item.name}}
                  td {{item.rated_lifespan}} {{item.lifespan_unit}}
                  td {{item.used_lifespan}} {{item.lifespan_unit}}
                  td {{parseInt(item.used_lifespan / item.rated_lifespan * 100)}}%
                  td {{item.warning_threshold}}%
                  td {{item.valid == 'Y' ? '正常' : '不正常'}}
          p(style="text-align: center" v-show="(devices.length == 0) && (deviceLoadingState == false)") 暂无数据
          div(v-if="deviceLoadingState")
            vueloading   
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
        deviceLoadingState: true,
        warningLoadingState: true,
        deviceInfo: {},  //  设备信息
        warning: [],  //  设备事件监控
        devices: [],  //  设备维护档案信息
        pagetotal: 1,
        pagesize: 10
      }
    },
    methods: {
      init: function () {
        model.deviceLoadingState = true
        model.warningLoadingState = true
      },
      //  翻页
      getListData: function (page) {
        model.getWarning(page)
      },

      //  获取设备详情
      getDeviceDetailInfo: function () {
        axios().get('/device/'+this.$route.query.id).then((msg) => {
          if (msg.data.data.length > 0) {
            model.deviceInfo = msg.data.data[0]
            if (model.deviceInfo.device_part.length > 0) {
              model.devices = model.deviceInfo.device_part
            }
          }
          model.deviceLoadingState = false
        })
      },
      //  获取设备事件监控
      getWarning: function (pages) {
        let whereobj = {
          page: pages,
          limit: model.pagesize
        }
        axios().get('/device/warning/'+this.$route.query.id, {params: whereobj}).then((msg) => {
          if (msg.data.data.data.length > 0) {
            model.warning = msg.data.data.data
          }
          model.pagetotal = msg.data.total
          model.warningLoadingState = false
        })
      },
      backPage: function () {
        window.window.location = '/device'
      }
    },
    mounted () {
      model = this
      model.init()
      model.getWarning(1)
      model.getDeviceDetailInfo()
    }
  }
</script>
<style lang="scss" scoped>
  .table-responsive{
    .row{
      margin: 0;
      padding: 0;
    }
    .col-4{
      margin-left: 0;
      padding-left: 0;
    }
    .col-8{
      margin-right: 0;
      padding-right: 0;
    }
  }
  .info-box{
    padding: 10px;
  }
</style>