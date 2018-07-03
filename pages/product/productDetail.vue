<template lang="pug">
  div.table-list
    h4.text-center 生产线详情
    div.card.list-item(v-for="(item, index) in beltlines")
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th.text-center.topheader(colspan="10") {{item.name}}
            tr
              th 序号
              th 工段
              th 设备
              th 操作员
              th 登录时间
              th 运行时间/h
              th 计划完成数
              th 已完成数
              th 未完成数
              th 完成率
          tbody
            tr(v-for="(detail, index) in item.beltline_detail_data")
              td {{index + 1}}
              td {{(((detail || {}).work_section || [])[0] || {}).name || '暂无'}}
              td {{(((detail || {}).device || {}) || {}).name}}
              td {{(((((detail || {}).device || {}).latest_run_record || [])[0] || {}).user || {}).name || '暂无'}}
              td {{localDate((((detail || {}).device || {}).latest_run_record || {}).login_time)}}
              td {{(((detail || {}).device || {}).latest_run_record || {}).start_time}}
              td {{detail.plan_orders}}
              td {{detail.finished_orders}}
              td {{detail.plan_orders - detail.finished_orders}}
              td 
                div.mx-auto.chart-circle.chart-circle-xs(v-bind:data-value="item.finishPercent/100" data-thickness="3" data-color="blue")
                  div.chart-circle-value {{(detail.plan_orders - detail.finished_orders) / 100 * 100}}%
</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '生产'
      }
    },
    layout: 'layout',
    data () {
      return {
        beltlines: []  //  生产线详情列表
      }
    },
    methods: {
      init: function () {
        $('.chart-circle').each(function() {
          let $this = $(this);

          $this.circleProgress({
            fill: {
              color: '#5eba00'
            },
            size: $this.height(),
            startAngle: -Math.PI / 4 * 2,
            emptyFill: '#F4F4F4',
            lineCap: 'round'
          })
        })
      },
      //  获取生产批次列表
      getProductDetails: function () {
        axios().get('/beltline').then((msg) => {
          model.beltlines = msg.data.data.data.map(item => {
            item.beltline_detail_data.map(deviceDetailObj => {
              if (deviceDetailObj.device.latest_run_record) {
                deviceDetailObj.device.latest_run_record.st_time = deviceDetailObj.device.latest_run_record.start_time 
                deviceDetailObj.device.latest_run_record.start_time = window.Core.getRuntime(parseInt(deviceDetailObj.device.latest_run_record.st_time) * 1000)
              }
              return deviceDetailObj
            })
            return item
          })
        })
      },
    },
    mounted () {
      require('jquery-circle-progress')
      model = this
      model.init()
      model.getProductDetails()
      if (model.beltlines.length == 0) {
        return
      }
      setInterval(function () {
        model.beltlines.forEach((item) => {
          item.beltline_detail_data.map(deviceDetailObj => {
            if (deviceDetailObj.device.latest_run_record) {
              deviceDetailObj.device.latest_run_record.start_time = window.Core.getRuntime(parseInt(deviceDetailObj.device.latest_run_record.st_time) * 1000)
            }
            return deviceDetailObj
          })
          return item
        })
      }, 1000)
    }
  }
</script>
<style lang="scss" scoped>
  .list-item{
    margin-bottom: 20px;
  }
</style>