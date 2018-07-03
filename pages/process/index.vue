<template lang="pug">
  div.table-list
    h4.text-center 工序详情
    div.row.row-cards
      div.col-6.col-sm-4.col-lg-4
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-up
            div.h1.m-0 {{finsihObj.plan_orders}}
            div.text-muted.mb-4 今日计划
      div.col-6.col-sm-4.col-lg-4
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-up
            div.h1.m-0 {{finsihObj.finished_orders}}
            div.text-muted.mb-4 已完成数
      div.col-6.col-sm-4.col-lg-4
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-up
            div.h1.m-0 {{finsihObj.plan_orders - finsihObj.finished_orders}}
            div.text-muted.mb-4 未完成数
    div.card.option-box
      div.row
        div.col-4.col-sm-3
          div.input-group
            span.input-group-prepend
              span.input-group-text 工序名称：
            select.form-control(v-model="section_name" v-on:change="changeSelect('section')")
              option(value="") 请选择
              option(v-for="item in section" v-bind:value="item.name") {{item.name}}
        div.col-4.col-sm-3
          div.input-group
            span.input-group-prepend
              span.input-group-text 设备名称：
            select.form-control(v-model="device_name" v-on:change="changeSelect()")
              option(value="") 请选择
              option(v-for="item in devices" v-bind:value="item.name" v-on:change="changeSelect()") {{item.name}}
        div.col-4.col-sm-2(v-show="device_name != ''")
          div.input-group
            span.input-group-prepend
              span.input-group-text 操作人：{{((((process || [])[0] || {}).device || {}).device_run_record || {}).user || '暂无'}}
    div.card
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th 部件名称
              th 部件编号
              th 生产批次
              th 订单编号
              th 交付时间
              th 状态
          tbody
            tr(v-for="(item, index) in process")
              td {{item.product_part.name}}
              td {{item.product_part.code}}
              td {{item.product_part.batch.number}}
              td {{item.product_part.order.order_no}}
              td {{item.product_part.order.delivery_date}}
              td {{typeFomat("order", item.product_part.order.status)}}
        p(style="text-align: center" v-show="(process.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading   
        pagination(flag="processlist" v-bind:total="pagetotal" v-bind:size="pagesize" v-on:callback="getListData")
</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '工序'
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
        process: [],  // 工序列表
        section: [],  //  工序下拉框
        devices: [],  //  设备下拉框
        finsihObj: {},  //  完成率
        currentDeviceUser: {},  //  当前设备的操作人
        section_name: '',  //  选定工序名称
        device_name: ''  //  选定设备名称
      }
    },
    methods: {
      init: function () {
        model.loadingState = true
      },
      //  获取工序展示列表
      getProcess: function (pages) {
        let whereobj = {
          page: pages,
          limit: model.pagesize
        }
        axios().get('/product', {params: whereobj}).then((msg) => {
          if (msg.data.data.data.length > 0) {
            model.process = msg.data.data.data
            model.getFinishRate()
          }
          model.loadingState = false
          model.pagetotal = msg.data.data.total
        })
      },
      //  获取设备下拉列表
      getDeviceList: function () {
        axios().get('/device/list').then((msg) => {
          if (msg.data.data.length > 0) {
            model.devices = msg.data.data
          }
        })
      },
      //  获取工序下拉列表
      getProcessList: function () {
        axios().get('/section').then((msg) => {
          if (msg.data.data.length > 0) {
            model.section = msg.data.data
          }
        })
      },
      //  翻页请求
      getListData: function (page) {
        model.getProcess(page)
      },
      //  获取表头上方信息（完成数/未完成数）
      getFinishRate: function () {
        if (model.process.length > 0) {
          model.finsihObj = ((((model.process[0] || {}).product_part || {}).batch || {}).beltline_detail || {})
        }
      },
      //  获取当前设备操作人
      getDeviceCurrentUser: function () {
        model.currentDeviceUser = ((((model.process[0] || {}).device || {}).device_run_record || []).user || {}).name || '暂无'
      },
      //  选择下拉框（二合一）
      //  type:section工序 type:device设备
      changeSelect: function (type) {
        let whereObj = {}
        model.process = []
        if (type == 'section') {
          //  筛选工序
          model.device_name = ''
          whereObj.section_name = model.section_name
          if (whereObj.section_name == '') {
            model.getProcess(1)
          }
        } else {
          //  筛选设备
          model.section_name = ''
          whereObj.device_name = model.device_name
          if (whereObj.device_name == '') {
            model.getProcess(1)
          }
        }
        axios().get('/product', {params: whereObj}).then((msg) => {
          if (msg.data.data.length > 0) {
            model.process = msg.data.data
            model.getDeviceCurrentUser()
          }
        })
      }
    },
    mounted () {
      model = this
      model.init()
      model.getProcess(1)
      model.getDeviceList()
      model.getProcessList()
    }
  }
</script>
<style lang="scss" scoped>
  .opt-box{
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    background-color: #fff;
  }
  .option-box{
    background-color: #fff;
    padding: 15px 0;
    select{
      border-radius: 3px !important;
    }
    .input-group-text{
      border: none !important;
      background-color: #fff !important;
    }
  }
</style>