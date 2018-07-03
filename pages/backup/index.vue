<template lang="pug">
  div.table-list
    h4.text-center 返补列表
    div.row.row-cards
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-down
            div.h1.m-0 {{allReworkCount}}
            div.text-muted.mb-4 返补总数量
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-down
            div.h1.m-0 {{finishedReworkCount}}
            div.text-muted.mb-4 已完成总数
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-down
            div.h1.m-0 {{unfinishedReworkCount}}
            div.text-muted.mb-4 未完成总数
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right.white
              i.fe.fe-chevron-down
            div.mx-auto.chart-circle.chart-circle-xs(data-thickness="3" data-color="blue")
              div.chart-circle-value {{finishRate * 100}} %
            div.text-muted.mb-4 完成率
    div.card
      div.card-header.opt-box
        div.selectgroup
          label.selectgroup-item
            nuxt-link(to="/backup?status=all&page=1")
              input.selectgroup-input(type="radio" name="value" value="all" v-model="selectval")
              span.selectgroup-button 全部返补数
          label.selectgroup-item
            nuxt-link(to="/backup?status=untreated&page=1")
              input.selectgroup-input(type="radio" name="value" value="untreated" v-model="selectval")
              span.selectgroup-button 未完数
          nuxt-link(to="/backup?status=handled&page=1")
            label.selectgroup-item
              input.selectgroup-input(type="radio" name="value" value="handled" v-model="selectval")
              span.selectgroup-button 已完成数
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th 序号
              th 工件（ID）
              th 设备（ID）
              th 订单编号（ID）
              th 提交时间
              th 返补备注
              th 提交人员
              th 处理状态
              th 处理时间
              th 处理人员
          tbody
            tr(v-for="(item, index) in reworks")
              td {{index + 1}}
              td {{((((item.product_part || {}).batch || {}).beltline_detail || {}).work_section || {}).name || '暂无'}}{{((((item.product_part || {}).batch || {}).beltline_detail || {}).work_section || {}).id || '暂无'}}
              td {{(((item.product_part || {}).product_part_process_record || {}).device || {}).name || '暂无'}}{{(((item.product_part || {}).product_part_process_record || {}).device || {}).id || '1'}}
              td {{((item.product_part || {}).order || {}).order_no || '暂无'}}
              td {{localDate(item.submit_time)}}
              td {{item.rework_memo}}
              td {{(item.submit_user || {}).name}}
              td {{typeFomat('rework', item.status)}}
              td {{localDate(item.hanle_time)}}
              td {{(item.handle_user || {}).name}}
        p(style="text-align: center" v-show="(reworks.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading      
        pagination(flag="backlist" v-bind:total="pagetotal" v-bind:size="pagesize" v-on:callback="getListData")

</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '返补'
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
        selectval: 'all',
        reworks: [],  //  返补列表数据
        allReworkCount: 0,  //  返补总量
        finishedReworkCount: 0, //  已完成总数
        unfinishedReworkCount: 0,  //  未完成总数
        finishRate: 0,  //  完成率
        whereObj: {
          status: '',
          page: 1,
          limit: 15
        }  //  返补请求参数
      }
    },
    watch: {
      '$route': function () {
        model.whereObj.status = this.$route.query.status ? this.$route.query.status : ''
        model.whereObj.page = this.$route.query.page ? this.$route.query.page : 1
        model.selectval = this.$route.query.status ? this.$route.query.status : 'all'
        model.getReworkData()
      }
    },
    methods: {
      init: function () {
        model.loadingState = true
        $('.chart-circle').each(function() {
          let $this = $(this)
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

      //  翻页
      getListData: function (pages) {
        model.getReworkData(pages)
      },
      //  获取反补数据
      getReworkData: function (pages) {
        model.reworks = []
        model.whereObj.page = pages
        if (model.whereObj.status == 'all') {
          model.whereObj.status = ''
        }
        axios().get('/rework', {params: model.whereObj}).then((msg) => {
          if (msg.data.data.data.length > 0) {
            model.reworks = msg.data.data.data
            if (model.whereObj.status == '') {
              model.getReworkCount()
            }
            model.loadingState = false
            model.pagetotal = msg.data.data.total
          }
        })
      },
      //  计算返补数量
      getReworkCount: function () {
        model.allReworkCount = 0
        model.finishedReworkCount = 0
        model.unfinishedReworkCount = 0
        if (model.reworks.length > 0) {
          model.reworks.forEach((item) => {
            if (item.status == 'untreated') {
              model.unfinishedReworkCount++
            } else {
              model.finishedReworkCount++
            }
            model.allReworkCount++
          })
        } else {
          model.allReworkCount = 0
          model.finishedReworkCount = 0
          model.unfinishedReworkCount = 0
        }
        model.finishRate = model.finishedReworkCount / model.allReworkCount
        // model.initCircle(model.finishRate)
        $('.chart-circle').circleProgress('value', model.finishRate)
      }
    },
    mounted () {
      require('jquery-circle-progress')
      model = this
      model.init()
      model.getReworkData(1)
    }
  }
</script>
<style lang="scss" scoped>
  .opt-box{
    padding: 0;
    min-height: 0;
    margin-bottom: -1px;
    label{
      margin-bottom: 0;
      .selectgroup-button{
        border: none;
        border-radius: 0;
      }
      .selectgroup-input:checked + .selectgroup-button {
        background-color: #868e96 !important;
        color: #fff !important;
        border-color: #868e96 !important;
      }
    }
  }
</style>