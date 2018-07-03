<template lang="pug">
  div.table-list
    h4.text-center 生产批次列表
    div.search-box(v-if="false")
      <vue-searchform v-on:searchback="searchData"></vue-searchform>
    div.card
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th 生产批次号
              th 订单数
              th 分拣完成数
              th 齐套数
              th 未齐套
              th.text-center 完成率
          tbody
            tr(v-for="item in products")
              td {{item.number || '暂无'}}
              td {{item.total_order_amount || '0'}}
              td {{item.total_order_sort_record_amount || '0'}}
              td {{item.total_done_amount || '0'}}
              td
                span.un-box 
                  | {{item.total_undone_amount || '0'}}
                  span.fe.fe-info(v-if="item.total_done_amount != 0")
                    router-link(:to="{path: 'product/order?id=' + item.id + '&number=' + item.number}")
              td.text-center
                div.mx-auto.chart-circle.chart-circle-xs(v-bind:data-value="item.complete_rate/100" data-thickness="3" data-color="blue")
                  div.chart-circle-value {{item.complete_rate}}%
        p(style="text-align: center" v-show="(products.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading      
</template>
<script>
  let model
  let _ = require('underscore')
  let filter = require('~/plugins/filters.js')
  import axios from '~/plugins/axios'
  import searchForm from '~/components/common/searchform.vue'
  export default {
    head () {
      return {
        title: '生产'
      }
    },
    layout: 'layout',
    components: {
      'vue-searchform': searchForm
    },
    data () {
      return {
        loadingState: true,
        products: [],  //  生产批次列表
        searchObj: {}  //  搜索对象
      }
    },
    methods: {
      // 初始化数据
      init: function () {
        model.loadingState = true
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
      getProducts: function () {
        axios().get('/workshop/batch', {params: model.searchObj}).then((msg) => {
          model.products = msg.data.data.data
          model.loadingState = false
        })
      },

      //  搜索组件返回的数据
      searchData: function (obj) {
        if (obj) {
          //  搜索
          model.searchObj = _.clone(obj)
          if (obj.start_time) {
            model.searchObj.start_time = (Date.parse(obj.start_time) / 1000) 
          }
          if (obj.end_time) {
            model.searchObj.end_time =  (Date.parse(obj.end_time) / 1000)
          }
        } else {
          //  刷新
          model.searchObj = {}
        }
        model.products = []
        model.getProducts()
      }
    },
    mounted () {
      require('jquery-circle-progress')
      model = this
      model.init()
      model.getProducts()
    }
  }
</script>
<style lang="scss" scoped>
  .un-box {
    span{
      position: relative;
      left: 6px;
      top: 3px;
      font-size: 20px;
      color: #f1c40f;
      cursor: pointer;
      a{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>